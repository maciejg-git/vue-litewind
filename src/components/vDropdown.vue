<template>
  <!-- @slot reference -->
  <slot
    name="reference"
    v-bind="referenceSlotProps"
    :is-open="isFloatingVisible"
  ></slot>

  <teleport to="body">
    <transition :name="transition">
      <div
        v-if="isFloatingVisible"
        ref="floating"
        role="listbox"
        tabindex="-1"
        v-bind="$attrs"
        @mouseenter="preventHiding"
        @mouseleave="allowHiding"
        class="absolute z-50"
      >
        <!-- @slot default -->
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
  nextTick,
} from "vue";
import useStyles from "./composition/use-styles";
import useClickOutside from "./composition/use-click-outside";
import useTrigger from "./composition/use-trigger-events";
import useFloating from "./composition/use-floating";
import {
  sharedProps,
  sharedFloatingProps,
  sharedStyleProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";
import { registerListener, removeListener } from "../trigger";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("dropdown", ["Item", "Header"]),
  ...sharedFloatingProps("dropdown"),
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  autoCloseMenu: {
    type: Boolean,
    default: defaultProps("dropdown", "autoCloseMenu", false),
  },
  trigger: {
    type: String,
    default: "click",
  },
  transition: {
    type: String,
    default: defaultProps("dropdown", "transition", "fade-scale"),
  },
});

const emit = defineEmits(["state:opened", "state:closed", "update:modelValue"]);

const attrs = useAttrs();

const slots = useSlots();

let { classes, states } = useStyles("dropdown", props, {
  item: {
    states: ["active"],
  },
  header: null,
});

const { offsetX, offsetY, flip, placement, autoPlacement, trigger } =
  toRefs(props);

const { isFloatingVisible, reference, floating, showFloating, hideFloating } =
  useFloating({ placement, offsetX, offsetY, flip, autoPlacement });

let { onClickOutside } = useClickOutside();
let stopClickOutside = null;

// delay closing menu if using hover trigger
let hideTimeout = null;

let preventHiding = () => {
  if (props.trigger === "hover") {
    clearTimeout(hideTimeout);
  }
};

let allowHiding = () => {
  if (props.trigger === "hover") {
    hideTimeout = scheduleHide();
  }
};

// show and hide functions, hover trigger which adds short delay before
// close

let show = () => {
  if (isFloatingVisible.value) return;
  if (props.trigger === "hover") clearTimeout(hideTimeout);
  showFloating();
  if (props.trigger === "click") {
    nextTick(() => {
      stopClickOutside = onClickOutside(floating, hide, reference);
    });
  }
};

let scheduleHide = () => {
  return setTimeout(hideFloating, 100);
};

let hide = () => {
  if (!isFloatingVisible.value) return;
  if (props.trigger === "hover") {
    hideTimeout = scheduleHide();
    return;
  }
  hideFloating();
  if (stopClickOutside) stopClickOutside = stopClickOutside();
};

let { onTrigger } = useTrigger(trigger, show, hide);

let referenceSlotProps = { reference, onTrigger, isOpen: isFloatingVisible };

// watch model changes
watch(
  () => props.modelValue,
  (value) => {
    if (value === undefined) return;
    value ? show() : hide();
  },
  { immediate: true }
);

// set up trigger by id

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
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity var(--dropdown-transition-duration, 0.2s) ease,
    transform var(--dropdown-transition-duration, 0.2s) ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(var(--dropdown-transition-slide, -15px));
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  @apply data-[placement=bottom]:origin-top data-[placement=left]:origin-top data-[placement=right]:origin-top data-[placement=top]:origin-bottom;
  transition: opacity var(--dropdown-transition-duration, 0.2s) ease,
    transform var(--dropdown-transition-duration, 0.2s) ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scaleY(var(--dropdown-transition-scale, 0.2));
}
</style>
