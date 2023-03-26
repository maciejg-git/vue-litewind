<template>
  <v-breadcrumb :path="example.path" />
</template>

<script setup>
import { reactive } from "vue";

let example = reactive({
  path: [
    {
      label: "Home",
      to: "/",
      icon: "b-house-fill",
    },
    {
      label: "Documentation",
      to: "/documentation",
    },
    {
      label: "Breadcrumb",
    },
  ],
});
</script>
