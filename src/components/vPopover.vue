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
        :aria-expanded="!!floating"
        @mouseenter="preventHiding"
        @mouseleave="allowHiding"
        class="group absolute z-50"
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
  toRef,
  toRefs,
  onBeforeUnmount,
  provide,
  useAttrs,
  useSlots,
  nextTick,
  inject,
} from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles";
import useClickOutside from "./composition/use-click-outside";
import useTriggerEvents from "./composition/use-trigger-events";
import useFloating from "./composition/use-floating";
import {
  sharedProps,
  sharedFloatingUIProps,
  sharedModProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";
import { registerListener, removeListener } from "./composition/use-trigger";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("popover", ["Header"]),
  ...sharedFloatingUIProps("popover"),
  trigger: {
    type: String,
    default: "click",
  },
  title: {
    type: String,
    default: undefined,
  },
  transition: {
    type: String,
    default: defaultProps("popover", "transition", "fade"),
  },
});

const attrs = useAttrs();

const slots = useSlots();

let { popover } = inject("mods", {});

let elements = {
  header: null,
};

let { classes } = useTailwindStyles(props, popover, elements);

const { offsetX, offsetY, flip, placement, autoPlacement, trigger } =
  toRefs(props);

const { isFloatingVisible, reference, floating, showFloating, hideFloating } =
  useFloating({ placement, offsetX, offsetY, flip, autoPlacement });

let { onClickOutside } = useClickOutside();
let stopClickOutside = null;

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

let { onTrigger } = useTriggerEvents(trigger, show, hide);

let referenceSlotProps = { reference, onTrigger, isOpen: isFloatingVisible };

// trigger by id

let { id } = attrs;

if (id && !slots.reference) {
  registerListener(id, referenceSlotProps);

  onBeforeUnmount(() => removeListener(id));
}

provide("_control-popover", {
  classes,
  title: toRef(props, "title"),
  hide,
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--popover-transition-duration) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity var(--popover-transition-duration, 0.2s) ease,
    transform var(--popover-transition-duration, 0.2s) ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(var(--popover-transition-slide, -15px));
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  @apply data-[placement=bottom]:origin-top data-[placement=left]:origin-top data-[placement=right]:origin-top data-[placement=top]:origin-bottom;
  transition: opacity var(--popover-transition-duration, 0.2s) ease,
    transform var(--popover-transition-duration, 0.2s) ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scaleY(var(--popover-transition-scale, 0.2));
}
</style>
