<template>
  <component :is="icon" :class="classes"></component>
</template>

<script>
import { computed, inject } from "vue";
import { isObject, isString } from "../tools/tools";

export default {
  props: {
    icon: { type: [String, Object], default: "" },
    i: { type: [String, Object], default: "" },
    name: { type: [String, Object], default: "" },
    iconType: { type: [String, Object], default: "" },
  },
  setup(props) {
    let iconTypes = inject("iconTypes", {});

    let icon = computed(() => {
      if (props.icon) return props.icon;
      if (props.i) return props.i;
      if (props.name) return props.name;

      let type = iconTypes[props.iconType];
      if (!type) return;

      let icon = null;

      if (isObject(type)) icon = type.icon ? type.icon : null;
      else if (isString(type)) icon = type;

      if (!icon) return

      return icon;
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
