<template>
  <div class="flex justify-end divide-x divide-dark-700">
    <a
      :href="`${github.components}${component}.vue`"
      class="link px-2"
    >
      Component source on Github
    </a>
    <a
      :href="`${github.documentation}Documentation${component.substring(
        1
      )}.vue`"
      class="link px-2"
    >
      This page on Github
    </a>
  </div>
</template>

<script setup>
import { github } from "../const.js";

let props = defineProps({
  component: {
    type: String,
    default: undefined,
  },
});
</script>
