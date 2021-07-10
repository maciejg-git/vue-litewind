<template>
  <div :class="classes.spinner.value" role="status"></div>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    name: { type: String, default: "spinner" },
    theme: { type: String, default: "default" },
    styleSpinner: { type: String, default: "default" },
  },
  setup(props) {
    let elements = ["spinner"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      spinner: computed(() => {
        let c = ["spinner-border", ...styles.spinner.value];
        return removeTailwindClasses(c);
      }),
    };

    return {
      classes,
    };
  },
};
</script>

<style scoped>
.spinner-border {
  display: inline-block;
  border: 0.15em solid;
  border-right-color: transparent;
  border-radius: 50%;
  animation: 0.75s linear infinite spinner-border;
}
@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>
