<template>
  <v-icon
    :name="icon"
    :class="getClass()"
  ></v-icon>
</template>

<script setup>
import { computed, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import vIcon from "./vIcon.vue";
import vChevronRightIcon from "./icons/chevron-right-solid.js";
import vChevronLeftIcon from "./icons/chevron-left-solid.js";
import vChevronUpIcon from "./icons/chevron-up-solid.js";
import vChevronDownIcon from "./icons/chevron-down-solid.js";
import vCaretRightFillIcon from "./icons/caret-right-fill.js";
import vCaretLeftFillIcon from "./icons/caret-left-fill.js";
import vCaretUpFillIcon from "./icons/caret-up-fill.js";
import vCaretDownFillIcon from "./icons/caret-down-fill.js";
import { sharedProps, sharedModProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("chevron", ["Chevron"]),
  initial: {
    type: String,
    default: "down",
  },
  rotate90: {
    type: Boolean,
    default: false,
  },
  triangle: {
    type: Boolean,
    default: defaultProps("chevron", "triangle", false),
  },
  clockwise: {
    type: Boolean,
    default: false,
  },
  switch: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
});

let { chevron } = inject("mods", {})

let elements = {
  chevron: null,
}

let { classes } = useTailwindStyles(props, chevron, elements)

let getClass = () => {
  return [
    classes.chevron.value,
    [
      "transform",
      props.rotate90 ? "duration-100" : "duration-200",
      getRotation(),
    ],
  ];
};

let icon = computed(() => {
  return props.icon
    ? props.icon
    : props.triangle
    ? style.triangle[initial.value]
    : style.chevron[initial.value];
});

let style = {
  chevron: {
    right: vChevronRightIcon,
    left: vChevronLeftIcon,
    top: vChevronUpIcon,
    bottom: vChevronDownIcon,
  },
  triangle: {
    right: vCaretRightFillIcon,
    left: vCaretLeftFillIcon,
    top: vCaretUpFillIcon,
    bottom: vCaretDownFillIcon,
  },
};

let validInitial = ["bottom", "left", "right", "top"];

let initial = computed(() => {
  return (
    (validInitial.some((i) => i === props.initial) && props.initial) || "bottom"
  );
});

let getRotation = () => {
  if (props.switch) {
    return props.clockwise
      ? props.rotate90
        ? "rotate-90"
        : "rotate-180"
      : props.rotate90
      ? "-rotate-90"
      : "-rotate-180";
  }
};
</script>

<style scoped></style>
