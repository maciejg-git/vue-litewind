<template>
  <v-breadcrumb :path="example.path" />
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
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

    return {
      example,
    };
  },
};
</script>
