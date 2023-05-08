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

  <div
    class="relative top-16 flex justify-center text-text-800 dark:bg-[#191919] dark:text-text-300/80 lg:px-0"
  >
    <!-- menu -->

    <div
      class="sidebar sticky top-16 hidden flex-none basis-1/5 overflow-auto border-r p-3 pb-20 pr-7 text-[0.9em] font-semibold dark:border-dark-700 lg:flex"
    >
      <div class="ml-auto text-text-600 dark:text-text-300/70">
        <documentation-menu />
      </div>
    </div>

    <!-- documentation page -->

    <div
      class="mt-12 w-full max-w-[1024px] p-3 px-2 lg:mx-14 lg:max-w-screen-lg lg:px-12"
    >
    <div class="text-sm opacity-50 -translate-y-10">
      Redirected from autocomplete
    </div>
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
    </div>

    <!-- page content sidepanel -->

    <div
      class="sidebar sticky top-16 hidden flex-none basis-1/5 -translate-x-10 overflow-auto py-3 pb-20 text-[0.9em] font-semibold xl:block"
    >
      <documentation-contents :content-element="documentation" />
    </div>
  </div>
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
