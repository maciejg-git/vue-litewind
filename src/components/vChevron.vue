<template>
  <template v-if="icon">
    <v-icon :icon="icon" :class="getClass()" v-bind="$attrs"></v-icon>
  </template>
  <template v-else>
    <template v-if="!triangle">
      <v-icon
        v-if="initial == 'right'"
        :name="vChevronRightIcon"
        :class="getClass()"
        v-bind="$attrs"
      ></v-icon>
      <v-icon
        v-else-if="initial == 'left'"
        :name="vChevronLeftIcon"
        :class="getClass()"
        v-bind="$attrs"
      ></v-icon>
      <v-icon
        v-else-if="initial == 'up'"
        :name="vChevronUpIcon"
        :class="getClass()"
        v-bind="$attrs"
      ></v-icon>
      <v-icon
        v-else-if="initial == 'down'"
        :name="vChevronDownIcon"
        :class="getClass()"
        v-bind="$attrs"
      ></v-icon>
    </template>
    <template v-else-if="triangle">
      <v-icon
        v-if="initial == 'right'"
        :name="vCaretRightFillIcon"
        :class="getClass()"
        v-bind="$attrs"
      ></v-icon>
      <v-icon
        v-else-if="initial == 'left'"
        :name="vCaretLeftFillIcon"
        :class="getClass()"
        v-bind="$attrs"
      ></v-icon>
      <v-icon
        v-else-if="initial == 'up'"
        :name="vCaretUpFillIcon"
        :class="getClass()"
        v-bind="$attrs"
      ></v-icon>
      <v-icon
        v-else-if="initial == 'down'"
        :name="vCaretDownFillIcon"
        :class="getClass()"
        v-bind="$attrs"
      ></v-icon>
    </template>
  </template>
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
import { sharedStyleProps } from "../shared-props";

export default {
  props: {
    initial: { type: String, default: "down" },
    rotate180: { type: Boolean, default: false },
    triangle: { type: Boolean, default: false },
    counterClockwise: { type: Boolean, default: false },
    switch: { type: Boolean, default: false },
    icon: { type: String, default: "" },
    styleChevron: { type: String, default: "" },
    ...sharedStyleProps("chevron"),
  },
  components: {
    vIcon,
    vChevronUpIcon,
    vChevronLeftIcon,
    vChevronUpIcon,
    vChevronDownIcon,
    vCaretRightFillIcon,
    vCaretLeftFillIcon,
    vCaretUpFillIcon,
    vCaretDownFillIcon,
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
          props.rotate180 ? "duration-300" : "duration-150",
          getRotation(),
        ],
      ];
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
      initial,
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
