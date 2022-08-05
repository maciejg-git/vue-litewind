<template>
  <v-button @click="isOpen = !isOpen">Toggle sidepanel</v-button>

  <v-sidepanel
    v-model="isOpen"
    v-bind="example"
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
  <v-tabs base="material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="model" class="font-semibold">v-model:</label>
        <v-input type="text" id="model" inline v-model="isOpen"></v-input>
      </div>
      <div class="mb-2">
        <label for="close-button">close-button:</label>
        <v-select-prop id="close-button" v-model="example.closeButton">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select-prop>
      </div>
      <div class="mb-2">
        <label for="sidebar-left">sidebar-left:</label>
        <v-select-prop id="sidebar-left" v-model="example.sidebarLeft">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select-prop>
      </div>
      <div class="mb-2">
        <label for="width">width:</label>
        <v-input type="text" id="width" inline v-model="example.width"></v-input>
      </div>
      <div class="mb-2">
        <label for="no-header">no-header:</label>
        <v-select-prop id="no-header" v-model="example.noHeader">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select-prop>
      </div>
      <div class="mb-2">
        <label for="transition">transition:</label>
        <v-select id="transition" v-model="example.transition">
          <option value="fade-slide-f">fade-slide-f</option>
          <option value="fade-slide-m">fade-slide-m</option>
          <option value="fade-slide-s">fade-slide-s</option>
          <option value="">empty string</option>
        </v-select>
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
      closeButton: true,
      sidebarLeft: false,
      width: "320px",
      noHeader: false,
      transition: "fade-slide-m",
    });

    let isOpen = ref(false);

    return {
      example,
      isOpen,
    };
  },
};
</script>
