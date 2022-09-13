<template>
  <nav>
    <ol class="flex items-center">
      <li
        v-for="(i, index) in path"
        :key="index"
        class="inline-flex items-center"
      >
        <v-icon v-if="i.icon" :name="i.icon" class="inline mr-1" />

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
// composition
import useStyles from "./composition/use-styles";
// props
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

export default {
  props: {
    ...sharedProps(),
    path: {
      type: Array,
      default: [],
    },
    separator: {
      type: String,
      default: defaultProps("breadcrumb", "separator", "/"),
    },
    styleBreadcrumb: {
      type: String,
      default: defaultProps("breadcrumb", "styleBreadcrumb", ""),
    },
    styleSeparator: {
      type: String,
      default: defaultProps("breadcrumb", "styleSeparator", ""),
    },
    styleActive: {
      type: String,
      default: defaultProps("breadcrumb", "styleActive", ""),
    },
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
    };

    return {
      classes,
      isActive,
    };
  },
};
</script>

<style scoped></style>
