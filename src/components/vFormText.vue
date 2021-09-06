<template>
  <div :class="[
      classes.formText.value,
      states.formText[state] && states.formText[state].value,
    ]">
    <slot name="default"></slot>
  </div>
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    state: { type: String, default: "" },
    inline: { type: Boolean, default: false },
    name: { type: String, default: "form-text" },
    styleFormText: { type: [String, Array], default: "" },
  },
  setup(props) {
    let { classes, states } = useStyles("form-text", props, {
      formText: {
        name: "form-text",
        states: ["valid", "invalid", "disabled"],
      },
    })

    let state = computed(() =>
      props.state === true || props.state === "valid"
        ? "valid"
        : props.state === false || props.state === "invalid"
        ? "invalid"
        : props.state === null || props.state === ""
        ? ""
        : props.state
    );

    return {
      classes,
      states,
      state,
    };
  },
};
</script>

<style scoped></style>
