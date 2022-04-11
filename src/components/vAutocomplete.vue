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
  />

  <teleport to="body">
    <transition :name="transition">
      <div v-if="isPopperVisible" ref="popper" class="fixed-dropdown">
        <div :class="classes.dropdown.value">
          <div v-if="!filteredItems.length" :class="classes.item.value">
            No data available
          </div>
          <div
            v-else
            v-for="item in filteredItems"
            :key="item"
            :class="classes.item.value"
            @click="selectItem(item)"
          >
          <slot name="item" :item="item">
            {{ getItemText(item) }}
          </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref, computed, toRefs } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import { sharedPopperProps, sharedStyleProps } from "../sharedProps";

export default {
  props: {
    modelValue: { type: String, default: undefined },
    ...sharedPopperProps({ offsetY: 10 }),
    items: { type: Array, default: [] },
    state: { type: [String, Boolean], default: "" },
    itemText: { type: String, default: "" },
    itemValue: { type: String, default: "" },
    transition: { type: String, default: "fade" },
    styleAutocomplete: { type: [String, Array], default: "" },
    styleDropdown: { type: [String, Array], default: "" },
    styleItem: { type: [String, Array], default: "" },
    ...sharedStyleProps("autocomplete"),
  },
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
      showVirtualPopper,
    } = usePopper(
      { placement, offsetX, offsetY, noFlip, modelValue, emit },
      { resizePopper: true }
    );

    let { onClickOutside } = useClickOutside();
    let clickOutsideElements = [popper, reference];
    onClickOutside(clickOutsideElements, cancelInput);

    let filteredItems = computed(() => {
      if (localValue.value === "") return props.items;

      let regexp = new RegExp(localValue.value);

      return props.items.filter((i) => {
        return getItemValue(i).search(regexp) !== -1;
      });
    });

    let localValue = ref("");
    let touched = ref(false);

    let show = () => {
      if (!touched.value) {
        emit("input:touched")
        touched.value = true;
      }
      showPopper();
    }

    let getItemText = (item) => {
      return item[props.itemText] !== undefined ? item[props.itemText] : item;
    }

    let getItemValue = (item) => {
      return item[props.itemValue] !== undefined ? item[props.itemValue] : item;
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
    }

    return {
      classes,
      states,
      state,
      localValue,
      localModel,
      attrs,
      filteredItems,
      selectItem,
      getItemText,
      getItemValue,
      show,
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
