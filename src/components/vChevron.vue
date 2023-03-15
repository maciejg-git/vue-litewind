<template>
  <v-icon
    :name="icon"
    :class="getClass()"
  ></v-icon>
</template>

<script setup>
import { computed } from "vue";
import useStyles from "./composition/use-styles";
import vIcon from "./vIcon.vue";
import vChevronRightIcon from "./icons/chevron-right-solid.js";
import vChevronLeftIcon from "./icons/chevron-left-solid.js";
import vChevronUpIcon from "./icons/chevron-up-solid.js";
import vChevronDownIcon from "./icons/chevron-down-solid.js";
import vCaretRightFillIcon from "./icons/caret-right-fill.js";
import vCaretLeftFillIcon from "./icons/caret-left-fill.js";
import vCaretUpFillIcon from "./icons/caret-up-fill.js";
import vCaretDownFillIcon from "./icons/caret-down-fill.js";
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("chevron"),
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
  styleChevron: {
    type: String,
    default: defaultProps("chevron", "styleChevron", ""),
  },
});

let { classes } = useStyles("chevron", props, {
  chevron: null,
});

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
    ? chevron.triangle[initial.value]
    : chevron.chevron[initial.value];
});

let chevron = {
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
