<template>
  <div class="inline-flex relative items-center">
    <slot name="icon">
      <v-icon
        v-if="icon"
        :name="icon"
        class="absolute"
        :class="classes.icon.value"
      ></v-icon>
    </slot>

    <input
      v-model="localText"
      v-bind="$attrs"
      type="text"
      ref="reference"
      class="block w-full pr-10"
      :class="getInputClasses()"
      @input="handleInput"
      @focus="handleClickInput"
    />
    <div class="absolute flex right-0 mr-2">
      <v-spinner v-if="!noLoader" v-show="isLoading" type="svg"></v-spinner>
      <v-close-button
        v-if="clearable"
        class="ml-2"
        @click="handleClickClearButton"
      ></v-close-button>
    </div>
  </div>

  <teleport to="body">
    <transition :name="transition" @after-leave="onPopperTransitionLeave">
      <div v-if="isPopperVisible" ref="popper" class="fixed-dropdown">
        <div :class="classes.dropdown.value" v-detect-scroll-bottom="handlePagination">
          <div
            v-if="!itemsPagination.length && !isLoading"
            :class="classes.item.value"
          >
            No data available
          </div>
          <div
            v-else
            v-for="item in itemsPagination"
            :key="item"
            :class="getItemClass(item)"
            @click="selectItem(item)"
          >
            <slot
              name="item"
              :text="getItemText(item)"
              :value="getItemValue(item)"
              :item="item"
              :highlightMatch="highlightMatch"
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
import useClickOutside from "./composition/use-click-outside";
// components
import vSpinner from "./vSpinner.vue";
import vCloseButton from "./vCloseButton.vue";
// directives
import detectScrollBottom from "../directives/detect-scroll-bottom";
// props
import {
  sharedPopperProps,
  sharedStyleProps,
  sharedFormProps,
} from "../shared-props";

export default {
  props: {
    modelValue: { type: String, default: undefined },
    ...sharedPopperProps({ offsetY: 10 }),
    items: { type: Array, default: [] },
    itemText: { type: String, default: "text" },
    itemValue: { type: String, default: "value" },
    isLoading: { type: Boolean, default: false },
    noFilter: { type: Boolean, default: false },
    noPagination: { type: Boolean, default: false },
    noLoader: { type: Boolean, default: false },
    itemsPerPage: { type: Number, default: 10 },
    transition: { type: String, default: "fade" },
    styleAutocomplete: { type: [String, Array], default: "" },
    styleDropdown: { type: [String, Array], default: "" },
    styleItem: { type: [String, Array], default: "" },
    styleMatch: { type: [String, Array], default: "" },
    styleIcon: { type: [String, Array], default: "" },
    ...sharedFormProps(null, { icon: true, clearable: true }),
    ...sharedStyleProps("autocomplete"),
  },
  components: {
    vSpinner,
    vCloseButton,
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
  setup(props, { attrs, emit }) {
    let { classes, states, variants } = useStyles("autocomplete", props, {
      autocomplete: {
        states: ["valid", "invalid", "disabled"],
        variants: ["icon-variant", "clearable-variant"],
      },
      dropdown: {
        fixed: "fixed-autocomplete-dropdown",
      },
      item: {
        fixed: "fixed-item",
        states: ["active", "disabled"],
      },
      match: null,
      icon: null,
    });

    let getInputClasses = () => {
      return [
        classes.autocomplete.value,
        states.autocomplete.value && states.autocomplete.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.autocomplete.disabled
          : "",
        props.icon ? variants.autocomplete.value["icon-variant"] : "",
        props.clearable ? variants.autocomplete.value["clearable-variant"] : "",
      ];
    };

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
      reference,
      popper,
      showPopper,
      hidePopper,
      onPopperTransitionLeave,
    } = usePopper(
      { placement, offsetX, offsetY, noFlip, modelValue, emit },
      { resizePopper: true }
    );

    let { onClickOutside } = useClickOutside();
    let clickOutsideElements = [popper, reference];
    onClickOutside(clickOutsideElements, cancelInput);

    let selectedItem = ref(null);
    let localText = ref("");
    let isNewSelection = ref(true);
    let isVisible = ref(false);

    // show autocomplete menu

    let show = () => {
      isNewSelection.value = true;
      showPopper();
    };

    // those watchers show autocomplete menu after all data is ready

    watch(
      () => props.isLoading,
      (value) => {
        !isPopperVisible.value && isVisible.value && !value && show();
      }
    );

    watch(isVisible, (value) => {
      !isPopperVisible.value && value && !props.noFilter && show();
    });

    // get text and value of item

    let getItemText = (item) => {
      return item[props.itemText] !== undefined ? item[props.itemText] : item;
    };

    let getItemValue = (item) => {
      return item[props.itemValue] !== undefined ? item[props.itemValue] : item;
    };

    // filter items

    let itemsFiltered = computed(() => {
      if (props.isLoading || props.noFilter) return props.items;
      if (isNewSelection.value) return props.items;

      return props.items.filter((i) => {
        return (
          getItemText(i)
            .toLowerCase()
            .indexOf(localText.value.toLowerCase()) !== -1
        );
      });
    });

    // paginate items

    let page = ref(0);

    let itemsPagination = computed(() => {
      if (props.itemsPerPage === 0 || props.noPagination)
        return itemsFiltered.value;

      return itemsFiltered.value.slice(
        0,
        (page.value + 1) * props.itemsPerPage
      );
    });

    // matching text higlight

    let getHighligtedText = (item) =>
      highlightMatch(getItemText(item), localText.value);

    let highlightMatch = (string, match) => {
      return string.replace(
        new RegExp(`(${match})`, "i"),
        `<span class='${classes.match.value}'>$1</span>`
      );
    };

    // update local input text and model after selecting option

    let update = (item) => {
      selectedItem.value = item;
      localText.value = getItemText(item);
      localModel.value = getItemValue(item);
    };

    // revert to previous value for example after closing
    // dropdown menu without selecting option

    let revert = () => {
      if (!selectedItem.value) {
        localText.value = "";
        return;
      }
      localText.value = getItemText(selectedItem.value);
    };

    function cancelInput() {
      if (isVisible.value) isVisible.value = false;
      revert();
      hidePopper();
    }

    let selectItem = (item) => {
      if (isVisible.value) isVisible.value = false;
      update(item);
      hidePopper();
    };

    let clearInput = () => {
      localText.value = "";
      selectedItem.value = "";
      localModel.value = "";
    };

    // use state?

    let state = computed(() => {
      props.state === true
        ? "valid"
        : props.state === false
        ? "invalid"
        : props.state === null
        ? ""
        : props.state;
    });

    // handle template events

    let handlePagination = () => {
      page.value++;
      emit("update:page", page.value);
    };

    let handleClickInput = () => {
      emit("state:focus");
      if (!isVisible.value) isVisible.value = true;
    };

    let handleClickClearButton = () => clearInput();

    let handleInput = () => {
      if (!isVisible.value) isVisible.value = true;
      isNewSelection.value = false;
      emit("input:value", localText.value);
    };

    return {
      classes,
      states,
      variants,
      state,
      localText,
      localModel,
      getInputClasses,
      itemsFiltered,
      itemsPagination,
      selectItem,
      getItemText,
      getItemValue,
      getHighligtedText,
      isNewSelection,
      show,
      getItemClass,
      onPopperTransitionLeave,
      page,
      highlightMatch,
      handleClickInput,
      handleClickClearButton,
      handleInput,
      handlePagination,
      isPopperVisible,
      reference,
      popper,
    };
  },
};
</script>

<style scoped>
.fixed-autocomplete-dropdown {
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
