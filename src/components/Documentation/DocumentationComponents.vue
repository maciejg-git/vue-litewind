<template>
  <h3>Components</h3>

  <ul class="mt-5">
    <li v-for="c in components">
      <router-link :to="'/documentation/' + c" class="transition-all">
        {{ c.charAt(0).toUpperCase() + c.slice(1) }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { components } from "../Components";

export default {
  setup(props) {
    return {
      components,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
a.active {
  @apply inline-block font-semibold hover:bg-gray-100 py-1 pr-4 pl-4;
}
a {
  @apply inline-block hover:bg-gray-100 py-1 pr-4 pl-2;
}
</style>
