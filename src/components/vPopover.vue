<template>
  <div
    v-if="slots.activator"
    ref="triggerElementBySlot"
    class="inline-block"
    @[trigger.on]="show"
    @[trigger.off]="hide"
    @[trigger.toggle].stop="toggle($event)"
  >
    <slot name="activator"></slot>
  </div>
  <teleport to="body">
    <transition :name="transition">
      <div
        v-if="isShow"
        ref="popoverElement"
        v-bind="$attrs"
        :class="classes.popover.value"
        @mouseenter="lock"
        @mouseleave="unlock"
      >
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
  </teleport>
</template>

<script>
import { createPopper } from "@popperjs/core";
import {
  ref,
  reactive,
  computed,
  onMounted,
  watch,
  getCurrentInstance,
} from "vue";
import vCloseButton from "./vCloseButton.vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";
import { correctPlacement } from "../const.js"

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
    targetId: { type: String, default: undefined },
    name: { type: String, default: "popover" },
    stylePopover: { type: String, default: "default" },
    styleContent: { type: String, default: "default" },
  },
  components: {
    vCloseButton,
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

    let isShow = ref(false);
    let popoverElement = ref(null);
    let popoverArrow = ref(null);
    let trigger = reactive({
      on: null,
      off: null,
      toggle: null,
    });
    let triggerElementBySlot = ref(null);
    let triggerElementById = null;
    let triggerElement = null;
    let popper = null;
    let timerIn = null;
    let timerOut = null;

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

    let placement = computed(() => {
      return correctPlacement.find((i) => i === props.placement) || "auto";
    });

    let popperOptions = {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
        {
          name: "flip",
        },
      ],
      placement: placement.value,
    };

    onMounted(() => {
      if (props.targetId) {
        triggerElementById = document.getElementById(props.targetId);
        if (triggerElementById) {
          if (trigger.on) triggerElementById.addEventListener(trigger.on, show);
          if (trigger.off)
            triggerElementById.addEventListener(trigger.off, hide);
          if (trigger.toggle)
            triggerElementById.addEventListener(trigger.toggle, toggle);
        }
      }
      triggerElement = triggerElementBySlot.value || triggerElementById;
    });

    watch(
      popoverElement,
      () => {
        if (popoverElement.value) {
          if (props.trigger == "click" && props.clickOutsideClose)
            document.body.addEventListener("click", clickOutside);
          popper = setPopper();
        }
      },
      { flush: "post" }
    );

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue) {
          show();
        } else {
          hide(null, true);
        }
      }
    );

    function setPopper() {
      return createPopper(triggerElement, popoverElement.value, popperOptions);
    }

    let clickOutside = function (ev) {
      if (
        !(
          popoverElement.value === ev.target ||
          popoverElement.value.contains(ev.target)
        )
      ) {
        hide(null, true);
      }
    };

    function show() {
      if (isShow.value) clearTimeout(timerOut);

      timerIn = setTimeout(() => {
        isShow.value = true;
        emit("update:modelValue", true);
      }, props.delay);
    }

    function hide(ev, immediate) {
      clearTimeout(timerIn);

      if (props.trigger == "click" && props.clickOutsideClose)
        document.body.removeEventListener("click", clickOutside);

      timerOut = setTimeout(
        () => {
          isShow.value = false;
          emit("update:modelValue", false);
        },
        immediate ? 0 : props.delay
      );
    }

    function toggle(ev) {
      ev.preventDefault();
      isShow.value ? hide() : show();
    }

    let lock = function () {
      if (props.trigger != "hover") return;
      clearTimeout(timerOut);
    };

    let unlock = function () {
      if (props.trigger != "hover") return;
      hide();
    };

    return {
      classes,
      triggerElementBySlot,
      popoverElement,
      popoverArrow,
      isShow,
      trigger,
      show,
      hide,
      toggle,
      lock,
      unlock,
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
