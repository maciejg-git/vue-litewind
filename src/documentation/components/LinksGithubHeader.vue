<template>
  <div class="flex justify-end divide-x divide-dark-700 mt-2 md:mt-0">
    <a
      :href="`${github.components}${component}.vue`"
      class="link pr-2"
    >
      Component source on Github
    </a>
    <a
      :href="`${github.documentation}/pages/Documentation${component.substring(
        1
      )}.vue`"
      class="link pl-2"
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
