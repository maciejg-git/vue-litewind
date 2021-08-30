<template>
  <nav>
    <ol>
      <li v-for="(i, index) in path" :key="index" class="inline-block">
        <!-- href -->
        <a v-if="i.href" :href="i.href" :class="classes.breadcrumb.value">
          {{ i.label }}
        </a>
        <!-- to -->
        <router-link v-if="i.to" :to="i.to" :class="classes.breadcrumb.value">
          {{ i.label }}
        </router-link>
        <!-- active -->
        <span v-if="index == path.length - 1">{{ i.label }}</span>
        <span v-if="index < path.length - 1" class="text-gray-500 mx-3">
          {{ separator }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
import useStyles from "./composition/use-styles";

export default {
  props: {
    path: { type: Array, default: [] },
    separator: { type: String, default: "/" },
    name: { type: String, default: "breadcrumb" },
    theme: { type: String, default: "default" },
    styleBreadcrumb: { type: [String, Array], default: "default" },
    styleSeparator: { type: [String, Array], default: "default" },
  },
  setup(props) {
    let { classes } = useStyles(props, {
      breadcrumb: null,
      separator: null,
    })

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
