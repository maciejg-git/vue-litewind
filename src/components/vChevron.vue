<template>
  <v-icon
    :name="icon"
    :class="getClass()"
    v-bind="$attrs"
  ></v-icon>
</template>

<script>
// vue
import { computed } from "vue";
// composition
import useStyles from "./composition/use-styles";
// components
import vIcon from "./vIcon.vue";
import vChevronRightIcon from "./icons/chevron-right-solid.js";
import vChevronLeftIcon from "./icons/chevron-left-solid.js";
import vChevronUpIcon from "./icons/chevron-up-solid.js";
import vChevronDownIcon from "./icons/chevron-down-solid.js";
import vCaretRightFillIcon from "./icons/caret-right-fill.js";
import vCaretLeftFillIcon from "./icons/caret-left-fill.js";
import vCaretUpFillIcon from "./icons/caret-up-fill.js";
import vCaretDownFillIcon from "./icons/caret-down-fill.js";
// props
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

export default {
  props: {
    ...sharedProps(),
    initial: {
      type: String,
      default: "down",
    },
    rotate180: {
      type: Boolean,
      default: false,
    },
    triangle: {
      type: Boolean,
      default: defaultProps("chevron", "triangle", false),
    },
    counterClockwise: {
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
    ...sharedStyleProps("chevron"),
  },
  components: {
    vIcon,
  },
  setup(props) {
    let { classes } = useStyles("chevron", props, {
      chevron: null,
    });

    let getClass = () => {
      return [
        classes.chevron.value,
        [
          "transform",
          props.rotate180 ? "duration-200" : "duration-100",
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
        up: vChevronUpIcon,
        down: vChevronDownIcon,
      },
      triangle: {
        right: vCaretRightFillIcon,
        left: vCaretLeftFillIcon,
        up: vCaretUpFillIcon,
        down: vCaretDownFillIcon,
      },
    };

    let validInitial = ["down", "left", "right", "up"];

    let initial = computed(() => {
      return (
        (validInitial.some((i) => i === props.initial) && props.initial) ||
        "down"
      );
    });

    let getRotation = () => {
      if (props.switch) {
        return !props.counterClockwise
          ? props.rotate180
            ? "rotate-180"
            : "rotate-90"
          : props.rotate180
          ? "-rotate-180"
          : "-rotate-90";
      }
    };

    return {
      classes,
      getClass,
      icon,
      initial,
      chevron,
      getRotation,
      vChevronRightIcon,
      vChevronLeftIcon,
      vChevronUpIcon,
      vChevronDownIcon,
      vCaretRightFillIcon,
      vCaretLeftFillIcon,
      vCaretUpFillIcon,
      vCaretDownFillIcon,
    };
  },
};
</script>

<style scoped></style>
