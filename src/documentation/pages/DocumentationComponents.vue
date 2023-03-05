<template>
  <h3>Components</h3>

  <ul class="mt-5">
    <li v-for="c in components">
      <router-link :to="'/documentation/' + c.name" class="transition-all">
        {{ c.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { components } from "../Components.js";

export default {
  setup(props) {
    return {
      components,
    };
  },
};
</script>

<style scoped>
@import "../Documentation.css";
a.active {
  @apply inline-block font-semibold hover:bg-gray-100 py-1 pr-4 pl-4;
}
a {
  @apply inline-block hover:bg-gray-100 py-1 pr-4 pl-2;
}
</style>
