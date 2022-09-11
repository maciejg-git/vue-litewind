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
    :readonly="!autocomplete"
    :inline="inline"
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
          v-bind="card"
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
import { isString, isBoolean, isObject } from "../tools";
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
      default: defaultProps("select", "useLoader", true),
    },
    ...sharedPopperProps("select"),
    items: {
      type: Array,
      default: [],
    },
    inline: {
      type: Boolean,
      default: defaultProps("select", "inline", false),
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
      default: defaultProps(
        "autocomplete",
        "emptyDataMessage",
        "No data available"
      ),
    },
    input: {
      type: Object,
      default: defaultProps("select", "input", {}),
    },
    card: {
      type: Object,
      default: defaultProps("select", "card", {}),
    },
    chevron: {
      type: Object,
      default: defaultProps("select", "chevron", {}),
    },
    itemsPerPage: {
      type: Number,
      default: defaultProps("select", "itemsPerPage", 10),
    },
    transition: {
      type: String,
      default: defaultProps("select", "transition", "fade"),
    },
    styleMenu: {
      type: String,
      default: defaultProps("select", "styleMenu", ""),
    },
    styleItem: {
      type: String,
      default: defaultProps("select", "styleItem", ""),
    },
    ...sharedFormProps(null, { icon: true, clearable: true }),
    ...sharedStyleProps("select"),
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
    let { classes, states, variants } = useStyles("select", props, {
      menu: {
        fixed: "max-h-[300px] overflow-y-auto overflow-x-hidden",
      },
      item: {
        fixed: "fixed-item",
        states: ["active", "disabled"],
      },
    });

    let getItemClass = (item) => {
      return [
        classes.item.value,
        item.disabled ? states.item.value.disabled : "",
      ]
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
        if (props.autocomplete && !isPopperVisible.value && props.noFilter) {
          show();
        }
      }
    );

    // get text and value of item

    let getItemText = (item, key) => {
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

    let itemsFiltered = computed(() => {
      if (!props.autocomplete) return props.items;
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
      if (props.autocomplete) {
        revert();
      }
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

    watch(
      localModel,
      (value) => {
        update(value);
      },
      { immediate: true }
    );

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
