<template>
  <div ref="popover" class="inline-block">
    <div
      v-if="slots.activator"
      ref="activator"
      class="inline-block"
      @[trigger.on]="show"
      @[trigger.off]="hide"
      @[trigger.toggle]="toggle"
    >
      <slot name="activator"></slot>
    </div>
    <transition :name="transition">
      <div v-if="isOpen" ref="popper" :class="classes.popover.value">
        <header
          v-if="!noHeader"
          class="flex bg-gray-100 border-b font-semibold px-3 py-2"
        >
          {{ title }}
          <v-close-button class="ml-auto" @click="hide" />
        </header>
        <div :class="classes.content.value">
          <slot name="default"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  ref,
  toRefs,
  reactive,
  computed,
  onMounted,
  watchEffect,
  inject,
} from "vue";
import useStyles from "./composition/use-styles";
import usePopper from "./composition/use-popper.js";
import { removeTailwindClasses } from "../tools/tools.js";
import { correctPlacement } from "../const.js";

export default {
  props: {
    placement: {
      type: String,
      default: "auto",
      validator: function (v) {
        return correctPlacement.includes(v);
      },
    },
    trigger: { type: String, default: "click" },
    delay: { type: Number, default: 50 },
    noHeader: { type: Boolean, default: false },
    title: { type: String, default: undefined },
    transition: { type: String, default: "fade" },
    clickOutsideClose: { type: Boolean, default: false },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 5 },
    noFlip: { type: Boolean, default: false },
    targetId: { type: String, default: undefined },
    name: { type: String, default: "popover" },
    theme: { type: String, default: "default" },
    stylePopover: { type: String, default: "default" },
    styleContent: { type: String, default: "default" },
  },
  setup(props, { slots, emit }) {
    let s = inject("styles")

    let elements = ["popover", "content"];

    let { styles } = useStyles(s, props, elements);

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

    let popover = ref(null);
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
          activator.value = activatorId;
        }
      }
    });

    let clickOutside = function (ev) {
      if (!props.clickOutsideClose) return;
      if (!(popover.value === ev.target || popover.value.contains(ev.target))) {
        hide();
      }
    };

    const { offsetX, offsetY, noFlip, placement } = toRefs(props);

    const { isOpen, activator, popper, show, hide, toggle } = usePopper({
      placement,
      offsetX,
      offsetY,
      noFlip,
      clickOutside,
      emit,
    });

    return {
      classes,
      trigger,
      popover,
      activator,
      popper,
      isOpen,
      show,
      hide,
      toggle,
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
