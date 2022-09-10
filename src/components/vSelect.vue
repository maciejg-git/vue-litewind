<template>
  <v-input
    v-model="localText"
    v-bind="{ ...$attrs, ...input }"
    type="text"
    ref="reference"
    :icon="icon"
    :use-loader="useLoader"
    :custom-clearable="clearable"
    show-indicator
    :indicator-switch="isPopperVisible"
    :chevron="chevron"
    :readonly="readonly"
    @input="handleInput"
    @focus="handleFocusInput"
    @input:blur="handleBlurInput"
    @click:indicator="handleClickIndicator"
    @click:clear-button="handleClickClearButton"
  >
    <template v-for="(name, slot) of $slots" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps"></slot>
    </template>
  </v-input>

  <teleport to="body">
    <transition :name="transition" @after-leave="onPopperTransitionLeave">
      <div v-if="isPopperVisible" ref="popper">
        <v-card
          class="max-h-[300px] overflow-y-auto overflow-x-hidden"
          v-detect-scroll-bottom="handleScrollBottom"
        >
          <div
            v-if="!itemsPagination.length"
            :class="classes.item.value"
          >
            {{ emptyDataMessage }}
          </div>
          <div
            v-else
            v-for="item in itemsPagination"
            :key="item"
            :class="getItemClass(item)"
            @click="handleClickItem(item)"
            tabindex="-1"
          >
            <slot
              name="item"
              :text="getItemText(item)"
              :value="getItemValue(item)"
              :item="item"
              :inputValue="localText"
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
// vue
import { ref, computed, watch, toRefs } from "vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import usePopper from "./composition/use-popper.js";
// components
import vInput from "./vInput.vue";
// directives
import detectScrollBottom from "../directives/detect-scroll-bottom";
// tools
import { isString, highlightMatch } from "../tools";
// props
import {
  sharedPopperProps,
  sharedStyleProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

export default {
  props: {
    modelValue: {
      type: [String, Object, Boolean],
      default: undefined,
    },
    // v-input props
    useLoader: {
      type: Boolean,
      default: defaultProps("autocomplete", "useLoader", true),
    },
    // v-autocomplete props
    ...sharedPopperProps("autocomplete"),
    items: {
      type: Array,
      default: [],
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
      default: defaultProps("autocomplete", "noFilter", false),
    },
    noPagination: {
      type: Boolean,
      default: defaultProps("autocomplete", "noPagination", false),
    },
    emptyDataMessage: {
      type: String,
      default: defaultProps(
        "autocomplete",
        "emptyDataMessage",
        "No data available"
      ),
    },
    noHighlight: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: true,
    },
    input: {
      type: Object,
      default: defaultProps("autocomplete", "input", {}),
    },
    card: {
      type: Object,
      default: defaultProps("autocomplete", "card", {}),
    },
    chevron: {
      type: Object,
      default: defaultProps("autocomplete", "chevron", {}),
    },
    itemsPerPage: {
      type: Number,
      default: defaultProps("autocomplete", "itemsPerPage", 10),
    },
    transition: {
      type: String,
      default: defaultProps("autocomplete", "transition", "fade"),
    },
    styleMenu: {
      type: String,
      default: defaultProps("autocomplete", "styleMenu", ""),
    },
    styleItem: {
      type: String,
      default: defaultProps("autocomplete", "styleItem", ""),
    },
    styleMatch: {
      type: String,
      default: defaultProps("autocomplete", "styleMatch", ""),
    },
    ...sharedFormProps(null, { icon: true, clearable: true }),
    ...sharedStyleProps("autocomplete"),
  },
  components: {
    vInput,
  },
  directives: {
    detectScrollBottom,
  },
  emits: [
    "update:modelValue",
    "update:page",
    "input:value",
    "state:opened",
    "state:closed",
    "input",
  ],
  inheritAttrs: false,
  setup(props, { emit, expose }) {
    let { classes, states, variants } = useStyles("autocomplete", props, {
      menu: {
        fixed: "max-h-[300px] overflow-y-auto overflow-x-hidden",
      },
      item: {
        fixed: "fixed-item",
        states: ["active", "disabled"],
      },
      match: null,
    });

    let getItemClass = (item) => {
      return [
        item.disabled
          ? [classes.item.value, states.item.value.disabled]
          : classes.item.value,
      ];
    };

    let localModel = useLocalModel(props, emit);

    const { offsetX, offsetY, noFlip, placement, modelValue } = toRefs(props);
    const {
      isPopperVisible,
      isPopperChild,
      reference,
      popper,
      showPopper,
      hidePopper,
      onPopperTransitionLeave,
    } = usePopper(
      { placement, offsetX, offsetY, noFlip, modelValue, emit },
      { resizePopper: true }
    );

    let selectedItem = ref(null);
    let localText = ref("");

    // show autocomplete menu

    let show = () => {
      if (!props.items.length) return;

      showPopper();
    };

    // get text and value of item

    let getItemText = (item, key) => {
      return isString(item)
        ? item
        : item[key !== undefined ? key : props.itemText];
    };

    let getItemValue = (item) => {
      return isString(item) ? item : item[props.itemValue];
    };

    watch(localModel, () => {
      localText.value = localModel.value
    }, { immediate: true })

    let page = ref(0);

    let itemsPagination = computed(() => {
      if (props.itemsPerPage === 0 || props.noPagination) {
        return props.items;
      }

      return props.items.slice(
        0,
        (page.value + 1) * props.itemsPerPage
      );
    });

    let update = (item) => {
      selectedItem.value = item;
      localText.value = getItemText(item);
      localModel.value = getItemValue(item);
    };

    let cancelInput = () => {
      hidePopper();
    };

    let selectItem = (item) => {
      update(item);
      hidePopper();
    };

    let clearInput = () => {
      localText.value = "";
      selectedItem.value = "";
      localModel.value = "";
    };

    // handle template events

    let handleFocusInput = () => {
      show();
    };

    let handleInput = () => {
      emit("input", localText.value);
    };

    let handleBlurInput = (ev) => {
      if (!isPopperVisible.value) {
        return;
      }

      if (!isPopperChild(ev.relatedTarget)) {
        cancelInput();
      }
    };

    let handleClickIndicator = (input) => {
      if (props.isLoading) return;

      if (isPopperVisible.value) {
        cancelInput();
        return;
      }

      input.focus();
    };

    let handleClickClearButton = (input) => {
      clearInput();

      if (isPopperVisible.value) {
        input.focus();
      }
    };

    let handleScrollBottom = () => {
      page.value++;
      emit("update:page", page.value);
    };

    let handleClickItem = (item) => {
      selectItem(item);
    };

    expose({ show })

    return {
      classes,
      states,
      variants,
      localText,
      localModel,
      itemsPagination,
      getItemText,
      getItemValue,
      getItemClass,
      onPopperTransitionLeave,
      page,
      handleFocusInput,
      handleBlurInput,
      handleClickIndicator,
      handleClickClearButton,
      handleInput,
      handleScrollBottom,
      handleClickItem,
      isPopperVisible,
      reference,
      popper,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--autocomplete-transition-duration) ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
