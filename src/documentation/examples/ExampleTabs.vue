<template>
  <v-tabs
    v-bind="example"
    @input:changed-tab="handleChangeTab"
  >
    <v-tab
      name="Tab"
      class="p-4"
    >
      {{ text[0] }}
    </v-tab>
    <v-tab
      name="Tab 2"
      class="p-4"
    >
      {{ text[1] }}
    </v-tab>
    <v-tab class="p-4">
      <template #name>
        <span class="flex justify-between items-center">
          Tab 3
          <v-badge
            style-badge="success tiny"
            class="ml-3"
          >
            4
          </v-badge>
        </span>
      </template>
      {{ text[2] }}
    </v-tab>
    <v-tab
      v-for="(tab, i) in tabs"
      :name="tab.name"
      class="p-4"
    >
      {{ tab.content }}
    </v-tab>
  </v-tabs>
  <!-- CUT START -->
  <div class="flex justify-between items-center">
    <div class="mt-5">
      <label for="style">Tabs style:</label>
      <v-select
        id="style"
        v-model="example.base"
        inline
        :items="['tabs', 'material-tabs', 'rounded-tabs']"
      ></v-select>
    </div>
    <v-button @click="addTab">Add tab</v-button>
  </div>
  <v-tabs
    base="material-tabs"
    class="mt-10"
  >
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="fill">fill:</label>
          <v-select-prop
            id="fill"
            v-model="example.fill"
          ></v-select-prop>
        </div>
        <div>
          <label for="center">center:</label>
          <v-select-prop
            id="center"
            v-model="example.center"
          ></v-select-prop>
        </div>
        <div>
          <label for="right">right:</label>
          <v-select-prop
            id="right"
            v-model="example.right"
          ></v-select-prop>
        </div>
        <div>
          <label for="transition">transition:</label>
          <v-select
            id="transition"
            v-model="example.transition"
            inline
            :items="[
              'fade',
              'fade-side-slide',
              'fade-top-slide',
              {
                text: 'empty string',
                value: '',
              },
            ]"
          ></v-select>
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
import { text } from "../example-data/data.js";

let example = reactive({
  fill: false,
  center: false,
  right: false,
  transition: "fade",
  base: "tabs",
});

let tabs = ref([]);

let addTab = () => {
  tabs.value.push({
    name: "Tab " + (tabs.value.length + 4),
    content: text[tabs.value.length % 3],
  });
};

let events = ref([]);

let handleChangeTab = (ev) => {
  events.value.unshift({ ev: "input:changed-tab", data: ev });
};
</script>
