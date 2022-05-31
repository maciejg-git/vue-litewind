<template>
  <nav>
    <ol class="flex items-center">
      <li v-for="(i, index) in path" :key="index" class="inline-flex items-center">
        <v-icon v-if="i.icon" :name="i.icon" class="inline mr-1"/>

        <!-- href -->
        <a v-if="i.href" :href="i.href" :class="classes.breadcrumb.value">
          {{ i.label }}
        </a>
        <!-- to -->
        <router-link v-if="i.to" :to="i.to" :class="classes.breadcrumb.value">
          {{ i.label }}
        </router-link>

        <span v-if="isActive(index)" :class="classes.active.value">
          {{ i.label }}
        </span>
        <span v-else :class="classes.separator.value">
          {{ separator }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
import useStyles from "./composition/use-styles";
import { sharedStyleProps } from "../shared-props"

export default {
  props: {
    path: { type: Array, default: [] },
    separator: { type: String, default: "/" },
    styleBreadcrumb: { type: [String, Array], default: "" },
    styleSeparator: { type: [String, Array], default: "" },
    styleActive: { type: [String, Array], default: "" },
    ...sharedStyleProps("breadcrumb"),
  },
  setup(props) {
    let { classes } = useStyles("breadcrumb", props, {
      breadcrumb: null,
      separator: null,
      active: null,
    });

    let isActive = (index) => {
      return index == props.path.length - 1;
    }

    return {
      classes,
      isActive,
    };
  },
};
</script>

<style scoped></style>
