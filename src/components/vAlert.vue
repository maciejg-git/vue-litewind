<template>
  <transition name="fade">
    <div
      v-if="isStatic() || modelValue"
      :class="classes.alert.value"
      role="alert"
    >
      <div class="flex items-center">
        <div
          v-if="icon"
          class="self-start"
        >
          <v-icon
            :name="icons[icon]"
            :class="classes.icon.value"
          />
        </div>
        <!-- @slot icon -->
        <slot name="icon"></slot>
        <!-- @slot default -->
        <slot name="default"></slot>
        <v-close-button
          v-if="!isStatic() && dismissable"
          @click="handleCloseButtonClick"
          style-close-button="small"
          class="ml-auto"
          v-bind="closeButton"
        />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch } from "vue";
import useStyles from "./composition/use-styles";
import vCloseButton from "./vCloseButton.vue";
import vIcon from "./vIcon.vue";
import BCheckLg from "./icons/check-lg";
import BExclamationCircle from "./icons/exclamation-circle";
import BInfoCircle from "./icons/info-circle";
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("alert", ["Alert", "Icon"]),
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  dismissable: {
    type: Boolean,
    default: true,
  },
  autoDismissDelay: {
    type: Number,
    default: defaultProps("alert", "autoDismissDelay", 0),
  },
  icon: {
    type: String,
    default: "",
  },
  closeButton: {
    type: Object,
    default: defaultProps("alert", "closeButton", {}),
  },
});

const emit = defineEmits(["update:modelValue"]);

let { classes, states } = useStyles("alert", props, {
  alert: null,
  icon: null,
});

let closeAlert = () => emit("update:modelValue", false);

// set auto dismiss timer if alert is visible
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

let isStatic = () => {
  return props.modelValue === undefined;
};

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
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--alert-transition-duration) ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
