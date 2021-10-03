<template>
  <v-navbar sticky class="px-4 py-3 mh-20">
    <span class="text-lg font-bold">VueTailwind</span>
    <div class="inline-block ml-5">
      <a href="/documentation/installation">Docs</a>
    </div>
  </v-navbar>
  <div class="flex">
    <div
      class="
        sidebar
        hidden
        lg:block
        flex-none
        sticky
        text-gray-700
        overflow-auto
        top-20
        p-3
        w-64
      "
    >
      <ul class="list-unstyled ml-2 mt-4">
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

      <h6>
        <router-link to="/documentation/form-components" class="transition-all">
          Form Components
        </router-link>
      </h6>
      <ul class="list-unstyled ml-2">
        <li v-for="(c, i) in formComponents" :key="i">
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
    <div class="container mx-auto p-3 w-full lg:max-w-screen-xl px-2 lg:px-24">
      <router-view></router-view>
    </div>
  </div>
  <footer class="flex bg-gray-200 border-gray-300 border-t py-4 shadow">
    <span class="ml-auto mr-4">
      <v-icon name="github" class="text-gray-500"></v-icon>
    </span>
  </footer>
</template>

<script>
// import "highlight.js/styles/atom-one-light.css";
// import "highlight.js/styles/foundation.css";
import "highlight.js/styles/github.css";
import { components, formComponents } from "./Components";
import { provide } from "vue"

export default {
  setup() {
provide("stateIcons", {
      info: "info-circle",
      warn: "exclamation-triangle",
    }
  )
    return {
      components,
      formComponents,
    };
  },
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
  margin-top: 1em;
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
