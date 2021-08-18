<template>
  <v-navbar sticky class="px-4 py-3">
    <span class="text-lg font-bold">VueTailwind</span>
    <div class="inline-block ml-5">
      <a href="">Docs</a>
    </div>
  </v-navbar>
  <div>
    <div class="flex">
      <div class="sidebar hidden md:block flex-none sticky text-gray-700 overflow-auto p-3 pr-20">
        <ul class="list-unstyled ml-2">
          <li>
            <router-link
              to="/documentation/installation"
              active-class="active"
              class="transition-all"
            >
              Installation
            </router-link>
          </li>
          <!-- <li> -->
          <!--   <router-link -->
          <!--     to="/documentation/styling" -->
          <!--     active-class="active" -->
          <!--     class="transition-all" -->
          <!--   > -->
          <!--     Styling -->
          <!--   </router-link> -->
          <!-- </li> -->
        </ul>

        <!-- components -->

        <h6>
          <router-link to="/documentation/components" class="transition-all">
            Components
          </router-link>
        </h6>
        <ul class="list-unstyled ml-2">
          <li v-for="(c, i) in components" :key="i">
            <router-link
              :to="'/documentation/' + c.name"
              active-class="active"
              class="transition-all"
            >
            {{ c.label }}
            </router-link>
          </li>
        </ul>

        <!-- directives -->

        <h6 class="mt-4">Directives</h6>
        <ul class="list-unstyled ml-2">
          <li>
            <router-link
              to="/documentation/tooltip"
              active-class="active"
              class="transition-all"
            >
              Tooltip
            </router-link>
          </li>
        </ul>
      </div>
      <div class="container mx-auto p-3 w-full lg:max-w-screen-xl px-2 md:px-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import "highlight.js/styles/default.css";
import { components } from "./Components"

export default {
  setup() {
    return {
      components
    }
  }
};
</script>

<style scoped>
h3 {
  @apply text-3xl;
  @apply font-semibold;
}
h4 {
  @apply text-2xl;
  @apply font-semibold;
}
h5 {
  @apply text-xl;
  @apply font-semibold;
}
h6 {
  @apply text-lg;
  @apply font-semibold;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 2em;
}
a.active {
  @apply inline-block font-semibold hover:bg-gray-100 py-1 pr-4 pl-4;
}
a {
  @apply inline-block hover:bg-gray-100 py-1 pr-4 pl-2;
}
.sidebar {
  height: calc(100vh - 5rem);
}
</style>
