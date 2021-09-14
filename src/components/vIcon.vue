<template>
  <component :is="icon + '-icon'" :class="classes"></component>
</template>

<script>
import { computed, inject } from "vue";

export default {
  props: {
    icon: { type: String, default: "" },
    iconType: { type: String, default: "" },
    iconTypes: { type: Object, default: () => {} },
  },
  setup(props) {
    let iconTypes = inject("iconTypes", {});

    let icon = computed(() => {
      if (props.iconType) {
        return iconTypes[props.iconType];
      } else {
        return props.icon;
      }
    });

    let classes = computed(() => {
      return props.state ? "b-icon--" + props.iconType + "-type" : "";
    });

    return {
      icon,
      classes,
    };
  },
};
</script>
