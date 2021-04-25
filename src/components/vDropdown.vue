<template>
  <div class="inline-block">
    <div ref="activator" class="inline-block" @click.stop="toggle">
      <slot name="activator" :toggle="toggle" :show="show" :hide="hide"></slot>
    </div>
    <transition :name="transition">
      <div v-show="isShow" ref="dropdown" v-bind="$attrs" class="absolute">
        <slot name="default" :hide="hide"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
import {
  ref,
  computed,
  onMounted,
  watch,
  provide,
  toRef,
  getCurrentInstance,
} from "vue";
import useStyles from "../use-styles";
import { removeTailwindClasses } from "../tools.js";

export default {
  inheritAttrs: false,
  props: {
    placement: { type: String, default: "bottom-start" },
    offsetX: { type: Number, default: 0 },
    offsetY: { type: Number, default: 0 },
    noFlip: { type: Boolean, default: false },
    autoCloseMenu: { type: Boolean, default: false },
    transition: { type: String, default: "fade" },
    name: { type: String, default: "dropdown" },
    menuItem: { type: String, default: "default" },
    menuItemActive: { type: String, default: "default" },
    menuItemDisabled: { type: String, default: "default" },
    menuItemHeader: { type: String, default: "default" },
  },
  emits: ["state:opened", "state:closed"],
  setup(props, { emit }) {
    let elements = [
      "menuItem",
      "menuItemActive",
      "menuItemDisabled",
      "menuItemHeader",
    ];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClass = {
      item: ["block", "px-4", "py-2"],
    };

    let classesItem = {
      item: computed(() => {
        let c = [...fixedClass.item, ...styles.menuItem.value];
        return removeTailwindClasses(c);
      }),
      itemActive: computed(() => {
        let c = [...fixedClass.item, ...styles.menuItemActive.value];
        return removeTailwindClasses(c);
      }),
      itemDisabled: computed(() => {
        let c = [...fixedClass.item, ...styles.menuItemDisabled.value];
        return removeTailwindClasses(c);
      }),
      itemHeader: computed(() => {
        let c = [...fixedClass.item, ...styles.menuItemHeader.value];
        return removeTailwindClasses(c);
      }),
    };

    let isShow = ref(false);
    let activator = ref(null);
    let dropdown = ref(null);
    let popper = null;

    onMounted(() => {
      popper = setPopper();
    });

    watch(
      () => [props.placement, props.offsetX, props.offsetY, props.noFlip],
      () => {
        popper = setPopper();
        popper.update();
      }
    );

    function setPopper() {
      return createPopper(activator.value, dropdown.value, {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [props.offsetX, props.offsetY],
            },
          },
          {
            name: "flip",
            enabled: !props.noFlip,
          },
        ],
        placement: props.placement,
      });
    }

    let clickOutside = function (ev) {
      if (
        !(dropdown.value === ev.target || dropdown.value.contains(ev.target))
      ) {
        hide();
      }
    };

    let show = function () {
      isShow.value = true;
      document.body.addEventListener("click", clickOutside);
      popper.update();
      emit("state:opened");
    };

    let hide = function () {
      isShow.value = false;
      document.body.removeEventListener("click", clickOutside);
      emit("state:closed");
    };

    let toggle = function () {
      isShow.value ? hide() : show();
    };

    provide("classes", classesItem);
    provide("autoCloseMenu", toRef(props, "autoCloseMenu"));
    provide("hide", hide);

    return {
      activator,
      dropdown,
      show,
      hide,
      toggle,
      isShow,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
