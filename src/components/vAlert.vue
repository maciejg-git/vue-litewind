<template>
  <transition name="fade">
    <div v-if="isStatic() || modelValue" :class="classes.alert.value">
      <div class="flex items-center">
        <div class="self-start">
          <v-icon v-if="icon" :name="icons[icon]" :class="classes.icon.value" />
        </div>
        <slot name="icon"></slot>
        <slot name="default"></slot>
        <v-close-button
          v-if="!isStatic() && dismissable"
          v-bind="closeButton"
          @click="handleCloseButtonClick"
          style-close-button="small"
          class="ml-auto"
        />
      </div>
    </div>
  </transition>
</template>

<script>
// vue
import { watch } from "vue";
// composition
import useStyles from "./composition/use-styles";
// components
import vCloseButton from "./vCloseButton.vue";
import BCheckLg from "./icons/check-lg";
import BExclamationCircle from "./icons/exclamation-circle";
import BInfoCircle from "./icons/info-circle";
// props
import { sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

export default {
  props: {
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
    styleAlert: {
      type: [String, Array],
      default: defaultProps("alert", "styleAlert", ""),
    },
    styleIcon: {
      type: [String, Array],
      default: defaultProps("alert", "styleIcon", ""),
    },
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

    return {
      classes,
      states,
      transition,
      icons,
      isStatic,
      handleCloseButtonClick,
    };
  },
};
</script>

<style>
@import "../styles/transitions.css";
</style>

