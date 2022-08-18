const e=`<template>\r
  <v-table\r
    v-bind="example"\r
    v-model:page="page"\r
    @update:filtered-count="handleFilteredCount"\r
    @update:page="handlePageChange"\r
    @input:selection="handleSelection"\r
    class="min-w-full"\r
  >\r
    <template #cell:status="{ item }">\r
      <v-icon\r
        v-if="item.status"\r
        name="mdi-checkbox-outline"\r
        class="text-success-400 dark:text-success-400"\r
      ></v-icon>\r
      <v-icon v-else name="mdi-checkbox-blank-outline"></v-icon>\r
    </template>\r
\r
    <template #cell:department="{ item }">\r
      <div class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden">\r
        {{ item.department }}\r
      </div>\r
    </template>\r
\r
    <template #cell:edit="{ item }">\r
      <!-- stop propagation to avoid selecting row -->\r
      <v-button\r
        base="button-plain"\r
        style-button="tiny"\r
        @click.stop="edit(item)"\r
        block\r
      >\r
        <v-icon name="mdi-account-edit"></v-icon>\r
      </v-button>\r
    </template>\r
\r
    <template #caption>Example caption</template>\r
  </v-table>\r
\r
  <!-- pagination and items per page -->\r
\r
  <div class="lg:flex justify-between my-5">\r
    <div>\r
      <v-pagination\r
        v-model="page"\r
        :items-count="example.itemsCount"\r
        :items-per-page="example.itemsPerPage"\r
        :max-pages="7"\r
        icons\r
      />\r
    </div>\r
    <div class="mt-4 lg:mt-0">\r
      <label for="items-per-page" class="mr-4">Items per page</label>\r
      <v-select v-model.number="example.itemsPerPage" id="items-per-page">\r
        <option value="0">0</option>\r
        <option value="5">5</option>\r
        <option value="10">10</option>\r
        <option value="20">20</option>\r
        <option value="50">50</option>\r
      </v-select>\r
    </div>\r
  </div>\r
\r
  <!-- edit modal -->\r
\r
  <v-modal\r
    v-model="editModalIsVisible"\r
    title="Edit"\r
    primaryButtonClose\r
    secondaryButtonClose\r
  >\r
    <pre v-html="editModalContent" class="whitespace-pre my-0 ml-4"></pre>\r
  </v-modal>\r
  <!-- CUT START -->\r
  <v-tabs base="material" class="mt-10">\r
    <v-tab name="Props">\r
      <div class="flex flex-col gap-y-2 mt-5">\r
        <div>\r
          <label for="locale">filter:</label>\r
          <v-input type="text" inline v-model="example.filter" clearable></v-input>\r
        </div>\r
        <div>\r
          <label for="locale">locale:</label>\r
          <v-input type="text" inline id="locale" v-model="example.locale"></v-input>\r
        </div>\r
        <div>\r
          <label for="busy">state:</label>\r
          <v-select id="busy" v-model="example.state">\r
            <option value="">empty string (normal state)</option>\r
            <option value="busy">busy</option>\r
          </v-select>\r
        </div>\r
        <div>\r
          <label for="selection-mode">selection-mode:</label>\r
          <v-select id="selection-mode" v-model="example.selectionMode">\r
            <option value="single">single</option>\r
            <option value="multiple">multiple</option>\r
            <option value="">empty string (selection disabled)</option>\r
          </v-select>\r
        </div>\r
        <div>\r
          <label for="caption-top">caption-top:</label>\r
          <v-select-prop id="caption-top" v-model="example.captionTop">\r
            <option :value="true">true</option>\r
            <option :value="false">false</option>\r
          </v-select-prop>\r
        </div>\r
      </div>\r
    </v-tab>\r
    <v-tab>\r
      <template #name>\r
        Events\r
        <v-badge\r
          style-badge="secondary tiny"\r
          class="ml-2"\r
          update-animation="scale-up"\r
          :update-key="events.length"\r
        >\r
          {{ events.length }}\r
        </v-badge>\r
      </template>\r
      <event-viewer :events="events" />\r
    </v-tab>\r
  </v-tabs>\r
  <!-- CUT END -->\r
</template>\r
\r
<script>\r
import { ref, reactive } from "vue";\r
/* CUT START */\r
import data from "../data/company-complete.json";\r
/* CUT END */\r
\r
export default {\r
  setup() {\r
    let definition = [\r
      {\r
        key: "id",\r
        visible: false,\r
      },\r
      {\r
        key: "status",\r
        sortable: true,\r
      },\r
      {\r
        key: "first_name",\r
        sortable: true,\r
      },\r
      {\r
        key: "last_name",\r
        sortable: true,\r
      },\r
      {\r
        key: "department",\r
        sortable: true,\r
      },\r
      {\r
        key: "title",\r
        sortable: true,\r
      },\r
      {\r
        key: "city",\r
        sortable: true,\r
      },\r
      {\r
        key: "edit",\r
      },\r
    ];\r
\r
    let example = reactive({\r
      items: data.slice(0, 60),\r
      itemsPerPage: 5,\r
      filter: "",\r
      busy: false,\r
      selectionMode: "single",\r
      captionTop: false,\r
      locale: "en-GB",\r
      state: "",\r
      definition: definition,\r
    });\r
\r
    let page = ref(1);\r
    let editModalIsVisible = ref(false);\r
    let editModalContent = ref("");\r
\r
    let edit = (content) => {\r
      editModalContent.value = JSON.stringify(content, null, 2);\r
      editModalIsVisible.value = true;\r
    };\r
\r
    let events = ref([]);\r
\r
    let handleFilteredCount = (count) => {\r
      example.itemsCount = count;\r
      events.value.unshift({ ev: "update:filtered-count", data: count });\r
    };\r
\r
    let handleSelection = (selection) => {\r
      events.value.unshift({ ev: "input:selection", data: selection });\r
    };\r
\r
    let handlePageChange = (page) => {\r
      events.value.unshift({ ev: "update:page", data: page });\r
    };\r
\r
    return {\r
      example,\r
      page,\r
      events,\r
      editModalIsVisible,\r
      edit,\r
      editModalContent,\r
      handlePageChange,\r
      handleFilteredCount,\r
      handleSelection,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{e as default};
