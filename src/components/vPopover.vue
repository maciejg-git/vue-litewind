<template>
  <!-- @slot reference -->
  <slot
    name="reference"
    v-bind="referenceSlotProps"
    :is-open="isPopperVisible"
  ></slot>

  <teleport to="body">
    <transition
      :name="transition"
      @before-leave="lockPopper"
      @after-leave="destroyPopperInstance"
    >
      <div
        v-if="isPopperVisible"
        ref="popper"
        :aria-expanded="!!popper"
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
  toRef,
  toRefs,
  onBeforeUnmount,
  provide,
  useAttrs,
  useSlots,
  nextTick,
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
  ...sharedStyleProps("popover"),
  ...sharedPopperProps("popover"),
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
  styleHeader: {
    type: String,
    default: defaultProps("popover", "stylePopover", ""),
  },
});

const attrs = useAttrs();

const slots = useSlots();

let { classes } = useStyles("popover", props, {
  header: null,
});

const { offsetX, offsetY, noFlip, placement, trigger } = toRefs(props);

// popper
const {
  isPopperVisible,
  reference,
  popper,
  showPopper,
  hidePopper,
  destroyPopperInstance,
  lockPopper,
} = usePopper({ placement, offsetX, offsetY, noFlip });

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
  if (isPopperVisible.value) return;
  if (props.trigger === "hover") clearTimeout(hideTimeout);
  showPopper();
  if (props.trigger === "click") {
    nextTick(() => {
      stopClickOutside = onClickOutside(popper, hide, reference);
    });
  }
};

let scheduleHide = () => {
  return setTimeout(hidePopper, 100);
};

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

provide("control-popover", {
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
</style>
