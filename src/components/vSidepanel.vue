<template>
  <transition :name="sidebarLeft ? 'fade-slide-left' : 'fade-slide-right'">
    <div
      v-show="isShow"
      :class="classes.sidepanel.value"
      :style="{ 'width': width }"
    >
      <div class="flex justify-between align-center w-full">
        <div class="my-3 ml-5">
          <slot name="header"></slot>
        </div>
        <v-close-button
          v-if="closeButton"
          type="button"
          aria-label="Close"
          :style-close-button="styleCloseButton"
          class="m-4"
          @click="handleClose"
        />
      </div>
      <slot name="default" :close="close"></slot>
    </div>
  </transition>
</template>

<script>
import { ref, computed, watch, getCurrentInstance } from "vue";
import vCloseButton from "./vCloseButton.vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: Boolean, default: false },
    closeButton: { type: Boolean, default: true },
    sidebarLeft: { type: Boolean, default: false },
    width: { type: String, default: "320px" },
    name: { type: String, default: "sidepanel" },
    theme: { type: String, default: "default" },
    styleSidepanel: { type: String, default: "default" },
    styleCloseButton: { type: String, default: "default" },
  },
  components: {
    vCloseButton,
  },
  setup(props, { emit }) {
    let elements = ["sidepanel", "closeButton"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClass = {
      panel: ["fixed", "h-full", "top-0"],
    };

    let classes = {
      sidepanel: computed(() => {
        let c = [
          ...fixedClass.panel,
          ...styles.sidepanel.value,
          props.sidebarLeft ? "left-0" : "right-0",
        ];
        return removeTailwindClasses(c);
      }),
    };

    let isShow = ref(false);

    watch(
      () => props.modelValue,
      () => {
        if (props.modelValue) open();
        else close();
      }
    );

    function open() {
      isShow.value = true;
    }

    function close() {
      isShow.value = false;
      emit("update:modelValue", false);
    }

    let handleClose = function () {
      close();
    };

    return {
      classes,
      styles,
      isShow,
      close,
      handleClose,
    };
  },
};
</script>

<style scoped>
.v-shadow-panel {
  -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.4);
}
.fade-slide-right-enter-active,
.fade-slide-right-leave-active {
  transition: opacity 0.2s ease, transform 0.3s ease;
}
.fade-slide-right-enter-from,
.fade-slide-right-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.fade-slide-left-enter-active,
.fade-slide-left-leave-active {
  transition: opacity 0.2s ease, transform 0.3s ease;
}
.fade-slide-left-enter-from,
.fade-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}
</style>
