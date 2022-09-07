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
            v-if="!itemsPagination.length && !isLoading"
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
              :highlight="highlight"
              :inputValue="localText"
            >
              <span v-if="noHighlight">{{ getItemText(item) }}</span>
              <span v-else v-html="getHighligtedText(item)"></span>
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
      type: [String, Object],
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
  ],
  inheritAttrs: false,
  setup(props, { emit }) {
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
    let isNewSelection = ref(true);

    // show autocomplete menu

    let show = () => {
      if (!props.items.length) return;

      isNewSelection.value = true;

      showPopper();
    };

    // show menu if items prop changes

    watch(
      () => props.items,
      (value) => {
        if (!isPopperVisible.value && props.noFilter && value) {
          show();
        }
      }
    );

    // get text and value of item

    let getItemText = (item, key) => {
      return isString(item)
        ? item
        : item[key !== undefined ? key : props.itemText];
    };

    let getItemValue = (item) => {
      return isString(item) ? item : item[props.itemValue];
    };

    let itemsFiltered = computed(() => {
      if (props.isLoading || props.noFilter) return props.items;
      if (isNewSelection.value) return props.items;

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
        return (
          i && i.toLowerCase().indexOf(localText.value.toLowerCase()) !== -1
        );
      });
    });

    let page = ref(0);

    let itemsPagination = computed(() => {
      if (props.itemsPerPage === 0 || props.noPagination) {
        return itemsFiltered.value;
      }

      return itemsFiltered.value.slice(
        0,
        (page.value + 1) * props.itemsPerPage
      );
    });

    let getHighligtedText = (item) => {
      return highlightMatch(
        getItemText(item),
        localText.value,
        classes.match.value
      );
    };

    let highlight = (string, match) => {
      return highlightMatch(string, match, classes.match.value);
    };

    let update = (item) => {
      selectedItem.value = item;
      localText.value = getItemText(item);
      localModel.value = getItemValue(item);
    };

    let revert = () => {
      if (!selectedItem.value) {
        localText.value = "";
        return;
      }
      localText.value = getItemText(selectedItem.value);
    };

    let cancelInput = () => {
      revert();
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
      isNewSelection.value = false;
      emit("input:value", localText.value);
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

    return {
      classes,
      states,
      variants,
      localText,
      localModel,
      itemsFiltered,
      itemsPagination,
      getItemText,
      getItemValue,
      getHighligtedText,
      getItemClass,
      onPopperTransitionLeave,
      page,
      highlight,
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
