<template>
  <component :is="icon + '-icon'" :class="classes"></component>
</template>

<script>
import { computed, inject } from "vue";

export default {
  props: {
    icon: { type: String, default: "" },
    state: { type: String, default: "" },
    stateIcons: { type: Object, default: () => {} },
  },
  setup(props) {
    let stateIcons = inject("stateIcons");

    let icon = computed(() => {
      if (props.state) {
        return stateIcons[props.state];
      } else {
        return props.icon;
      }
    });

    let classes = computed(() => {
      return props.state ? "b-icon--" + props.state + "-state" : "";
    });

    return {
      icon,
      classes,
    };
  },
};
</script>
