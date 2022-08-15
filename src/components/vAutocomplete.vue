<template>
  <v-input
    v-model="localText"
    v-bind="$attrs"
    type="text"
    ref="reference"
    :icon="icon"
    :isLoading="isLoading"
    :custom-clearable="clearable"
    :useLoader="!noLoader"
    show-indicator
    :indicator-switch="isPopperVisible"
    :chevron="chevron"
    @input="handleInput"
    @focus="handleFocusInput"
    @input:blur="handleBlurInput"
    @click:indicator="handleClickIndicator"
    @click:clear-button="handleClickClearButton"
  />

  <teleport to="body">
    <transition :name="transition" @after-leave="onPopperTransitionLeave">
      <div v-if="isPopperVisible" ref="popper">
        <div
          :class="classes.menu.value"
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
              <span v-html="getHighligtedText(item)"></span>
            </slot>
          </div>
        </div>
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
import vInput from "./vInput.vue"
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

export default {
  props: {
    modelValue: { type: [String, Object], default: undefined },
    ...sharedPopperProps({ offsetY: 10 }),
    items: { type: Array, default: [] },
    itemText: { type: String, default: "text" },
    itemValue: { type: String, default: "value" },
    filterKeys: { type: Array, default: [] },
    isLoading: { type: Boolean, default: false },
    noFilter: { type: Boolean, default: false },
    noPagination: { type: Boolean, default: false },
    noLoader: { type: Boolean, default: false },
    emptyDataMessage: { type: String, default: "No data available" },
    chevron: { type: Object, default: {} },
    itemsPerPage: { type: Number, default: 10 },
    transition: { type: String, default: "fade" },
    styleMenu: { type: [String, Array], default: "" },
    styleItem: { type: [String, Array], default: "" },
    styleMatch: { type: [String, Array], default: "" },
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
    "state:focus",
    "input:value",
    "state:opened",
    "state:closed",
  ],
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    let { classes, states, variants } = useStyles("autocomplete", props, {
      menu: {
        fixed: "fixed-autocomplete-menu",
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
      if (!props.items.length) return

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
      return highlightMatch(string, match, classes.match.value)
    }

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
      show()
    };

    let handleInput = () => {
      isNewSelection.value = false;
      emit("input:value", localText.value);
    };

    let handleBlurInput = (ev) => {
      if (!isPopperVisible.value) {
        return
      }

      if (!isPopperChild(ev.relatedTarget)) {
        cancelInput();
      }
    };

    let handleClickIndicator = (input) => {
      if (props.isLoading) return

      if (isPopperVisible.value) {
        cancelInput()
        return
      }

      input.focus()
    }

    let handleClickClearButton = (input) => {
      clearInput();

      if (isPopperVisible.value) {
        input.focus()
      }
    }

    let handleScrollBottom = () => {
      page.value++;
      emit("update:page", page.value);
    };

    let handleClickItem = (item) => {
      selectItem(item);
    }

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
.fixed-autocomplete-menu {
  @apply max-h-[300px] overflow-y-auto overflow-x-hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
