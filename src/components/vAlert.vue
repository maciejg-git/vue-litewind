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
import { ref, computed, watch, getCurrentInstance } from "vue";
import vCloseButton from "./vCloseButton.vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: Boolean, default: false },
    dismissable: { type: Boolean, default: true },
    autoDismissDelay: { type: Number, default: 0 },
    name: { type: String, default: "alert" },
    theme: { type: String, default: "default" },
    styleAlert: { type: [String, Array], default: "default" },
  },
  components: {
    vCloseButton,
  },
  setup(props, { emit }) {
    let elements = ["alert"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClass = {
      alert: ["relative"],
    };

    let classes = {
      alert: computed(() => {
        let c = [...fixedClass.alert, ...styles.alert.value];
        return removeTailwindClasses(c);
      }),
    };

    let closeAlert = () => {
      emit("update:modelValue", false);
    };

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
