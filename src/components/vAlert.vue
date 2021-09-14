<template>
  <transition name="fade">
    <div v-if="modelValue" :class="classes.alert.value">
      <div class="flex">
        <slot name="icon">
          <v-icon v-if="icon" icon-type="state"></v-icon>
        </slot>
        <slot name="default"></slot>
        <v-close-button
          v-if="dismissable"
          @click="handleCloseButtonClick"
          class="ml-auto"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { watch } from "vue";
import vCloseButton from "./vCloseButton.vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    modelValue: { type: Boolean, default: false },
    dismissable: { type: Boolean, default: true },
    autoDismissDelay: { type: Number, default: 0 },
    icon: { type: Boolean, default: false },
    name: { type: String, default: "alert" },
    styleAlert: { type: [String, Array], default: "" },
  },
  components: {
    vCloseButton,
  },
  setup(props, { emit }) {
    let { classes } = useStyles("alert", props, {
      alert: null,
    });

    let closeAlert = () => {
      emit("update:modelValue", false);
    };

    // set auto dismiss timer if alarm is visible
    watch(
      () => props.modelValue,
      (visible) => {
        if (visible && props.autoDismissDelay) {
          setTimeout(() => {
            closeAlert();
          }, props.autoDismissDelay);
        }
      }
    );

    let handleCloseButtonClick = () => {
      closeAlert();
    };

    return {
      classes,
      handleCloseButtonClick,
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
