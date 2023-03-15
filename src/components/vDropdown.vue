<template>
  <!-- @slot reference -->
  <slot
    name="reference"
    v-bind="referenceSlotProps"
    :is-open="isFloatingVisible"
  ></slot>

  <teleport to="body">
    <transition
      :name="transition"
    >
      <div
        v-if="isFloatingVisible"
        ref="floating"
        role="listbox"
        tabindex="-1"
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
import {
  sharedProps,
  sharedPopperProps,
  sharedStyleProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";
import { registerListener, removeListener } from "../trigger";
import useFloating from "./composition/use-floating"

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("dropdown"),
  modelValue: {
    type: Boolean,
    default: undefined,
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

const { offsetX, offsetY, flip, placement, autoPlacement, trigger } = toRefs(props);
const {
  isFloatingVisible,
  reference,
  floating,
  showPopper,
  hidePopper,
} = useFloating({ placement, offsetX, offsetY, flip, autoPlacement })

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
  showPopper();
  if (props.trigger === "click") {
    nextTick(() => {
      stopClickOutside = onClickOutside(floating, hide, reference);
    });
  }
};

let scheduleHide = () => {
  return setTimeout(hidePopper, 100);
};

let hide = () => {
  if (!isFloatingVisible.value) return;
  if (props.trigger === "hover") {
    hideTimeout = scheduleHide();
    return;
  }
  hidePopper();
  if (stopClickOutside) stopClickOutside = stopClickOutside();
};

let { onTrigger } = useTrigger(trigger, show, hide);

let referenceSlotProps = { reference, onTrigger, isOpen: isFloatingVisible };

// watch model changes
watch(
  () => props.modelValue,
  (value) => {
    if (value === undefined) return
    value ? show() : hide()
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
</style>
