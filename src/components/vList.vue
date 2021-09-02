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
    styleList: { type: String, default: "" },
    styleItem: { type: [String, Array], default: "" },
  },
  setup(props) {
    let { classes, states } = useStyles("list", props, {
      list: {
        fixed: "fixed-list"
      },
      item: {
        states: ["active"],
      },
    })

    provide("classes", classes);
    provide("states", states);
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
