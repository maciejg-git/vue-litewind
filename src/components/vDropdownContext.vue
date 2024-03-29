<template>
  <teleport to="body">
    <transition :name="transition">
      <!-- @after-leave="destroyPopperInstance" -->
      <div
        v-if="isFloatingVisible"
        ref="floating"
        role="listbox"
        tabindex="-1"
        class="absolute z-50"
      >
        <!-- @slot default -->
        <slot
          name="default"
          :hide="hide"
          v-bind="contextData"
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
import { ref, provide, toRef, toRefs, watch, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import useClickOutside from "./composition/use-click-outside";
import {
  sharedProps,
  sharedFloatingUIProps,
  sharedModProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";
import useFloating from "./composition/use-floating";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("dropdown", ["Item", "Header"]),
  ...sharedFloatingUIProps("dropdown"),
  modelValue: {
    type: Boolean,
    default: false,
  },
  autoCloseMenu: {
    type: Boolean,
    default: defaultProps("dropdown", "autoCloseMenu", false),
  },
  transition: {
    type: String,
    default: defaultProps("dropdown", "transition", "fade"),
  },
});

const emit = defineEmits(["state:opened", "state:closed", "update:modelValue"]);

let { dropdown } = inject("mods", {})

let elements = {
  item: {
    externalVariants: ["variant"],
  },
  header: null,
}

let { classes, variants } = useTailwindStyles(props, dropdown, elements)

const { offsetX, offsetY, flip, placement, autoPlacement } = toRefs(props);
const {
  isFloatingVisible,
  floating,
  showFloating,
  hideFloating,
  updateFloating,
  updateVirtualElement,
} = useFloating({ placement, offsetX, offsetY, flip, autoPlacement });

let { onClickOutside } = useClickOutside();
let stopClickOutside = null;

let show = () => {
  if (isFloatingVisible.value) return;
  showFloating();
  stopClickOutside = onClickOutside(floating, hide);
};

let hide = () => {
  if (!isFloatingVisible.value) return;
  hideFloating();
  if (stopClickOutside) stopClickOutside = stopClickOutside();
};

// watch model changes
watch(
  () => props.modelValue,
  (value) => (value ? show() : hide())
);

// context menu

let contextData = ref(null);

let showContextDropdown = (ev, data) => {
  updateVirtualElement(ev);
  show();
  updateFloating();
  contextData.value = data;
};

provide("_control-dropdown", {
  classes,
  variants,
  autoCloseMenu: toRef(props, "autoCloseMenu"),
  hide,
  placement: toRef(props, "placement"),
});

defineExpose({ showContextDropdown });
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
