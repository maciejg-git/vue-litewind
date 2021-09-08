<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="[classes.chevron.value, ['transform duration-150', getRotation()]]"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <template v-if="triangle">
      <path
        v-if="initial == 'd'"
        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
      />
      <path
        v-if="initial == 'l'"
        d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
      />
      <path
        v-if="initial == 'r'"
        d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
      />
      <path
        v-if="initial == 'u'"
        d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
      />
    </template>
    <template v-else>
      <path
        v-if="initial == 'd'"
        fill-rule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
      />
      <path
        v-if="initial == 'l'"
        fill-rule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
      <path
        v-if="initial == 'r'"
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
      <path
        v-if="initial == 'u'"
        fill-rule="evenodd"
        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
      />
    </template>
  </svg>
</template>

<script>
import useStyles from "./composition/use-styles";

export default {
  props: {
    initial: { type: String, default: "d" },
    rotate180: { type: Boolean, default: false },
    triangle: { type: Boolean, default: false },
    counterClockwise: { type: Boolean, default: false },
    switch: { type: Boolean, default: false },
    name: { type: String, default: "chevron" },
    styleChevron: { type: String, default: "" },
  },
  setup(props) {
    let { classes } = useStyles("chevron", props, {
      chevron: null,
    });

    let getRotation = () => {
      if (props.switch) {
        return !props.counterClockwise ?
          (props.rotate180 ? "rotate-180" : "rotate-90") :
          (props.rotate180 ? "-rotate-180" : "-rotate-90")
      }
    };

    return {
      classes,
      getRotation,
    };
  },
};
</script>

<style scoped></style>
