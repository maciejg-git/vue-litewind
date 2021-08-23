<template>
  <span :class="classes.badge.value">
    <slot name="default"></slot>
  </span>
</template>

<script>
import { computed, inject } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    position: { type: String, default: "" },
    name: { type: String, default: "badge" },
    theme: { type: String, default: "default" },
    styleBadge: { type: String, default: "default" },
  },
  setup(props) {
    let s = inject("styles");

    let elements = ["badge"];

    let { styles } = useStyles(s, props, elements);

    let fixedAbsoluteTr = [
      "absolute",
      "transform",
      "top-0",
      "right-0",
      "-translate-y-1/2",
      "translate-x-1/2",
    ];

    let fixedAbsoluteTl = [
      "absolute",
      "transform",
      "top-0",
      "left-0",
      "-translate-y-1/2",
      "-translate-x-1/2",
    ];

    let fixedAbsoluteBr = [
      "absolute",
      "transform",
      "bottom-0",
      "right-0",
      "translate-y-1/2",
      "translate-x-1/2",
    ];

    let fixedAbsoluteBl = [
      "absolute",
      "transform",
      "bottom-0",
      "left-0",
      "translate-y-1/2",
      "-translate-x-1/2",
    ];

    let classes = {
      badge: computed(() => {
        let c = [
          "inline-flex",
          "items-center",
          ...(props.position == "top-right"
            ? fixedAbsoluteTr
            : props.position == "top-left"
            ? fixedAbsoluteTl
            : props.position == "bottom-right"
            ? fixedAbsoluteBr
            : props.position == "bottom-left"
            ? fixedAbsoluteBl
            : ""),
          ...styles.badge.value,
        ];
        return removeTailwindClasses(c);
      }),
    };

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
