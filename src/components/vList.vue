<template>
  <div :class="classes.list.value" :style="{ width: width }">
    <slot name="default" ref="slot"></slot>
  </div>
</template>

<script>
import { provide, toRef } from "vue";
import useStyles from "./composition/use-styles";
import { sharedStyleProps } from "../shared-props"

export default {
  props: {
    width: { type: String, default: undefined },
    tag: { type: String, default: "div" },
    styleList: { type: String, default: "" },
    styleItem: { type: [String, Array], default: "" },
    ...sharedStyleProps("list"),
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
