<template>
  <div>
    <slot name="default" :class="classes.value.text"></slot>
  </div>
</template>

<script>
import useStyles from "./composition/use-styles";

export default {
  props: {
    modelValue: { type: [String, Number, Boolean, Array], default: undefined },
    type: { type: String, default: "text" },
    state: { type: String, default: "" },
    name: { type: String, default: "input" },
    styleFormText: { type: [String, Array], default: "default" },
  },
  setup(props) {
    let { classes } = useStyles(props, {
      formText: null,
    })

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
