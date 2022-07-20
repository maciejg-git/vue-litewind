<template>
  <div
    :class="[
      classes.formText.value,
      states.formText.value && states.formText.value.invalid,
    ]"
  >
    <slot name="default" :state="state">
      <transition-group name="fade-group">
        <div v-for="m in formText" :key="m">
          <slot name="prepend-message"></slot>
          <slot name="message" :message="m">
            {{ m }}
          </slot>
        </div>
      </transition-group>
    </slot>
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
    status: { type: Object, default: {} },
    inline: { type: Boolean, default: false },
    messages: { type: Object, default: {} },
    styleFormText: { type: [String, Array], default: "" },
    ...sharedStyleProps("form-text"),
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
        if (props.status.required === false) {
          return [props.messages.required];
        } else {
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
