<template>
  <transition :name="sidebarLeft ? 'fade-slide-left' : 'fade-slide-right'">
    <div
      v-show="isShow"
      :class="classes.sidepanel.value"
      :style="{ 'width': width }"
    >
      <div v-if="!noHeader" class="flex justify-between align-center w-full">
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
import { ref, computed, watch } from "vue";
import vCloseButton from "./vCloseButton.vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    modelValue: { type: Boolean, default: false },
    closeButton: { type: Boolean, default: true },
    sidebarLeft: { type: Boolean, default: false },
    width: { type: String, default: "320px" },
    noHeader: { type: Boolean, default: false },
    name: { type: String, default: "sidepanel" },
    styleSidepanel: { type: String, default: "" },
    styleCloseButton: { type: String, default: "" },
  },
  components: {
    vCloseButton,
  },
  setup(props, { emit }) {
    let { classes } = useStyles(props, {
      sidepanel: {
        fixed: "fixed-sidepanel",
        prop: computed(() => props.sidebarLeft ? "left-0" : "right-0")
      },
      closeButton: null,
    })

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
      isShow,
      close,
      handleClose,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-sidepanel {
  @apply fixed h-full top-0 z-20
}
.fade-slide-right-enter-active,
.fade-slide-right-leave-active {
  transition: opacity 0.3s ease, transform 0.4s ease;
}
.fade-slide-right-enter-from,
.fade-slide-right-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.fade-slide-left-enter-active,
.fade-slide-left-leave-active {
  transition: opacity 0.3s ease, transform 0.4s ease;
}
.fade-slide-left-enter-from,
.fade-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}
</style>
