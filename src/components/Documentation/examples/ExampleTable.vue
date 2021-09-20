<template>
  <v-table
    :items="example.data"
    :definition="example.definition"
    :filter="example.filter"
    v-model:page="example.page"
    :items-per-page="example.itemsPerPage"
    :state="example.state"
    :selectionMode="example.selectionMode"
    :captionTop="!!example.captionTop"
    :locale="example.locale"
    @update:filtered-count="
      example.itemsCount = $event;
      events.unshift({ ev: 'update:filtered-count', data: $event });
    "
    @update:page="events.unshift({ ev: 'update:page', data: $event })"
    @input:selection="
      events.unshift({ ev: 'input:selection', data: $event })
    "
    class="min-w-full"
  >
    <template #cell:edit="{ item }">
      <v-button style-button="tiny" @click.stop="edit(item)">edit</v-button>
    </template>
    <template #caption>Example caption</template>
  </v-table>

  <div class="lg:flex justify-between my-5">
    <div>
      <v-pagination
        v-model="example.page"
        :items-count="example.itemsCount"
        :items-per-page="example.itemsPerPage"
        max-pages="7"
        icons
      ></v-pagination>
    </div>
    <div class="mt-4 lg:mt-0">
      <label for="items-per-page" class="mr-10">Items per page</label>
      <v-select v-model="example.itemsPerPage" id="items-per-page">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </v-select>
    </div>
  </div>
  <!-- CUT START -->
  <v-tabs name="tabs-material" class="mt-10">
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
    v-model="editModal"
    title="Edit"
    primaryButtonClose
    secondaryButtonClose
  >
    <pre>{{ editContent }}</pre>
  </v-modal>
</template>

<script>
/* CUT START */
import { ref, reactive } from "vue";
import dataJSON from "../../../data.json";
/* CUT END */
export default {
  setup() {
    let example = reactive({
      data: dataJSON.slice(0, 60),
      page: 1,
      itemsPerPage: 5,
      filter: "",
      busy: false,
      selectionMode: "single",
      captionTop: false,
      locale: "en-GB",
      state: "",
      definition: [
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
      ],
    });
    /* CUT START */
    let events = ref([]);
    /* CUT END */
    let editModal = ref(false);
    let editContent = ref("");

    let edit = (c) => {
      editContent.value = JSON.stringify(c,null,1);
      editModal.value = true;
    };

    return {
      example,
      events,
      editModal,
      edit,
      editContent,
    };
  },
};
</script>
