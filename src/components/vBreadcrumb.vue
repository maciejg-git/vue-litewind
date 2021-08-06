<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(i, index) in path" class="inline-block">
        <router-link href="#" to="i">{{ i.label }}</router-link>
        <span v-if="index < path.length - 1" class="text-gray-500 mx-3">
          {{ separator }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
import { computed, getCurrentInstance } from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    path: { type: Array, default: [] },
    separator: { type: String, default: "/" },
    name: { type: String, default: "input" },
    theme: { type: String, default: "default" },
    styleBreadcrumb: { type: [String, Array], default: "default" },
  },
  setup(props) {
    let elements = ["breadcrumb", "separator"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      breadcrumb: computed(() => {
        let c = [...styles.breadcrumb.value];
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
