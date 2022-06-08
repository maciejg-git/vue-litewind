<template>
  <v-tabs
    v-bind="example"
    @input:changed-tab="
      events.unshift({ ev: 'input:changed-tab', data: $event })
    "
  >
    <v-tab name="Tab" class="p-4">
      {{ text[0] }}
    </v-tab>
    <v-tab name="Tab 2" class="p-4">
      {{ text[1] }}
    </v-tab>
    <v-tab class="p-4">
      <template #name>
        <span class="flex justify-between items-center">
          Tab 3
          <v-badge style-badge="success tiny" class="ml-3">4</v-badge>
        </span>
      </template>
      {{ text[2] }}
    </v-tab>
    <v-tab v-for="(tab, i) in tabs" :name="tab.name" class="p-4">
      <component :is="tab.component" v-bind="tab.props">
        {{ tab.content }}
      </component>
    </v-tab>
  </v-tabs>
  <!-- CUT START -->
  <div class="flex justify-between items-center">
    <div class="mt-5">
      <label for="style">Tabs style:</label>
      <v-select id="style" v-model="example.base">
        <option value="tabs">browser</option>
        <option value="tabs-material">material</option>
        <option value="tabs-rounded">rounded</option>
      </v-select>
    </div>
    <v-button @click="addTab">Add tab</v-button>
  </div>
  <v-tabs base="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="fill">fill:</label>
          <v-select id="fill" v-model="example.fill">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div>
          <label for="center">center:</label>
          <v-select id="center" v-model="example.center">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div>
          <label for="right">right:</label>
          <v-select id="right" v-model="example.right">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div>
          <label for="transition">transition:</label>
          <v-select id="transition" v-model="example.transition">
            <option value="fade">fade</option>
            <option value="fade-side-slide">fade-side-slide</option>
            <option value="fade-top-slide">fade-top-slide</option>
            <option value="">empty string (no transition)</option>
          </v-select>
        </div>
      </div>
    </v-tab>
    <v-tab>
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
import { text } from "../../../const.js";

export default {
  setup() {
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
        component: "v-card",
        props: {
          class: "p-4",
        },
        content: text[tabs.value.length % 3],
      });
    };

    let events = ref([]);

    return {
      example,
      text,
      events,
      tabs,
      addTab,
    };
  },
};
</script>
