<template>
  <component :is="icon + '-icon'"></component>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: "" },
  },
};
</script>
