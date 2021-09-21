<template>
  <v-button @click="example.isOpen = !example.isOpen">
    Toggle sidepanel
  </v-button>
  <v-sidepanel
    v-model="example.isOpen"
    :closeButton="example.closeButton"
    :sidebar-left="example.sidebarLeft"
    :width="example.width"
    :no-header="example.noHeader"
  >
    <template #header>
      <span class="text-xl font-bold">Sidepanel</span>
    </template>
    <div class="p-5">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </div>
  </v-sidepanel>
  <!-- CUT START -->
  <v-tabs name="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="model" class="font-semibold">v-model:</label>
        <v-input type="text" id="model" v-model="example.isOpen"></v-input>
      </div>
      <div class="mb-2">
        <label for="close-button">close-button:</label>
        <v-select id="close-button" v-model="example.closeButton">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="sidebar-left">sidebar-left:</label>
        <v-select id="sidebar-left" v-model="example.sidebarLeft">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="width">width:</label>
        <v-input type="text" id="width" v-model="example.width"></v-input>
      </div>
      <div class="mb-2">
        <label for="no-header">no-header:</label>
        <v-select id="no-header" v-model="example.noHeader">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
    </v-tab>
    <v-tab>
      <template #name>
        Events
        <v-badge style-badge="secondary tiny" class="ml-2">
          {{ example.events.length }}
        </v-badge>
      </template>
      <div class="overflow-y-auto max-h-48 mt-5 w-full">
        <div class="px-2 pb-2">
          <template v-for="ev in example.events">
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
      isOpen: false,
      closeButton: true,
      sidebarLeft: false,
      width: "320px",
      noHeader: false,
      events: [],
    });

    return {
      example,
    };
  },
};
</script>
