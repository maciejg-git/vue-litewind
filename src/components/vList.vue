<template>
  <div :class="classes.list.value" :style="{ width: width }">
    <slot name="default" ref="slot"></slot>
  </div>
</template>

<script>
import { provide, toRef } from "vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    width: { type: String, default: undefined },
    tag: { type: String, default: "div" },
    name: { type: String, default: "list" },
    theme: { type: String, default: "default" },
    styleList: { type: String, default: "default" },
    styleItem: { type: [String, Array], default: "default" },
    styleItemActive: { type: [String, Array], default: "default" },
  },
  setup(props) {
    let { classes } = useStyles(props, {
      list: {
        fixed: "fixed-list"
      },
      item: null,
      itemActive: null,
    })

    provide("classes", classes);
    provide("tag", toRef(props, "tag"));

    return {
      classes,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-list {
  @apply flex flex-col
}
</style>
