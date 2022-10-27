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
      <template v-if="!multiValue">
        <template v-if="!isValueInInput">
          <span>{{ getItemText(selectedItem) }}</span>
        </template>
      </template>
      <template v-else>
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
            :key="item"
            :class="getItemClass(item, index)"
            @mousedown.prevent
            @click="handleClickItem(item)"
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
import { ref, computed, watch, toRefs, nextTick } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import usePopper from "./composition/use-popper.js";
import vInput from "./vInput.vue";
import { default as vDetectScrollBottom } from "../directives/detect-scroll-bottom";
import { isObject } from "../tools";
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
    fixed: "fixed-item",
    states: ["selected", "highlighted"],
  },
});

let getItemClass = (item, index) => {
  return [
    classes.item.value,
    isSelected(item) ? states.item.value.selected : "",
    index === highlightedItemIndex.value ? states.item.value.highlighted : "",
    item.disabled ? "disabled" : "",
  ];
};

let localModel = useLocalModel(props, emit);

const { offsetX, offsetY, noFlip, placement, modelValue } = toRefs(props);
const {
  isPopperVisible,
  reference,
  referenceInstance,
  updateInstance,
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

let isValueInInput = ref(false);

let canShowMenu = ref(false);

let highlightedItemIndex = ref(0)

// show autocomplete menu

let show = () => {
  showPopper();
};

// show menu if items prop changes

watch(
  () => props.items,
  () => {
    if (
      props.noFilter &&
      referenceInstance.value.isFocused &&
      canShowMenu.value
    ) {
      show();
    }
  }
);

// get text and value of item

let getItemText = (item, key) => {
  if (item === undefined) return localText.value;
  if (isObject(item)) {
    return item[key || props.itemText];
  }
  return item;
};

let getItemValue = (item) => {
  if (isObject(item)) {
    return item[props.itemValue];
  }
  return item;
};

let getItemByValue = (value) => {
  return props.items.find((v) => {
    return getItemValue(v) === value;
  });
};

let itemsFiltered = computed(() => {
  if (!props.autocomplete) return props.items;
  if (props.isLoading || props.noFilter) return props.items;

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
  if (!props.multiValue) {
    return selectedItem.value === item;
  }
  return selectedItems.value.indexOf(item) !== -1;
};

let updateLocalModel = () => {
  ignoreModelWatch = true;

  if (props.multiValue) {
    localModel.value = selectedItems.value.map((i) => getItemValue(i));
    updateInstance();
    return
  }
  localModel.value = getItemValue(selectedItem.value);
}

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

  updateLocalModel()
};

let cancelInput = () => {
  if (props.autocomplete) {
    localText.value = "";
  }

  if (isValueInInput.value) isValueInInput.value = false;

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
    let item = getItemByValue(value);
    selectedItem.value = item;
  },
  { immediate: true, deep: true, flush: "sync" }
);

// handle template events

let handleFocusInput = () => {
  if (!props.autocomplete || props.items.length) {
    canShowMenu.value = false;
    show();
  }

  canShowMenu.value = true;

  if (!props.multiValue && props.autocomplete) {
    isValueInInput.value = true;

    localText.value = getItemText(selectedItem.value);

    nextTick(() => {
      referenceInstance.value.selectAll();
    });
  }
};

let handleInput = () => {
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
  let key = ev.key

  if (key === 'Backspace') {
    if (props.multiValue && selectedItems.value.length && localText.value === '') {
      selectedItems.value.pop()
      updateLocalModel()
    }
  }
  if (key === 'ArrowDown') {
    // if (props.multiValue && selectedItems.value.length && localText.value === '') {
    //   selectedItems.value.pop()
    //   updateLocalModel()
    // }
    highlightedItemIndex.value += 1
  }
}

let handleScrollBottom = () => {
  page.value++;
  emit("update:page", page.value);
};

let handleClickItem = (item) => {
  updateSelectedItems(item);

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
