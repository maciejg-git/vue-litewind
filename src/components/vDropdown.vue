<template>
  <slot
    v-if="!triggerById"
    name="reference"
    v-bind="referenceSlotProps"
    :is-open="isPopperVisible"
  ></slot>

  <teleport to="body">
    <transition :name="transition" @after-leave="onPopperTransitionLeave">
      <div
        v-if="isPopperVisible"
        ref="popper"
        role="listbox"
        tabindex="-1"
        @mouseenter="preventHiding"
        @mouseleave="allowHiding"
        class="fixed-dropdown"
      >
        <slot name="default" :hide="hide" v-bind="contextData"></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
// vue
import { ref, provide, toRef, toRefs, watch, onBeforeUnmount } from "vue";
// composition
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger";
// props
import { sharedPopperProps, sharedStyleProps } from "../shared-props";
// style
import "../styles/transitions.css";
import { defaultProps } from "../defaultProps";

import { addId, removeId } from "../identifiers";

export default {
  inheritAttrs: true,
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    ...sharedPopperProps(),
    autoCloseMenu: {
      type: Boolean,
      default: defaultProps("dropdown", "autoCloseMenu", false),
    },
    trigger: {
      type: String,
      default: "click",
    },
    triggerById: {
      type: String,
      default: "",
    },
    transition: {
      type: String,
      default: defaultProps("dropdown", "transition", "fade-m"),
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
  setup(props, { slots, emit, expose }) {
    let { classes, states } = useStyles("dropdown", props, {
      item: {
        fixed: "fixed-item",
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
    const { offsetX, offsetY, noFlip, placement, trigger } = toRefs(props);
    const {
      isPopperVisible,
      reference,
      popper,
      showPopper,
      hidePopper,
      onPopperTransitionLeave,
      updateVirtualElement,
    } = usePopper({ placement, offsetX, offsetY, noFlip, emit });

    let { onClickOutside } = useClickOutside();
    let stopClickOutside = null;

    // delay closing menu if using hover trigger
    let hideTimeout = null;

    let preventHiding = () => {
      if (props.trigger === "hover") clearTimeout(hideTimeout);
    };

    let allowHiding = () => {
      if (props.trigger === "hover") hideTimeout = scheduleHide();
    };

    // show and hide functions, hover trigger which adds short delay before
    // close

    let show = () => {
      if (isPopperVisible.value) return;
      if (props.trigger === "hover") clearTimeout(hideTimeout);
      showPopper();
      if (props.trigger === "click") {
        stopClickOutside = onClickOutside(popper, hide, reference);
      }
    };

    let scheduleHide = () => setTimeout(hidePopper, 100);

    let hide = () => {
      if (!isPopperVisible.value) return;
      if (props.trigger === "hover") {
        hideTimeout = scheduleHide();
        return;
      }
      hidePopper();
      if (stopClickOutside) stopClickOutside = stopClickOutside();
    };

    let onTrigger = useTrigger(trigger, show, hide);

    // trigger by id

    if (props.triggerById) {
      let addOnTriggerEvents = (el) => {
        for (let event in onTrigger) {
          el.addEventListener(event, onTrigger[event]);
        }
        reference.value = el;
      };

      let removeOnTriggerEvents = (el) => {
        for (let event in onTrigger) {
          el.removeEventListener(event, onTrigger[event]);
        }
        reference.value = null;
      }

      addId(props.triggerById, null, { addOnTriggerEvents, removeOnTriggerEvents });

      onBeforeUnmount(() => removeId(props.triggerById, "listener"))
    }


    let referenceSlotProps = { reference, onTrigger };

    // context dropdown

    let contextData = ref(null);

    let showContextDropdown = (ev, data) => {
      if (slots.reference) return;
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
      preventHiding,
      allowHiding,
      referenceSlotProps,
      contextData,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-dropdown {
  @apply absolute z-50;
}
</style>
