<template>
  <transition name="fade">
    <div v-if="modelValue" :class="[classes.alert.value]">
      <div class="flex items-center">
        <v-icon v-if="icon" :name="icons[icon]" :class="classes.icon.value" />
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
import BCheckLg from "./icons/check-lg";
import BExclamationCircle from "./icons/exclamation-circle";
import BInfoCircle from "./icons/info-circle";
import { sharedStyleProps } from "../sharedProps"

export default {
  props: {
    modelValue: { type: Boolean, default: false },
    dismissable: { type: Boolean, default: true },
    autoDismissDelay: { type: Number, default: 0 },
    icon: { type: String, default: "" },
    iconClass: { type: String, default: "" },
    styleAlert: { type: [String, Array], default: "" },
    styleIcon: { type: [String, Array], default: "" },
    ...sharedStyleProps("alert"),
  },
  components: {
    vCloseButton,
  },
  setup(props, { emit }) {
    let { classes, states } = useStyles("alert", props, {
      alert: null,
      icon: null,
    });

    let closeAlert = () => emit("update:modelValue", false);

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

    // default icons

    let icons = {
      success: BCheckLg,
      warn: BExclamationCircle,
      danger: BExclamationCircle,
      info: BInfoCircle,
      valid: BCheckLg,
      invalid: BExclamationCircle,
    };

    // handle template events

    let handleCloseButtonClick = () => closeAlert();

    return {
      classes,
      states,
      handleCloseButtonClick,
      icons,
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
