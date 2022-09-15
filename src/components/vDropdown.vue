<template>
  <slot
    name="reference"
    v-bind="referenceSlotProps"
    :is-open="isPopperVisible"
  ></slot>

  <teleport to="body">
    <transition
      :name="transition"
      @after-leave="onPopperTransitionLeave"
    >
      <div
        v-if="isPopperVisible"
        ref="popper"
        role="listbox"
        tabindex="-1"
        @mouseenter="preventHiding"
        @mouseleave="allowHiding"
        class="absolute z-50"
      >
        <slot
          name="default"
          :hide="hide"
        ></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import {
  provide,
  toRef,
  toRefs,
  watch,
  onBeforeUnmount,
  useAttrs,
  useSlots,
} from "vue";
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger";
import {
  sharedProps,
  sharedPopperProps,
  sharedStyleProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";
import { registerListener, removeListener } from "../trigger";

const props = defineProps({
  ...sharedProps(),
  modelValue: {
    type: Boolean,
    default: false,
  },
  ...sharedPopperProps("dropdown"),
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
});

const emit = defineEmits(["state:opened", "state:closed", "update:modelValue"]);

const attrs = useAttrs();

const slots = useSlots();

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
const { offsetX, offsetY, noFlip, placement, trigger } = toRefs(props);
const {
  isPopperVisible,
  reference,
  popper,
  showPopper,
  hidePopper,
  onPopperTransitionLeave,
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

let { onTrigger } = useTrigger(trigger, show, hide);

let referenceSlotProps = { reference, onTrigger, isOpen: isPopperVisible };

// trigger by id

let { id } = attrs;

if (id && !slots.reference) {
  registerListener(id, referenceSlotProps);

  onBeforeUnmount(() => removeListener(id));
}

provide("control-dropdown", {
  classes,
  states,
  autoCloseMenu: toRef(props, "autoCloseMenu"),
  hide,
  placement: toRef(props, "placement"),
});
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
