<template>
  <v-table
    v-bind="example"
    v-model:page="page"
    @update:filtered-count="handleFilteredCount"
    @update:page="handlePageChange"
    @input:selection="handleSelection"
    class="min-w-full"
  >
    <template #cell:edit="{ item }">
      <!-- stop propagation to avoid selecting row -->
      <v-button style-button="tiny" @click.stop="edit(item)">edit</v-button>
    </template>
    <template #caption>Example caption</template>
  </v-table>

  <!-- pagination and items per page -->

  <div class="lg:flex justify-between my-5">
    <div>
      <v-pagination
        v-model="page"
        :items-count="example.itemsCount"
        :items-per-page="example.itemsPerPage"
        :max-pages="7"
        icons
      />
    </div>
    <div class="mt-4 lg:mt-0">
      <label for="items-per-page" class="mr-4">Items per page</label>
      <v-select v-model.number="example.itemsPerPage" id="items-per-page">
        <option value="0">0</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </v-select>
    </div>
  </div>
  <!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="locale">filter:</label>
        <v-input type="text" v-model="example.filter"></v-input>
      </div>
      <div class="mb-2">
        <label for="locale">locale:</label>
        <v-input type="text" id="locale" v-model="example.locale"></v-input>
      </div>
      <div class="mb-2">
        <label for="busy">state:</label>
        <v-select id="busy" v-model="example.state">
          <option value="">empty string (normal state)</option>
          <option value="busy">busy</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="selection-mode">selection-mode:</label>
        <v-select id="selection-mode" v-model="example.selectionMode">
          <option value="single">single</option>
          <option value="multiple">multiple</option>
          <option value="">empty string (selection disabled)</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="caption-top">caption-top:</label>
        <v-select id="caption-top" v-model="example.captionTop">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
    </v-tab>
    <v-tab>
      <template #name>
        Events
        <v-badge style-badge="secondary tiny" class="ml-2">
          {{ events.length }}
        </v-badge>
      </template>
      <div class="overflow-y-scroll max-h-48 mt-5">
        <div class="px-2 pb-2">
          <template v-for="ev in events">
            <div class="py-1">
              <code class="code-word">{{ ev.ev }}</code>
              {{ ev.data }}
            </div>
          </template>
        </div>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->

  <v-modal
    v-model="editModalIsVisible"
    title="Edit"
    primaryButtonClose
    secondaryButtonClose
  >
    <pre>{{ editModalContent }}</pre>
  </v-modal>
</template>

<script>
import { ref, reactive } from "vue";
/* CUT START */
import data from "../data/data.json";
/* CUT END */

export default {
  setup() {
    let definition = [
      {
        key: "id",
        visible: false,
      },
      {
        key: "first_name",
        sortable: true,
      },
      {
        key: "last_name",
        sortable: true,
      },
      {
        key: "email",
        sortable: true,
      },
      {
        key: "city",
        sortable: true,
      },
      {
        key: "country",
        sortable: true,
        class: (k, v) => (v == "ID" ? "bg-red-50" : ""),
      },
      {
        key: "edit",
      },
    ];

    let example = reactive({
      items: data.slice(0, 60),
      itemsPerPage: 5,
      filter: "",
      busy: false,
      selectionMode: "single",
      captionTop: false,
      locale: "en-GB",
      state: "",
      definition: definition,
    });

    let page = ref(1);

    let events = ref([]);

    let editModalIsVisible = ref(false);
    let editModalContent = ref("");

    let edit = (content) => {
      editModalContent.value = JSON.stringify(content, null, 1);
      editModalIsVisible.value = true;
    };

    let handleFilteredCount = (count) => {
      example.itemsCount = count;
      events.value.unshift({ ev: "update:filtered-count", data: count });
    };

    let handleSelection = (selection) => {
      events.value.unshift({ ev: "input:selection", data: selection });
    };

    let handlePageChange = (page) => {
      events.value.unshift({ ev: "update:page", data: page });
    };

    return {
      example,
      page,
      events,
      editModalIsVisible,
      edit,
      editModalContent,
      handlePageChange,
      handleFilteredCount,
      handleSelection,
    };
  },
};
</script>
