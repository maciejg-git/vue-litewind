<template>
  <v-pagination
    v-model="example.page"
    :items-count="example.itemsCount"
    :items-per-page="example.itemsPerPage"
    :max-pages="example.maxPages"
    :icons="example.icons"
    @update:modelValue="
      events.unshift({ ev: 'update:modelValue', data: $event })
    "
  />
    <!-- CUT START -->
  <v-tabs name="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="model" class="font-semibold">v-model:</label>
        <v-input type="text" id="model" v-model="example.page"></v-input>
      </div>
      <div class="mb-2">
        <label for="items-count">items-count:</label>
        <v-input
          type="text"
          id="items-count"
          v-model="example.itemsCount"
        ></v-input>
      </div>
      <div class="mb-2">
        <label for="items-per-page">items-per-page:</label>
        <v-input
          type="text"
          id="items-per-page"
          v-model="example.itemsPerPage"
        ></v-input>
      </div>
      <div class="mb-2">
        <label for="max-pages">max-pages:</label>
        <v-input
          type="text"
          id="max-pages"
          v-model="example.maxPages"
        ></v-input>
      </div>
      <div class="mb-2">
        <label for="icons">icons:</label>
        <v-select id="icons" v-model="example.icons">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
    </v-tab>
    <v-tab name="Events">
      <template #name>
        Events
        <v-badge style-badge="secondary tiny" class="ml-2">
          {{ events.length }}
        </v-badge>
      </template>
      <div class="overflow-y-auto max-h-48 mt-5 w-full">
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
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      page: 1,
      itemsPerPage: 5,
      itemsCount: 50,
      maxPages: 7,
      icons: true,
    });
    
    let events = ref([]);

    return {
      example,
      events,
    };
  },
};
</script>
