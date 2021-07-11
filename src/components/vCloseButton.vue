<template>
  <button class="focus:outline-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="classes"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    name: { type: String, default: "closebutton" },
    styleCloseButton: { type: String, default: "default" },
  },
  setup(props) {
    let elements = ["closeButton"]

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = computed(() => {
      let c = [...styles.closeButton.value];
      return removeTailwindClasses(c);
    });

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
