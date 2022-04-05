<template>
  <div class="flex mb-4">
    <div
      v-for="(language, index) in languages"
      :key="language"
      class="border hover:bg-secondary-50 dark:hover:bg-dark-700 dark:border-dark-700 cursor-pointer p-2 mr-4"
      @contextmenu.prevent="dropdown.showContextDropdown($event, { language, index })"
    >
      {{ language }}
    </div>
  </div>

  Language: {{ currentLanguage }}

  <v-dropdown 
    ref="dropdown" 
    auto-close-menu 
    v-slot="{ contextData }"
  >
    <v-card width="280px" style-card="menu shadow">
      <v-dropdown-menu-item @click="currentLanguage = contextData.language">
        Switch to {{ contextData.language }}
      </v-dropdown-menu-item>
      <v-dropdown-menu-item @click="search(contextData.language)">
        Search {{ contextData.language }}
      </v-dropdown-menu-item>
      <v-divider />
      <v-dropdown-menu-item @click="languages.splice(contextData.index, 1)">
        Remove {{ contextData.language }}
      </v-dropdown-menu-item>
      <v-divider />
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
import { ref } from "vue";

export default {
  setup() {
    let dropdown = ref(null);

    let currentLanguage = ref("");

    let languages = ref([
      "english",
      "swedish",
      "korean",
      "german",
      "icelandic",
      "japanese",
    ]);

    let search = (data) => window.open("https://google.com/search?q=" + data);

    return {
      dropdown,
      languages,
      currentLanguage,
      search,
    };
  },
};
</script>
