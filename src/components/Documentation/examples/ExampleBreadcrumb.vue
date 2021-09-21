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
        },
        {
          label: "Documentation",
          to: "/",
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
