<template>
  <transition name="fade">
    <div v-if="modelValue" :class="classes.alert.value">
      <div class="flex justify-between">
        <slot name="default"></slot>
        <v-close-button v-if="dismissable" @click="handleCloseButtonClick" />
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
    name: { type: String, default: "alert" },
    styleAlert: { type: [String, Array], default: "" },
  },
  components: {
    vCloseButton,
  },
  setup(props, { emit }) {
    // TODO: absolute alerts

    let { classes } = useStyles("alert", props, {
      alert: null,
    })

    let closeAlert = () => {
      emit("update:modelValue", false);
    };

    // set auto dismiss timer if alarm is visible
    watch(
      () => props.modelValue,
      (v) => {
        if (v && props.autoDismissDelay) {
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
