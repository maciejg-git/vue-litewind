<template>
  <v-table
    v-bind="example"
    v-model:page="page"
    @update:filtered-count="handleFilteredCount"
    @update:page="handlePageChange"
    @input:selection="handleSelection"
    class="min-w-full"
  >
    <template #cell:status="{ item }">
      <v-icon
        v-if="item.status"
        name="mdi-checkbox-outline"
        class="h-6 w-6 text-success-600 dark:text-success-400"
      ></v-icon>
      <v-icon
        v-else
        name="mdi-checkbox-blank-outline"
        class="h-6 w-6"
      ></v-icon>
    </template>

    <template #cell:department="{ item }">
      <div class="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
        {{ item.department }}
      </div>
    </template>

    <template #cell:edit="{ item }">
      <!-- stop propagation to avoid selecting row -->
      <v-button
        base="plain-button"
        @click.stop="edit(item)"
        block
      >
        <v-icon
          name="mdi-account-edit"
          class="h-6 w-6"
        ></v-icon>
      </v-button>
    </template>

    <template #busy>
      <div class="my-5 flex justify-center">
        <v-spinner
          type="svg"
          style-spinner="large"
        />
      </div>
    </template>

    <template #caption>Example caption</template>
  </v-table>

  <!-- pagination and items per page -->

  <div class="my-5 justify-between lg:flex">
    <div>
      <v-pagination
        v-model="page"
        :items-count="example.itemsCount"
        :items-per-page="example.itemsPerPage"
        :max-pages="7"
      />
    </div>
    <div class="mt-4 lg:mt-0">
      <label
        for="items-per-page"
        class="mr-4"
      >
        Items per page
      </label>
      <v-select
        v-model.number="example.itemsPerPage"
        id="items-per-page"
        :items="[0, 5, 10, 20, 50]"
      ></v-select>
    </div>
  </div>

  <!-- edit modal -->

  <v-modal
    v-model="editModalIsVisible"
    title="Edit"
    primaryButtonClose
    secondaryButtonClose
  >
    <pre
      v-html="editModalContent"
      class="my-0 ml-4 whitespace-pre"
    ></pre>
  </v-modal>
  <!-- CUT START -->
  <v-tabs
    base="material-tabs"
    class="mt-10"
  >
    <v-tab name="Props">
      <div class="mt-5 flex flex-col gap-y-2">
        <div>
          <label for="locale">filter:</label>
          <v-input
            type="text"
            inline
            v-model="example.filter"
            clearable
          ></v-input>
        </div>
        <div>
          <label for="locale">locale:</label>
          <v-input
            type="text"
            inline
            id="locale"
            v-model="example.locale"
          ></v-input>
        </div>
        <div>
          <label for="busy">state:</label>
          <v-select
            id="busy"
            v-model="example.state"
            inline
            :items="[
              {
                text: 'empty string (normal state)',
                value: '',
              },
              'busy',
            ]"
          ></v-select>
        </div>
        <div>
          <label for="selection-mode">selection-mode:</label>
          <v-select
            id="selection-mode"
            v-model="example.selectionMode"
            inline
            :items="[
              'single',
              'multiple',
              {
                text: 'empty string (selection disabled)',
                value: '',
              },
            ]"
          ></v-select>
        </div>
        <div>
          <label for="caption-top">caption-top:</label>
          <v-select-prop
            id="caption-top"
            v-model="example.captionTop"
          ></v-select-prop>
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

<script setup>
import { ref, reactive } from "vue";
import data from "../example-data/company-complete.json";

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
  primaryKey: "id",
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
</script>
