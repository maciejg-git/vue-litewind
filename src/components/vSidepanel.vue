<template>
  <transition :name="left ? 'fade-side-panel-left' : 'fade-side-panel'">
    <div
      v-show="isShow"
      :class="classes.sidepanel.value"
      :style="{ 'min-width': width }"
    >
      <div v-if="closeButton" class="flex justify-between align-center w-full">
        <div class="my-3 ml-3">
          <slot name="header"></slot>
        </div>
        <v-close-button
          type="button"
          aria-label="Close"
          class="m-4"
          :color-light="closeButtonLight"
          @click="handleClose"
        >
        </v-close-button>
      </div>
      <slot name="default" :close="close"></slot>
    </div>
  </transition>
</template>

<script>
import { ref, computed, watch, getCurrentInstance } from "vue";
import vCloseButton from "./vCloseButton.vue";
import useStyles from "../use-styles";
import { removeTailwindClasses } from "../tools.js";

export default {
  props: {
    modelValue: Boolean,
    closeButton: Boolean,
    closeButtonLight: Boolean,
    left: Boolean,
    width: { type: String, default: "320px" },
    name: { type: String, default: "sidepanel" },
    sidepanel: { type: String, default: "default" },
  },
  components: {
    vCloseButton,
  },
  setup(props, { emit }) {
    let elements = ["sidepanel"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClass = {
      panel: ["fixed", "h-full", "top-0"],
    };

    let classes = {
      sidepanel: computed(() => {
        let c = [
          ...fixedClass.panel,
          ...styles.sidepanel.value,
          props.left ? "left-0" : "right-0",
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

    let handleClose = function() {
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
  /* -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); */
  /* -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); */
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
}
.fade-side-panel-enter-active,
.fade-side-panel-leave-active {
  transition: all 0.3s ease;
}
.fade-side-panel-enter-from,
.fade-side-panel-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.fade-side-panel-left-enter-active,
.fade-side-panel-left-leave-active {
  transition: all 0.3s ease;
}
.fade-side-panel-left-enter-from,
.fade-side-panel-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
