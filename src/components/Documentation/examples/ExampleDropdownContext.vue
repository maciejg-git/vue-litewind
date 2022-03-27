<template>
  <div class="flex mb-4">
    <div
      v-for="language in languages"
      class="border hover:bg-secondary-50 dark:hover:bg-dark-700 dark:border-dark-700 cursor-pointer p-2 mr-4"
      @contextmenu.prevent="showContextDropdown($event, language)"
    >
      {{ language }}
    </div>
  </div>

  <span class="font-semibold mt-10">Current language:</span>
  {{ currentLanguage }}

  <v-dropdown
    v-model="context.isVisible"
    :reference="context.position"
    auto-close-menu
  >
    <v-card width="280px" style-card="menu shadow">
      <v-dropdown-menu-item @click="currentLanguage = context.data">
        Switch to {{ context.data }}
      </v-dropdown-menu-item>
      <v-dropdown-menu-item
        @click="window.open('https://google.com/search?q=' + context.data)"
      >
        Search {{ context.data }}
      </v-dropdown-menu-item>
      <v-dropdown-menu-item @click="languages.push('spanish')">
        Add spanish
      </v-dropdown-menu-item>
      <v-dropdown-menu-item @click="languages.push('french')">
        Add french
      </v-dropdown-menu-item>
    </v-card>
  </v-dropdown>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let context = reactive({
      isVisible: false,
      position: {},
      data: null,
    });

    let currentLanguage = ref("");

    let languages = ref([
      "english",
      "swedish",
      "korean",
      "german",
      "icelandic",
      "japanese",
    ]);

    let showContextDropdown = (e, data) => {
      context.position.x = e.clientX;
      context.position.y = e.clientY;
      context.isVisible = true;
      context.data = data;
    };

    return {
      context,
      showContextDropdown,
      languages,
      currentLanguage,
      window,
    };
  },
};
</script>
