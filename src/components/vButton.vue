<template>
  <component :is="tag" :href="tagHref" type="button" :class="classes.button.value">
    <slot name="default"></slot>
  </component>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "../use-styles";
import { removeTailwindClasses } from "../tools.js";

export default {
  props: {
    disabled: { type: Boolean, default: false },
    tag: { type: String, default: "button" },
    name: { type: String, default: "button" },
    button: { type: String, default: "default" },
  },
  setup(props) {
    let elements = ["button"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClass = {
      button: ["w-full", "inline-flex", "justify-center"],
    };

    let classes = {
      button: computed(() => {
        let c = [
          ...fixedClass.button,
          ...styles.button.value,
          props.disabled ? "opacity-50 pointer-events-none" : "",
        ].flatMap((i) => i.split(" "));
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
