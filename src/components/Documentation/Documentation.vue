<template>
  <v-navbar sticky style-navbar="gray" class="px-4 py-2">
    <span class="text-lg font-bold">VueTailwind</span>
    <div class="inline-block ml-5">
      <a href="/documentation/installation">Docs</a>
    </div>
  </v-navbar>

  <div class="flex">
    <div
      class="sidebar sticky lg:block flex-none overflow-auto text-gray-700 border-r pb-20 top-16 p-3 w-64"
    >

      <!-- general -->

      <h6>
        <router-link to="/documentation/components" class="transition-all">
          Get started
        </router-link>
      </h6>
      <ul class="list-unstyled ml-4">
        <li>
          <router-link
            to="/documentation/installation"
            active-class="active"
            class="transition-all"
          >
            Installation
          </router-link>
        </li>
      </ul>

      <!-- components -->

      <h6>
        <router-link to="/documentation/components" class="transition-all">
          Components
        </router-link>
      </h6>
      <ul class="list-unstyled ml-4">
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

      <!-- form components -->

      <h6>
        <router-link to="/documentation/form-components" class="transition-all">
          Form Components
        </router-link>
      </h6>
      <ul class="list-unstyled ml-4">
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
      <ul class="list-unstyled ml-4">
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

  <footer class="flex bg-gray-200 border-gray-300 py-4 shadow">
    <span class="ml-auto mr-4">
      <v-icon name="github" class="text-gray-500"></v-icon>
    </span>
  </footer>
</template>

<script>
import "highlight.js/styles/github.css";
import { components, formComponents } from "./Components";

export default {
  setup() {
    return {
      components,
      formComponents,
    };
  },
};
</script>

<style scoped>
h3 {
  @apply text-3xl font-semibold mt-4;
}
h4 {
  @apply text-2xl font-semibold mt-4;
}
h5 {
  @apply text-xl font-semibold mt-4;
}
h6 {
  @apply text-lg font-semibold mt-4;
}

a.active {
  @apply inline-block font-bold py-1 pr-4 pl-4;
}
a {
  @apply inline-block py-1 pr-4 pl-2;
}
a:hover {
  @apply font-bold;
}

.sidebar {
  height: calc(100vh - 4rem);
}
.sidebar::-webkit-scrollbar {
  width: 0.5em;
}
.sidebar::-webkit-scrollbar-track {
}
.sidebar::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}
</style>
