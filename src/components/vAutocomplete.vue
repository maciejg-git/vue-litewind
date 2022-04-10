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
    @input="showPopper()"
    @click="showPopper()"
  >

  <teleport to="body">
    <transition :name="transition">
      <div
        v-if="isPopperVisible"
        ref="popper"
        class="fixed-dropdown"
      >
        <slot name="default">
          <v-card style-card="shadow" class="max-h-[300px] overflow-y-auto">
            <div v-if="!filteredItems.length" :class="[classes.item.value]">No data available</div>
            <div v-else v-for="item in filteredItems" :class="[classes.item.value]" @click="selectItem(item)"> {{ item }} </div>
          </v-card>
        </slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref, computed, toRefs } from "vue";
import useStyles from "./composition/use-styles"
import useLocalModel from "./composition/use-local-model"
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import { sharedPopperProps, sharedStyleProps } from "../sharedProps"
import vCard from "./vCard.vue";

export default {
  props: {
    modelValue: { type: String, default: undefined },
    ...sharedPopperProps({ offsetY: 10 }),
    items: { type: Array, default: [] },
    state: { type: [String, Boolean], default: "" },
    transition: { type: String, default: "fade" },
    styleAutocomplete: { type: [String, Array], default: "" },
    styleItem: { type: [String, Array], default: "" },
    ...sharedStyleProps("autocomplete"),
  },
  components: {
    vCard,
  },
  setup(props, { attrs, emit } ) {
    let { classes, states } = useStyles("autocomplete", props, {
      autocomplete: {
        states: ["valid", "invalid", "disabled"],
      },
      item: {
        fixed: "fixed-item",
        states: ["active", "disabled"],
      }
    })

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
    } = usePopper({ placement, offsetX, offsetY, noFlip, modelValue, emit });

    let { onClickOutside } = useClickOutside();
    let clickOutsideElements = [popper, reference];
    onClickOutside(clickOutsideElements, cancelInput);

    let filteredItems = computed(() => {
      if (localValue.value === '') return props.items

      let regexp = new RegExp("^" + localValue.value)

      return props.items.filter((i) => {
        return i.search(regexp) !== -1;
      })
    })

    let localValue = ref("")

    let update = (item) => {
      localValue.value = item;
      localModel.value = localValue.value;
    }

    let revert = () => {
      localValue.value = localModel.value;
    }

    function cancelInput() {
      revert()
      hidePopper()
    }

    let selectItem = (item) => {
      update(item)
      hidePopper()
    }

    let state = computed(() => {
      props.state === true ? "valid" : props.state === false ? "invalid" : props.state === null ? "" : props.state
    })

    return {
      classes,
      states,
      state,
      localValue,
      localModel,
      attrs,
      filteredItems,
      selectItem,
      isPopperVisible,
      reference,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
      showVirtualPopper,
    }
  },
}
</script>

<style scoped>
.fixed-dropdown {
  @apply absolute z-50;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
