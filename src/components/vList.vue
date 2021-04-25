<template>
  <div :class="classes.list.value" :style="{ width: width }">
    <slot name="default" ref="slot"></slot>
  </div>
</template>

<script>
import { computed, provide, toRef, getCurrentInstance } from "vue";
import useStyles from "../use-styles";
import { removeTailwindClasses } from "../tools.js";

export default {
  props: {
    width: String,
    tag: { type: String, default: "div" },
    name: { type: String, default: "list" },
    list: { type: String, default: "default" },
    item: { type: [String, Array], default: "default" },
    itemActive: { type: [String, Array], default: "default" },
  },
  setup(props) {
    let elements = ["list", "item", "itemActive"];

    let fixedClass = {
      list: ["flex", "flex-col"],
    };

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      list: computed(() => {
        let c = [...fixedClass.list, ...styles.list.value];
        return removeTailwindClasses(c);
      }),
    };

    let classesItem = {
      item: computed(() => {
        let c = [...styles.item.value];
        return removeTailwindClasses(c);
      }),
      itemActive: computed(() => {
        let c = [...styles.itemActive.value];
        return removeTailwindClasses(c);
      }),
    };

    provide("classes", classesItem);
    provide("tag", toRef(props, "tag"));

    return {
      classes,
    };
  },
};
</script>

<style scoped></style>
