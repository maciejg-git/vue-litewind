<template>
  <div
    :class="[
      classes.formText.value,
      states.formText.value && states.formText.value.invalid,
    ]"
  >
    <transition-group :name="transition">
      <div v-for="(message, key) in formText" :key="message">
        <slot name="message" v-bind="{ message, key }">
          {{ message }}
        </slot>
      </div>
    </transition-group>
  </div>
</template>

<script>
// vue
import { computed } from "vue";
// composition
import useStyles from "./composition/use-styles";
// props
import { sharedStyleProps } from "../shared-props";

export default {
  props: {
    state: { type: [String, Boolean], default: "" },
    inline: { type: Boolean, default: false },
    messages: { type: Object, default: {} },
    singleLineMessage: { type: Boolean, default: false },
    transition: { type: String, default: "fade-scale" },
    styleFormText: { type: [String, Array], default: "" },
    ...sharedStyleProps(),
  },
  setup(props) {
    let { classes, states } = useStyles("form-text", props, {
      formText: {
        name: "form-text",
        fixed: "fixed-form-text",
        states: ["valid", "invalid", "disabled"],
        prop: computed(() =>
          props.inline ? "inline-flex flex-col" : "flex flex-col"
        ),
      },
    });

    let formText = computed(() => {
      if (props.state === "invalid") {
        if (props.messages.required) {
          return { required: props.messages.required };
        } else {
          if (props.singleLineMessage) {
            let [k, v] = Object.entries(props.messages)[0];
            return { k: v };
          }
          return props.messages;
        }
      }
    });

    return {
      classes,
      states,
      formText,
    };
  },
};
</script>

<style scoped lang="postcss">
.fade-scale-move,
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scaleY(0.2);
}
.fade-scale-leave-active {
  display: none;
}

.fade-slide-down-move,
.fade-slide-down-enter-active,
.fade-slide-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top;
}
.fade-slide-down-enter-from,
.fade-slide-down-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-down-leave-active {
  display: none;
}
</style>
