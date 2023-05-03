<template>
  <v-navbar
    fixed
    class="flex justify-between w-full border-b px-4 py-2 dark:border-dark-700 dark:text-text-300"
  >
    <div class="flex items-center">
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
      <div class="ml-5 inline-block">
        <a href="/documentation/installation">Docs</a>
      </div>
    </div>
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
  </v-navbar>

  <v-sidepanel
    id="sidepanel"
    sidebar-left
    width="auto"
  >
    <div class="h-full overflow-scroll pl-6 pr-10">
      <h6>
        <router-link
          to="/documentation/components"
          class="transition-all"
        >
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
        <router-link
          to="/documentation/components"
          class="transition-all"
        >
          Components
        </router-link>
      </h6>
      <ul class="list-unstyled ml-4">
        <li
          v-for="(c, i) in components"
          :key="i"
        >
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
        <router-link
          to="/documentation/form-components"
          class="transition-all"
        >
          Form Components
        </router-link>
      </h6>
      <ul class="list-unstyled ml-4">
        <li
          v-for="(c, i) in formComponents"
          :key="i"
        >
          <router-link
            :to="'/documentation/' + c.name"
            active-class="active"
            class="transition-all"
          >
            {{ c.label }}
          </router-link>
        </li>
        <li>
          <router-link
            to="/documentation/form-validation"
            active-class="active"
            class="transition-all"
          >
            Form Validation
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
      <div class="min-h-[100px]"></div>
    </div>
  </v-sidepanel>

  <div
    class="top-16 relative flex justify-center text-text-800 dark:bg-[#191919] dark:text-text-300/80 lg:px-0"
  >
    <div
      class="sidebar sticky top-16 hidden flex-none basis-1/5 overflow-auto border-r p-3 pb-20 pr-7 text-[0.9em] font-semibold dark:border-dark-700 lg:flex"
    >
      <div class="ml-auto text-text-600 dark:text-text-300/70">
        <!-- general -->

        <h6>
          <router-link
            to="/documentation/components"
            class="transition-all"
          >
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
          <router-link
            to="/documentation/components"
            class="transition-all"
          >
            Components
          </router-link>
        </h6>
        <ul class="list-unstyled ml-4">
          <li
            v-for="(c, i) in components"
            :key="i"
          >
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
          <router-link
            to="/documentation/form-components"
            class="transition-all"
          >
            Form Components
          </router-link>
        </h6>
        <ul class="list-unstyled ml-4">
          <li
            v-for="(c, i) in formComponents"
            :key="i"
          >
            <router-link
              :to="'/documentation/' + c.name"
              active-class="active"
              class="transition-all"
            >
              {{ c.label }}
            </router-link>
          </li>
          <li>
            <router-link
              to="/documentation/form-validation"
              active-class="active"
              class="transition-all"
            >
              Form Validation
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
        <div class="min-h-[100px]"></div>
      </div>
    </div>

    <!-- documentation page -->

    <div
      class="lg:mx-14 mt-12 w-full max-w-[1024px] p-3 px-2 lg:max-w-screen-lg lg:px-12"
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
      class="sidebar sticky top-16 hidden flex-none basis-1/5 overflow-auto py-3 pb-20 text-[0.9em] font-semibold dark:border-dark-700 xl:block -translate-x-10"
    >
      <div class="mb-4 ml-2 mt-4 text-black dark:text-white">Contents</div>
      <ul>
        <li
          v-for="item in headers"
          :class="{
            'ml-4': item.level === '6',
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

<script>
import { ref, onMounted, watch, nextTick } from "vue";
// light style
// import "../../styles/hljs/github.css";
import "../../styles/hljs/google-light.css";
// dark style
// import "../../styles/hljs/tokyo-night-dark.css";
// import "../../styles/hljs/vs2015.css";
import "../../styles/hljs/oceanicnext.css";
import { components, formComponents } from "../Components.js";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export default {
  setup() {
    let darkMode = ref(true);

    let route = useRoute();

    let documentation = ref(null);

    let headers = ref([]);

    let getHeaders = () => {
      if (!documentation.value) return [];
      return [...documentation.value.querySelectorAll("h4,h5,h6")].map((i) => {
        return {
          text: i.innerText,
          level: i.tagName[1],
          id: i.id,
        };
      });
    };

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

    return {
      setDarkMode,
      darkMode,
      components,
      formComponents,
      documentation,
      headers,
      route,
    };
  },
};
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
