<template>
  <teleport to="body">
    <transition :name="transition" @after-leave="onPopperTransitionLeave">
      <div
        v-if="isPopperVisible"
        ref="popper"
        role="listbox"
        tabindex="-1"
        class="absolute z-50"
      >
        <slot name="default" :hide="hide" v-bind="contextData"></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
// vue
import { ref, provide, toRef, toRefs, watch } from "vue";
// composition
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
// props
import { sharedPopperProps, sharedStyleProps } from "../shared-props";
// props
import { defaultProps } from "../defaultProps";

export default {
  inheritAttrs: true,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    ...sharedPopperProps("dropdown"),
    autoCloseMenu: {
      type: Boolean,
      default: defaultProps("dropdown", "autoCloseMenu", false),
    },
    transition: {
      type: String,
      default: defaultProps("dropdown", "transition", "fade"),
    },
    styleItem: {
      type: String,
      default: defaultProps("dropdown", "styleItem", ""),
    },
    styleHeader: {
      type: String,
      default: defaultProps("dropdown", "styleHeader", ""),
    },
    ...sharedStyleProps("dropdown"),
  },
  emits: ["state:opened", "state:closed", "update:modelValue"],
  inheritAttrs: false,
  setup(props, { slots, emit, expose, attrs }) {
    let { classes, states } = useStyles("dropdown", props, {
      item: {
        states: ["active", "disabled"],
      },
      header: {
        fixed: "fixed-item",
      },
    });

    // watch model changes
    watch(
      () => props.modelValue,
      (value) => (value ? show() : hide())
    );

    // set up popper
    const { offsetX, offsetY, noFlip, placement } = toRefs(props);
    const {
      isPopperVisible,
      popper,
      showPopper,
      hidePopper,
      onPopperTransitionLeave,
      updateVirtualElement,
    } = usePopper({ placement, offsetX, offsetY, noFlip, emit });

    let { onClickOutside } = useClickOutside();
    let stopClickOutside = null;

    let show = () => {
      if (isPopperVisible.value) return;

      showPopper();

      stopClickOutside = onClickOutside(popper, hide);
    };

    let hide = () => {
      if (!isPopperVisible.value) return;

      hidePopper();

      if (stopClickOutside) stopClickOutside = stopClickOutside();
    };

    let contextData = ref(null);

    let showContextDropdown = (ev, data) => {
      updateVirtualElement(ev);
      show();
      contextData.value = data;
    };

    provide("control-dropdown", {
      classes,
      states,
      autoCloseMenu: toRef(props, "autoCloseMenu"),
      hide,
      placement: toRef(props, "placement"),
    });

    expose({ showContextDropdown });

    return {
      popper,
      hide,
      isPopperVisible,
      onPopperTransitionLeave,
      contextData,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--dropdown-transition-duration, 0.2s) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
