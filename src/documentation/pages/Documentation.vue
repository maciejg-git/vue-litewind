<template>
  <v-navbar
    fixed
    class="flex w-full justify-between border-b px-4 py-2 dark:border-dark-700 dark:text-text-300"
  >
    <div class="flex items-center">
      <!-- mobile menu trigger -->

      <v-trigger
        for="sidepanel"
        v-slot="{ onTrigger }"
      >
        <v-button
          class="mr-2 block lg:hidden"
          base="plain-button"
          v-on="onTrigger"
        >
          <v-icon
            name="b-list"
            class="h-7 w-7"
          ></v-icon>
        </v-button>
      </v-trigger>
      <span class="text-lg font-bold">VueTailwind</span>
      <div class="ml-10 inline-block font-semibold">
        <a href="/documentation/installation">Docs</a>
      </div>
    </div>

    <div class="flex items-center">
      <!-- github -->

      <a
        href="https://github.com/maciejg-git/Vue-wind"
        class="mr-4 !p-0"
      >
        <v-icon
          name="b-github"
          class="v-icon--md text-dark-800 dark:text-dark-400"
        ></v-icon>
      </a>
      
      <!-- dark mode -->
      
      <v-button
        base="plain-button"
        class="mr-2"
        @click="setDarkMode"
      >
        <v-icon
          :name="darkMode ? 'b-sun' : 'b-moon'"
          class="v-icon--md text-dark-800 dark:text-dark-400"
        ></v-icon>
      </v-button>
    </div>
  </v-navbar>

  <!-- mobile menu -->

  <v-sidepanel
    id="sidepanel"
    sidebar-left
    width="auto"
  >
    <div class="h-full overflow-scroll pl-6 pr-10">
      <documentation-menu></documentation-menu>
    </div>
  </v-sidepanel>

  <div
    class="relative top-16 flex justify-center text-text-800 dark:bg-[#191919] dark:text-text-300/80 lg:px-0"
  >
    <!-- menu -->

    <div
      class="sidebar sticky top-16 hidden flex-none basis-1/5 overflow-auto border-r p-3 pb-20 pr-7 text-[0.9em] font-semibold dark:border-dark-700 lg:flex"
    >
      <div class="ml-auto text-text-600 dark:text-text-300/70">
        <documentation-menu></documentation-menu>
      </div>
    </div>

    <!-- documentation page -->

    <div
      class="mt-12 w-full max-w-[1024px] p-3 px-2 lg:mx-14 lg:max-w-screen-lg lg:px-12"
    >
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
      <div class="mb-4 ml-2 mt-4 text-black dark:text-white">Contents</div>
      <ul class="text-text-600 dark:text-text-300/70">
        <li
          v-for="item in headers"
          :class="{
            'ml-4': item.level === '6',
            'text-black dark:text-white': item.el === currentHeader,
          }"
        >
          <a
            :href="route.path + '#' + item.id"
            class="transition-all"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import DocumentationMenu from "../components/DocumentationMenu.vue";
// light style
import "../../styles/hljs/google-light.css";
// dark style
// import "../../styles/hljs/vs2015.css";
import "../../styles/hljs/oceanicnext.css";

let route = useRoute();

let darkMode = ref(true);
let documentation = ref(null);
let headers = ref([]);
let currentHeader = ref(null);

let getHeaders = () => {
  if (!documentation.value) return [];
  return [...documentation.value.querySelectorAll("h4,h5,h6")].map((i) => {
    return {
      text: i.innerText,
      level: i.tagName[1],
      id: i.id,
      el: i,
    };
  });
};

let isPartiallyInViewport = (element, offsetBottom) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom - offsetBottom > 0 &&
    rect.top <= document.documentElement.clientHeight
  );
};

let handleScroll = (ev) => {
  let headers = documentation.value.querySelectorAll("h4,h5,h6");
  let visibleHeaders = [];

  headers.forEach((i) => {
    if (isPartiallyInViewport(i.parentNode, 200)) {
      visibleHeaders.push(i);
    }
  });

  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    currentHeader.value = visibleHeaders[visibleHeaders.length - 1];
    return;
  }

  if (visibleHeaders[0] && currentHeader.value !== visibleHeaders[0]) {
    currentHeader.value = visibleHeaders[0];
  }
};

window.addEventListener("scroll", handleScroll);

watch(
  route,
  () => {
    nextTick((value) => {
      headers.value = getHeaders();
    });
  },
  { immediate: true }
);

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
