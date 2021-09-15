<template>
  <component :is="icon" :class="classes"></component>
</template>

<script>
import { computed, inject } from "vue";

export default {
  props: {
    icon: { type: String, default: "" },
    iconType: { type: String, default: "" },
  },
  setup(props) {
    let iconTypes = inject("iconTypes", {});

    let icon = computed(() => {
      if (props.icon) return props.icon + "-icon";
      let type = iconTypes[props.iconType];
      if (!type) return;
      let i = null;
      if (typeof type === "object") {
        if (type.icon) i = type.icon
        else return
      }
      else {
        if (typeof type === "string") i = type
        else return
      }
      return i + "-icon";
    });

    let classes = computed(() => {
      return props.iconType ? "b-icon--" + props.iconType + "-type" : "";
    });

    return {
      icon,
      classes,
    };
  },
};
</script>
