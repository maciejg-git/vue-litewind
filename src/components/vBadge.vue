<template>
  <transition :name="updateAnimation" mode="out-in">
    <span :class="classes.badge.value" :key="updateKey + ''">
      <slot name="default"></slot>
    </span>
  </transition>
</template>

<script>
// vue
import { computed } from "vue";
// composition
import useStyles from "./composition/use-styles";
// props
import { sharedStyleProps } from "../shared-props";

export default {
  props: {
    position: {
      type: String,
      default: "",
    },
    updateKey: {
      type: [String, Number],
      default: undefined,
    },
    updateAnimation: {
      type: String,
      default: "",
    },
    styleBadge: {
      type: String,
      default: "",
    },
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
  @apply absolute top-0 right-0 -translate-y-1/2 translate-x-1/2;
}
.fixed-absolute-tl {
  @apply absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2;
}
.fixed-absolute-br {
  @apply absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2;
}
.fixed-absolute-bl {
  @apply absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2;
}

.scale-up-enter-active,
.scale-up-leave-active {
  transition: transform 0.20s ease;
}
.scale-up-enter-from,
.scale-up-leave-to {
  transform: scale(1.4);
}

.to-danger-enter-active,
.to-danger-leave-active {
  transition: background-color 0.40s ease;
}
.to-danger-enter-from,
.to-danger-leave-to {
  @apply bg-danger-500 dark:bg-danger-500
}

.to-success-enter-active,
.to-success-leave-active {
  transition: background-color 0.40s ease;
}
.to-success-enter-from,
.to-success-leave-to {
  @apply bg-success-500 dark:bg-success-500
}

.bounce-enter-active,
.bounce-leave-active {
  transition: transform 0.20s ease;
}
.bounce-enter-from,
.bounce-leave-to {
  transform: translateY(-35%);
}
</style>
