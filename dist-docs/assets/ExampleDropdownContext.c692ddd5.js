const n=`<template>\r
  <div class="flex mb-4">\r
    <div\r
      v-for="(language, index) in languages"\r
      :key="language"\r
      class="border hover:bg-secondary-50 dark:hover:bg-dark-700 dark:border-dark-700 cursor-pointer p-2 mr-4"\r
      @contextmenu.prevent="contextMenu.showContextDropdown($event, { language, index })"\r
    >\r
      <!-- call showContextDropdown with data as argument -->\r
      {{ language }}\r
    </div>\r
  </div>\r
\r
  Language: {{ currentLanguage }}\r
\r
  <v-dropdown \r
    ref="contextMenu" \r
    auto-close-menu \r
    v-slot="{ language, index }"\r
  >\r
    <!-- data from showContextDropdown is available as default slot props -->\r
    <v-card width="280px" style-card="menu shadow">\r
      <v-dropdown-menu-item @click="currentLanguage = language">\r
        Switch to {{ language }}\r
      </v-dropdown-menu-item>\r
      <v-dropdown-menu-item @click="search(language)">\r
        Search {{ language }}\r
      </v-dropdown-menu-item>\r
      <v-divider />\r
      <v-dropdown-menu-item @click="languages.splice(index, 1)">\r
        Remove {{ language }}\r
      </v-dropdown-menu-item>\r
      <v-divider />\r
      <v-dropdown-menu-item @click="languages.push('spanish')">\r
        Add spanish\r
      </v-dropdown-menu-item>\r
      <v-dropdown-menu-item @click="languages.push('french')">\r
        Add french\r
      </v-dropdown-menu-item>\r
    </v-card>\r
  </v-dropdown>\r
</template>\r
\r
<script>\r
import { ref } from "vue";\r
\r
export default {\r
  setup() {\r
    let contextMenu = ref(null);\r
\r
    let currentLanguage = ref("");\r
\r
    let languages = ref([\r
      "english",\r
      "swedish",\r
      "korean",\r
      "german",\r
      "icelandic",\r
      "japanese",\r
    ]);\r
\r
    let search = (data) => window.open("https://google.com/search?q=" + data);\r
\r
    return {\r
      contextMenu,\r
      languages,\r
      currentLanguage,\r
      search,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{n as default};
