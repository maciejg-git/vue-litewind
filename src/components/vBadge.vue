<template>
  <span :class="classes.badge.value">
    <slot name="default"></slot>
  </span>
</template>

<script>
import { computed, onUpdated } from "vue";
import useStyles from "./composition/use-styles";
import { sharedStyleProps } from "../shared-props"

export default {
  props: {
    position: { type: String, default: "" },
    styleBadge: { type: String, default: "" },
    ...sharedStyleProps("badge"),
  },
  setup(props) {
    let { classes } = useStyles("badge", props, {
      badge: {
        fixed: "fixed-badge",
        prop: computed(() => {
          return props.position == "top-right"
            ? "fixed-absolute-tr"
            : props.position == "top-left"
            ? "fixed-absolute-tl"
            : props.position == "bottom-right"
            ? "fixed-absolute-br"
            : props.position == "bottom-left"
            ? "fixed-absolute-bl"
            : "";
        }),
      },
    });

    return {
      classes,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-badge {
  @apply inline-flex items-center align-top;
}
.fixed-absolute-tr {
  @apply absolute transform top-0 right-0 -translate-y-1/2 translate-x-1/2;
}
.fixed-absolute-tl {
  @apply absolute transform top-0 left-0 -translate-y-1/2 -translate-x-1/2;
}
.fixed-absolute-br {
  @apply absolute transform bottom-0 right-0 translate-y-1/2 translate-x-1/2;
}
.fixed-absolute-bl {
  @apply absolute transform bottom-0 left-0 translate-y-1/2 -translate-x-1/2;
}
</style>
