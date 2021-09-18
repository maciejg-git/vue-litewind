<template>
  <component :is="icon" :class="classes"></component>
</template>

<script>
import { computed, inject } from "vue";
import { isObject, isString } from "../tools/tools";

export default {
  props: {
    icon: { type: String, default: "" },
    i: { type: String, default: "" },
    name: { type: String, default: "" },
    iconType: { type: String, default: "" },
  },
  setup(props) {
    let iconTypes = inject("iconTypes", {});

    let icon = computed(() => {
      if (props.icon) return props.icon + "-icon";
      if (props.i) return props.i + "-icon";
      if (props.name) return props.name + "-icon";

      let type = iconTypes[props.iconType];
      if (!type) return;

      let icon = null;

      if (isObject(type)) icon = type.icon ? type.icon : null;
      else if (isString(type)) icon = type;

      if (!icon) return

      return icon + "-icon";
    });

    let classes = computed(() => {
      return props.iconType ? "icon--" + props.iconType + "-type" : "";
    });

    return {
      icon,
      classes,
    };
  },
};
</script>
