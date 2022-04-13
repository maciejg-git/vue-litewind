<template>
  <input
    v-model="localValue"
    type="text"
    ref="reference"
    :class="[
      classes.autocomplete.value,
      states.autocomplete.value && states.autocomplete.value[state],
      attrs.disabled === '' || attrs.disabled === true
        ? states.autocomplete.disabled
        : '',
    ]"
    @input="handleInput"
    @click="show()"
    v-bind="$attrs"
  />

  <teleport to="body">
    <transition :name="transition" @after-leave="onPopperTransitionLeave">
      <div v-if="isPopperVisible" ref="popper" class="fixed-dropdown">
        <div :class="classes.dropdown.value" v-scroll-bottom="() => page++">
          <div v-if="!itemsFiltered.length" :class="classes.item.value">
            No data available
          </div>
          <div
            v-else
            v-for="item in itemsPagination"
            :key="item"
            :class="classes.item.value"
            @click="selectItem(item)"
          >
            <slot name="item" :item="item">
              <span v-html="highlightString(getItemText(item))"></span>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref, computed, watch, toRefs } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import scrollBottom from "../directives/scroll-bottom";
import { sharedPopperProps, sharedStyleProps } from "../sharedProps";

export default {
  props: {
    modelValue: { type: String, default: undefined },
    ...sharedPopperProps({ offsetY: 10 }),
    items: { type: Array, default: [] },
    state: { type: [String, Boolean], default: "" },
    itemText: { type: String, default: "text" },
    itemValue: { type: String, default: "value" },
    isLoading: { type: Boolean, default: false },
    itemsPerPage: { type: Number, default: 10 },
    transition: { type: String, default: "fade" },
    styleAutocomplete: { type: [String, Array], default: "" },
    styleDropdown: { type: [String, Array], default: "" },
    styleItem: { type: [String, Array], default: "" },
    ...sharedStyleProps("autocomplete"),
  },
  directives: {
    scrollBottom,
  },
  emits: [
    "update:modelValue",
    "state:touched",
    "input:value",
    "state:opened",
    "state:closed",
  ],
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("autocomplete", props, {
      autocomplete: {
        states: ["valid", "invalid", "disabled"],
      },
      dropdown: {
        fixed: "fixed-autocomplete-dropdown",
      },
      item: {
        fixed: "fixed-item",
        states: ["active", "disabled"],
      },
    });

    let localModel = useLocalModel(props, emit);

    const { offsetX, offsetY, noFlip, placement, modelValue } = toRefs(props);
    const {
      isPopperVisible,
      reference,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
      onPopperTransitionLeave,
      showVirtualPopper,
    } = usePopper(
      { placement, offsetX, offsetY, noFlip, modelValue, emit },
      { resizePopper: true }
    );

    let { onClickOutside } = useClickOutside();
    let clickOutsideElements = [popper, reference];
    onClickOutside(clickOutsideElements, cancelInput);

    let touched = ref(false);

    let show = () => {
      if (!touched.value) {
        emit("state:touched");
        touched.value = true;
      }
      showPopper();
    };

    let localValue = ref("");

    let itemsFiltered = computed(() => {
      if (localValue.value === "") return props.items;

      let regexp = new RegExp(localValue.value);

      return props.items.filter((i) => {
        return getItemValue(i).search(regexp) !== -1;
      });
    });

    let page = ref(0);

    let itemsPagination = computed(() => {
      if (props.itemsPerPage === 0) return itemsFiltered.value;

      return itemsFiltered.value.slice(
        0,
        (page.value + 1) * props.itemsPerPage
      );
    });

    let getItemText = (item) => {
      return item[props.itemText] !== undefined ? item[props.itemText] : item;
    };

    let getItemValue = (item) => {
      return item[props.itemValue] !== undefined ? item[props.itemValue] : item;
    };

    let highlightString = (string) => {
      return string.replace(new RegExp("(" + localValue.value + ")"), "<span>$1</span>")
    } 

    let update = (item) => {
      localValue.value = getItemValue(item);
      localModel.value = localValue.value;
    };

    let revert = () => {
      localValue.value = localModel.value;
    };

    function cancelInput() {
      revert();
      hidePopper();
    }

    let selectItem = (item) => {
      update(item);
      hidePopper();
    };

    let state = computed(() => {
      props.state === true
        ? "valid"
        : props.state === false
        ? "invalid"
        : props.state === null
        ? ""
        : props.state;
    });

    let handleInput = () => {
      show();
      emit("input:value", localValue.value);
    };

    return {
      classes,
      states,
      state,
      localValue,
      localModel,
      attrs,
      itemsFiltered,
      itemsPagination,
      selectItem,
      getItemText,
      getItemValue,
      show,
      onPopperTransitionLeave,
      page,
      highlightString,
      handleInput,
      isPopperVisible,
      reference,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
      showVirtualPopper,
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
