<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      :class="[
        classes.alert.value,
        states.alert[state] && states.alert[state].value,
      ]"
    >
      <div class="flex items-center">
        <slot name="icon"></slot>
        <slot name="default"></slot>
        <v-close-button
          v-if="dismissable"
          @click="handleCloseButtonClick"
          style-close-button="small"
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
    state: { type: String, default: "info" },
    name: { type: String, default: "alert" },
    styleAlert: { type: [String, Array], default: "" },
  },
  components: {
    vCloseButton,
  },
  setup(props, { emit }) {
    let { classes, states } = useStyles("alert", props, {
      alert: {
        states: [
          "valid",
          "invalid",
          "default",
          "info",
          "danger",
          "warn",
          "success",
          "light",
        ],
      },
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
      states,
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
