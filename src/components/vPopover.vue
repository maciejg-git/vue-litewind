<template>
  <div
    v-if="slots.activator"
    ref="activator"
    class="inline-block"
    @[trigger.on]="showPopover"
    @[trigger.off]="hidePopover"
    @[trigger.toggle]="togglePopover"
  >
    <slot name="activator"></slot>
  </div>
  <teleport to="body">
    <transition :name="transition">
      <div
        v-if="isOpen"
        ref="popper"
        v-bind="$attrs"
        :class="classes.popover.value"
      >
        <header
          v-if="!noHeader"
          class="flex bg-gray-100 border-b font-semibold px-3 py-2"
        >
          {{ title }}
          <v-close-button class="ml-auto" @click="hidePopover" />
        </header>
        <div :class="classes.content.value">
          <slot name="default"></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import {
  toRefs,
  reactive,
  computed,
  onMounted,
  watch,
  watchEffect,
  getCurrentInstance,
} from "vue";
import useStyles from "./composition/use-styles";
import usePopper from "./composition/usePopper.js";
import { removeTailwindClasses } from "../tools/tools.js";
import { correctPlacement } from "../const.js";

export default {
  props: {
    modelValue: { type: Boolean, default: false },
    placement: { type: String, default: "auto" },
    trigger: { type: String, default: "click" },
    delay: { type: Number, default: 50 },
    noHeader: { type: Boolean, default: false },
    title: { type: String, default: undefined },
    transition: { type: String, default: "fade" },
    clickOutsideClose: { type: Boolean, default: false },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 5 },
    targetId: { type: String, default: undefined },
    name: { type: String, default: "popover" },
    theme: { type: String, default: "default" },
    stylePopover: { type: String, default: "default" },
    styleContent: { type: String, default: "default" },
  },
  setup(props, { slots, emit }) {
    let elements = ["popover", "content"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      popover: computed(() => {
        let c = [...styles.popover.value];
        return removeTailwindClasses(c);
      }),
      content: computed(() => {
        let c = [...styles.content.value];
        return removeTailwindClasses(c);
      }),
    };

    let activatorId = null;

    let trigger = reactive({
      on: null,
      off: null,
      toggle: null,
    });

    watchEffect(() => {
      if (props.trigger == "click") {
        trigger.on = null;
        trigger.off = null;
        trigger.toggle = "click";
      } else if (props.trigger == "hover") {
        trigger.on = "mouseenter";
        trigger.off = "mouseleave";
        trigger.toggle = null;
      } else if (props.trigger == "focus") {
        trigger.on = "focusin";
        trigger.off = "focusout";
        trigger.toggle = null;
      }
    });

    onMounted(() => {
      if (props.targetId) {
        activatorId = document.getElementById(props.targetId);
        if (activatorId) {
          if (trigger.on) {
            activatorId.addEventListener(trigger.on, show);
          }
          if (trigger.off) {
            activatorId.addEventListener(trigger.off, hide);
          }
          if (trigger.toggle) {
            activatorId.addEventListener(trigger.toggle, toggle);
          }
        }
      }
    });

    let showPopover = () => {
      show();
      emit("update:modelValue", true);
    };

    let hidePopover = () => {
      hide();
      emit("update:modelValue", false);
    };

    let togglePopover = () => {
      isOpen.value ? hidePopover() : showPopover();
    }

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue) {
          show();
        } else {
          hide();
        }
      }
    );

    let clickOutside = function (ev) {
      if (!(popper.value === ev.target || popper.value.contains(ev.target))) {
        hide();
      }
    };

    const { offsetX, offsetY, placement } = toRefs(props);

    const { isOpen, activator, popper, show, hide, toggle } = usePopper({
      placement,
      offsetX,
      offsetY,
      clickOutside,
    });

    return {
      classes,
      trigger,
      activator,
      popper,
      isOpen,
      trigger,
      showPopover,
      hidePopover,
      togglePopover,
      slots,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
