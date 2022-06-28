<template>
  <v-table
    v-bind="example"
    v-model:page="page"
    @update:filtered-count="handleFilteredCount"
    @update:page="handlePageChange"
    @input:selection="handleSelection"
    class="min-w-full"
  >
    <template #prepend-id></template>
    <template #cell:status="{ item }">
      <v-icon
        v-if="item.status"
        name="mdi-checkbox-outline"
        class="text-success-400 dark:text-success-400"
      ></v-icon>
      <v-icon v-else name="mdi-checkbox-blank-outline"></v-icon>
    </template>

    <template #cell:department="{ item }">
      <div class="w-[150px] whitespace-nowrap text-ellipsis overflow-hidden">
        {{ item.department }}
      </div>
    </template>

    <template #cell:edit="{ item }">
      <!-- stop propagation to avoid selecting row -->
      <v-button
        base="button-plain"
        style-button="tiny"
        @click.stop="edit(item)"
        block
      >
        <v-icon name="mdi-account-edit"></v-icon>
      </v-button>
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

  <!-- edit modal -->

  <v-modal
    v-model="editModalIsVisible"
    title="Edit"
    primaryButtonClose
    secondaryButtonClose
  >
    <pre v-html="editModalContent" class="whitespace-pre my-0 ml-4"></pre>
  </v-modal>
  <!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="locale">filter:</label>
          <v-input type="text" v-model="example.filter" clearable></v-input>
        </div>
        <div>
          <label for="locale">locale:</label>
          <v-input type="text" id="locale" v-model="example.locale"></v-input>
        </div>
        <div>
          <label for="busy">state:</label>
          <v-select id="busy" v-model="example.state">
            <option value="">empty string (normal state)</option>
            <option value="busy">busy</option>
          </v-select>
        </div>
        <div>
          <label for="selection-mode">selection-mode:</label>
          <v-select id="selection-mode" v-model="example.selectionMode">
            <option value="single">single</option>
            <option value="multiple">multiple</option>
            <option value="">empty string (selection disabled)</option>
          </v-select>
        </div>
        <div>
          <label for="caption-top">caption-top:</label>
          <v-select-prop id="caption-top" v-model="example.captionTop">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
      </div>
    </v-tab>
    <v-tab>
      <template #name>
        Events
        <v-badge
          style-badge="secondary tiny"
          class="ml-2"
          update-animation="scale-up"
          :update-key="events.length"
        >
          {{ events.length }}
        </v-badge>
      </template>
      <event-viewer :events="events" />
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script>
import { ref, reactive } from "vue";
/* CUT START */
import data from "../data/company-complete.json";
/* CUT END */

export default {
  setup() {
    let definition = [
      {
        key: "id",
        visible: false,
      },
      {
        key: "status",
        sortable: true,
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
        key: "department",
        sortable: true,
      },
      {
        key: "title",
        sortable: true,
      },
      {
        key: "city",
        sortable: true,
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
    let editModalIsVisible = ref(false);
    let editModalContent = ref("");

    let edit = (content) => {
      editModalContent.value = JSON.stringify(content, null, 2);
      editModalIsVisible.value = true;
    };

    let events = ref([]);

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
