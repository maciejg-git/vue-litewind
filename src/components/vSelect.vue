<template>
  <v-input
    v-model="localText"
    ref="reference"
    :icon="icon"
    :use-loader="useLoader"
    :inline="inline"
    v-bind="{ ...$attrs, ...input }"
    :custom-clearable="clearable"
    :readonly="!autocomplete"
    show-indicator
    :indicator-switch="isPopperVisible"
    :is-loading="isLoading"
    type="text"
    @input="handleInput"
    @focus="handleFocusInput"
    @blur="handleBlurInput"
    @keydown="handleKeydown"
    @click:indicator="handleClickIndicator"
    @click:clear-button="handleClickClearButton"
  >
    <template
      v-for="(name, slot) of $slots"
      #[slot]="slotProps"
    >
      <slot
        :name="slot"
        v-bind="slotProps"
      ></slot>
    </template>
    <template #multi-value>
      <template v-if="multiValue">
        <template v-for="(item, index) in selectedItems">
          <template v-if="index < maxMultiValue">
            <slot
              name="multi-value-item"
              v-bind="item"
            >
              <span
                class="ml-1 after:content-[','] last-of-type:after:content-none last-of-type:mr-2"
              >
                {{ getItemText(item) }}
              </span>
            </slot>
          </template>
        </template>
        <slot
          v-if="selectedItems.length > maxMultiValue"
          name="max-multi-value"
        ></slot>
      </template>
      <span v-else-if="isMultivalueVisible && selectedItem !== undefined">
        {{ getItemText(selectedItem) }}
      </span>
    </template>
  </v-input>

  <teleport to="body">
    <transition
      :name="transition"
      @before-leave="lockPopper"
      @after-leave="destroyPopperInstance"
    >
      <div
        v-if="isPopperVisible"
        ref="popper"
        class="z-50"
      >
        <v-card
          v-bind="card"
          class="max-h-[var(--select-max-menu-height)] overflow-y-auto overflow-x-hidden"
          v-detect-scroll-bottom="handleScrollBottom"
          @vue:before-update="onUpdateResetItemsRef"
          @mousedown.prevent
        >
          <div
            v-if="!itemsPagination.length && !isLoading"
            :class="classes.item.value"
          >
            {{ emptyDataMessage }}
          </div>
          <div
            v-else
            v-for="(item, index) in itemsPagination"
            :ref="(i) => i && itemsRef.push(i)"
            :key="getItemValue(item)"
            :class="getItemClass(item, index)"
            @mousedown.prevent
            @click="handleClickItem(item, index)"
            tabindex="0"
          >
            <slot
              name="item"
              :text="getItemText(item)"
              :value="getItemValue(item)"
              :item="item"
              :inputValue="localText"
              :isSelected="isSelected(item)"
            >
              {{ getItemText(item) }}
            </slot>
          </div>
        </v-card>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { ref, computed, watch, toRefs, nextTick, onBeforeUpdate } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import usePopper from "./composition/use-popper.js";
import vInput from "./vInput.vue";
import { default as vDetectScrollBottom } from "../directives/detect-scroll-bottom";
import {
  sharedProps,
  sharedPopperProps,
  sharedStyleProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

let props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("select"),
  modelValue: {
    type: [String, Object, Boolean, Number],
    default: undefined,
  },
  // v-input props
  useLoader: {
    type: Boolean,
    default: defaultProps("select", "useLoader", true),
  },
  multiValue: {
    type: Boolean,
    default: false,
  },
  maxMultiValue: {
    type: Number,
    default: 9999,
  },
  multiValueDisplay: {
    type: String,
    default: "text",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: defaultProps("select", "inline", false),
  },
  ...sharedFormProps(null, { icon: true, clearable: true }),
  // v-select props
  items: {
    type: Array,
    default: [],
  },
  autocomplete: {
    type: Boolean,
    default: false,
  },
  itemText: {
    type: String,
    default: "text",
  },
  itemValue: {
    type: String,
    default: "value",
  },
  filterKeys: {
    type: Array,
    default: [],
  },
  noFilter: {
    type: Boolean,
    default: defaultProps("select", "noFilter", false),
  },
  noPagination: {
    type: Boolean,
    default: defaultProps("select", "noPagination", false),
  },
  emptyDataMessage: {
    type: String,
    default: defaultProps("select", "emptyDataMessage", "No data available"),
  },
  input: {
    type: Object,
    default: defaultProps("select", "input", {}),
  },
  card: {
    type: Object,
    default: defaultProps("select", "card", {}),
  },
  itemsPerPage: {
    type: Number,
    default: defaultProps("select", "itemsPerPage", 10),
  },
  transition: {
    type: String,
    default: defaultProps("select", "transition", "fade"),
  },
  styleItem: {
    type: String,
    default: defaultProps("select", "styleItem", ""),
  },
  ...sharedPopperProps("select"),
});

const emit = defineEmits([
  "update:modelValue",
  "update:page",
  "input:value",
  "state:opened",
  "state:closed",
]);

let { classes, states } = useStyles("select", props, {
  item: {
    states: ["selected", "highlighted"],
  },
});

let getItemClass = (item, index) => {
  return {
    [classes.item.value]: true,
    [states.item.value.selected]: isSelected(item),
    [states.item.value.highlighted]: index === highlightedItemIndex.value,
    disabled: item.disabled,
  };
};

let localModel = useLocalModel(props, emit);

const { offsetX, offsetY, noFlip, placement, modelValue } = toRefs(props);
const {
  isPopperVisible,
  reference,
  referenceInstance,
  updatePopperInstance,
  popper,
  showPopper,
  hidePopper,
  destroyPopperInstance,
  lockPopper,
} = usePopper(
  { placement, offsetX, offsetY, noFlip, modelValue, emit },
  { resizePopper: true }
);

let selectedItem = ref(null);
let selectedItems = ref([]);
let localText = ref("");

let ignoreModelWatch = false;

let isMultivalueVisible = ref(true);

let highlightedItemIndex = ref(-1);

let itemsRef = ref([]);

let onUpdateResetItemsRef = () => {
  itemsRef.value = [];
};

onBeforeUpdate(() => {
  onUpdateResetItemsRef();
});

// show autocomplete menu

let show = () => {
  showPopper();

  nextTick(() => {
    scrollToHighlighted();
  });
};

watch(
  () => props.items,
  () => {
    if (props.noFilter && referenceInstance.value.isFocused) {
      show();
    }
  }
);

// get text and value of item

let getItemText = (item, key) => {
  let text = item[key || props.itemText];

  return text !== undefined ? text : item;
};

let getItemValue = (item) => {
  let value = item[props.itemValue];

  return value !== undefined ? value : item;
};

let getItemByValue = (value) => {
  return props.items.find((v) => {
    return getItemValue(v) === value;
  });
};

let itemsFiltered = computed(() => {
  if (!props.autocomplete || props.isLoading || props.noFilter) {
    return props.items;
  }

  if (props.filterKeys.length) {
    return props.items.filter((item) => {
      return props.filterKeys.some((key) => {
        let i = getItemText(item, key);
        return (
          i && i.toLowerCase().indexOf(localText.value.toLowerCase()) !== -1
        );
      });
    });
  }

  return props.items.filter((item) => {
    let i = getItemText(item);
    return i && i.toLowerCase().indexOf(localText.value.toLowerCase()) !== -1;
  });
});

let page = ref(0);

let itemsPagination = computed(() => {
  if (props.itemsPerPage === 0 || props.noPagination) {
    return itemsFiltered.value;
  }

  return itemsFiltered.value.slice(0, (page.value + 1) * props.itemsPerPage);
});

let isSelected = (item) => {
  if (props.multiValue) {
    return selectedItems.value.indexOf(item) !== -1;
  }

  return selectedItem.value === item;
};

let updateLocalModel = () => {
  ignoreModelWatch = true;

  if (props.multiValue) {
    localModel.value = selectedItems.value.map((i) => getItemValue(i));
    updatePopperInstance();
    return;
  }

  localModel.value = getItemValue(selectedItem.value);
};

let updateSelectedItems = (item) => {
  if (props.multiValue) {
    let index = selectedItems.value.indexOf(item);
    if (index !== -1) {
      selectedItems.value.splice(index, 1);
    } else {
      selectedItems.value.push(item);
    }
  } else {
    selectedItem.value = item;
  }

  updateLocalModel();
};

let cancelInput = () => {
  if (props.autocomplete) {
    localText.value = "";
  }

  isMultivalueVisible.value = true;

  hidePopper();
};

let clearInput = () => {
  localText.value = "";
  selectedItem.value = "";
  selectedItems.value = [];
  ignoreModelWatch = true;
  localModel.value = props.multiValue ? [] : "";
};

watch(
  localModel,
  (value) => {
    if (ignoreModelWatch) {
      ignoreModelWatch = false;
      return;
    }
    if (props.multiValue) {
      selectedItems.value = value.map((selected) => {
        return props.items.find((i) => {
          return selected === getItemValue(i);
        });
      });
      return;
    }
    selectedItem.value = getItemByValue(value);
  },
  { immediate: true, deep: true, flush: "sync" }
);

let scrollToHighlighted = (direction) => {
  if (highlightedItemIndex.value === -1) {
    return;
  }

  let scrollToIndex =
    direction === 1
      ? (highlightedItemIndex.value < itemsRef.value.length - 1
        ? highlightedItemIndex.value + 1
        : highlightedItemIndex.value)
      : highlightedItemIndex.value > 0
      ? highlightedItemIndex.value - 1
      : highlightedItemIndex.value;

  itemsRef.value[scrollToIndex].scrollIntoView({
    block: "nearest",
  });
};

// handle template events

let handleFocusInput = () => {
  if (props.autocomplete && !props.multiValue) {
    isMultivalueVisible.value = false;

    if (selectedItem.value !== undefined) {
      localText.value = getItemText(selectedItem.value);

      nextTick(() => {
        referenceInstance.value.selectAll();
      });
    }
  }

  if (!props.autocomplete || props.items.length) {
    show();
  }
};

let handleInput = () => {
  highlightedItemIndex.value = -1;
  emit("input:value", localText.value);
};

let handleBlurInput = (ev) => {
  cancelInput();
};

let handleClickIndicator = () => {
  if (props.isLoading) return;

  if (isPopperVisible.value) {
    cancelInput();
    referenceInstance.value.blur();
    return;
  }

  referenceInstance.value.focus();
};

let handleClickClearButton = () => {
  clearInput();

  if (isPopperVisible.value) {
    referenceInstance.value.focus();
  }
};

let handleKeydown = (ev) => {
  let key = ev.key;

  if (key === "Backspace") {
    if (
      props.multiValue &&
      selectedItems.value.length &&
      localText.value === ""
    ) {
      selectedItems.value.pop();
      updateLocalModel();
    }
    return;
  }
  if (key === "ArrowDown") {
    if (
      props.isLoading ||
      highlightedItemIndex.value >= itemsRef.value.length - 1
    )
      return;

    highlightedItemIndex.value += 1;

    scrollToHighlighted(1);

    ev.preventDefault();
    ev.stopPropagation();

    return;
  }
  if (key === "ArrowUp") {
    if (props.isLoading || highlightedItemIndex.value <= 0) return;

    highlightedItemIndex.value -= 1;

    scrollToHighlighted(-1);

    ev.preventDefault();
    ev.stopPropagation();

    return;
  }
  if (key === "Enter") {
    if (props.isLoading) return;

    updateSelectedItems(itemsPagination.value[highlightedItemIndex.value]);

    ev.preventDefault();
    ev.stopPropagation();

    if (!props.multiValue) {
      referenceInstance.value.blur();
    }

    return;
  }
};

let handleScrollBottom = () => {
  page.value++;
  emit("update:page", page.value);
};

let handleClickItem = (item, index) => {
  updateSelectedItems(item);

  highlightedItemIndex.value = index;

  if (!props.multiValue) {
    referenceInstance.value.blur();
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--select-transition-duration) ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
