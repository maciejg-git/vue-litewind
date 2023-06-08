<template>
  <documentation-navbar
    :dark-mode="darkMode"
    @update:dark-mode="setDarkMode"
  />

  <!-- mobile menu -->

  <v-sidepanel
    id="sidepanel"
    sidebar-left
    width="auto"
  >
    <div class="pl-6 pr-10">
      <documentation-menu />
    </div>
  </v-sidepanel>

  <!-- container -->

  <v-fluid-container
    class="relative mt-16 flex text-text-800 dark:bg-[#191919] dark:text-[#bcbfc5]"
  >
    <v-row class="flex-nowrap justify-center">
      <v-col class="hidden basis-2/12 lg:flex">
        <div
          class="sidebar sticky top-16 mb-20 ml-auto overflow-auto border-r px-10 pt-2 text-[0.9em] font-semibold text-text-600 dark:border-dark-700 dark:text-text-300/70"
        >
          <documentation-menu />
        </div>
      </v-col>

      <v-col class="mt-12 max-w-screen-lg grow px-4 py-3 lg:px-6 xl:px-20">
        <div ref="documentation">
          <router-view></router-view>
        </div>

        <footer
          class="mt-10 flex min-h-[100px] border-t border-gray-300 bg-white py-4 dark:border-dark-700 dark:bg-[#191919]"
        >
          <span class="ml-auto mr-4">
            <v-icon
              name="github"
              class="text-gray-500"
            ></v-icon>
          </span>
        </footer>
      </v-col>

      <v-col class="hidden basis-2/12 -translate-x-14 xl:block">
        <div
          class="sidebar sticky top-16 mb-20 overflow-auto pl-10 pt-2"
        >
          <documentation-contents :content-element="documentation" />
        </div>
      </v-col>
    </v-row>
  </v-fluid-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DocumentationNavbar from "../components/DocumentationNavbar.vue";
import DocumentationMenu from "../components/DocumentationMenu.vue";
import DocumentationContents from "../components/DocumentationContents.vue";
// light style
import "../../styles/hljs/google-light.css";
// dark style
// import "../../styles/hljs/vs2015.css";
import "../../styles/hljs/oceanicnext.css";

let darkMode = ref(true);
let documentation = ref(null);

let setDarkMode = () => {
  if (!darkMode.value) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
  darkMode.value = !darkMode.value;
};

onMounted(() => {
  if (darkMode.value) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
});
</script>

<style scoped>
h3 {
  @apply mt-4 text-3xl font-semibold;
}
h4 {
  @apply mt-4 text-2xl font-semibold;
}
h5 {
  @apply mt-4 text-xl font-semibold;
}
h6 {
  @apply mb-2 mt-6 text-lg font-semibold;
}

a.active {
  @apply inline-block py-1 pl-4 pr-4 text-black dark:text-white;
}
a {
  @apply inline-block py-1 pl-2 pr-4;
}
a:hover {
  @apply text-black dark:text-white;
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
