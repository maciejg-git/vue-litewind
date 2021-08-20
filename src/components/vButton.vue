<template>
  <component
    :is="tag"
    :href="tagHref"
    type="button"
    :class="classes.button.value"
  >
    <slot name="default"></slot>
  </component>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    disabled: { type: Boolean, default: false },
    tag: { type: String, default: "button" },
    block: { type: Boolean, default: false },
    name: { type: String, default: "button" },
    theme: { type: String, default: "default" },
    styleButton: { type: String, default: "default" },
  },
  setup(props) {
    let elements = ["button"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClass = {
      button: ["w-auto", "inline-flex", "justify-center", "items-center"],
    };

    let classes = {
      button: computed(() => {
        let c = [
          ...fixedClass.button,
          ...styles.button.value,
          ...(props.disabled ? ["opacity-50", "pointer-events-none"] : ""),
          props.block ? "w-full" : "",
        ];
        return removeTailwindClasses(c);
      }),
    };

    let tagHref = computed(() => (props.tag == "a" ? "#" : null));

    return {
      classes,
      tagHref,
    };
  },
};
</script>

<style scoped></style>
