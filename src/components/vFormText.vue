<template>
  <div
    :class="[
      classes.formText.value,
      states.formText.value && states.formText.value.invalid,
    ]"
  >
    <transition-group name="fade-group">
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-group-move,
.fade-group-enter-active,
.fade-group-leave-active {
  transition: opacity 0.2s ease;
}
.fade-group-enter-from,
.fade-group-leave-to {
  opacity: 0;
}
.fade-group-leave-active {
  display: absolute;
}
</style>
