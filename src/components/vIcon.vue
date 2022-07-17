<template>
  <component
    :is="iconTypes[iconType] || name || icon || null"
  ></component>
</template>

<script>
import { inject } from "vue";

export default {
  props: {
    name: { type: [String, Object], default: "" },
    icon: { type: [String, Object], default: "" },
    transition: { type: String, default: "" },
    iconType: { type: String, default: "" },
  },
  setup(props) {
    let iconTypes = inject("icon-types", {});

    return {
      iconTypes,
    };
  },
};
</script>

<style scoped lang="postcss"></style>
