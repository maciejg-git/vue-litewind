<template>
  <component
    :is="iconTypes[iconType] || name || icon || null"
    :class="{ 'v-icon': !noIconClass }"
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
    noIconClass: { type: Boolean, default: false },
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
