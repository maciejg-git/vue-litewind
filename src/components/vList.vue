<template>
  <div :class="classes.list.value" :style="{ width: width }">
    <slot name="default"></slot>
  </div>
</template>

<script>
// vue
import { provide, toRef } from "vue";
// composition
import useStyles from "./composition/use-styles";
// props
import { sharedStyleProps } from "../shared-props"

export default {
  props: {
    width: { type: String, default: undefined },
    tag: { type: String, default: "div" },
    styleList: { type: String, default: "" },
    styleItem: { type: [String, Array], default: "" },
    ...sharedStyleProps(),
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

<style scoped>
.fixed-list {
  @apply flex flex-col
}
</style>
