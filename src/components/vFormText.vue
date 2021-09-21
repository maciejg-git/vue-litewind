<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[
        classes.formText.value,
        states.formText[state] && states.formText[state].value,
      ]"
    >
      <slot name="default" :state="state">
        <slot name="prepend-message" :state="state"></slot>
        {{ message }}
      </slot>
    </div>
  </transition>
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    state: { type: [String, Boolean], default: "" },
    inline: { type: Boolean, default: false },
    visibleStates: { type: String, default: "default,valid,invalid" },
    messages: { type: Object, default: {} },
    name: { type: String, default: "form-text" },
    styleFormText: { type: [String, Array], default: "" },
  },
  setup(props) {
    let { classes, states } = useStyles("form-text", props, {
      formText: {
        name: "form-text",
        fixed: "fixed-form-text",
        states: ["valid", "invalid", "disabled"],
        prop: computed(() => (props.inline ? "inline-flex" : "flex")),
      },
    });

    let state = computed(() =>
      props.state === true
        ? "valid"
        : props.state === false
        ? "invalid"
        : props.state === null
        ? ""
        : props.state
    );

    let visible = computed(() => {
      return props.visibleStates
        .split(",")
        .includes(state.value === "" ? "default" : state.value);
    });

    let message = computed(() => {
      let s = props.state || "default"
      return props.messages[s] || ""
    })

    return {
      classes,
      states,
      state,
      visible,
      message,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-form-text {
  @apply items-center
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
