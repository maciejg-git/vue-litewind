<template>
  <!-- model collapse -->

  <p class="mt-8 mb-4">Model collapse</p>

  <v-card>
    <v-button-chevron
      :switch="example.isVisible"
      block
      :chevron="{ class: 'ml-auto' }"
      @click="example.isVisible = !example.isVisible"
    >
      Toggle collapse
    </v-button-chevron>

    <v-collapse
      v-model="example.isVisible"
      :transition="example.transition"
    >
      <div class="p-8">
        {{ text[0] }}
      </div>
    </v-collapse>
  </v-card>

  <!-- reference slot collapse -->

  <p class="mt-8 mb-4">Reference slot collapse</p>

  <v-card>
    <v-collapse :transition="example.transition">
      <template #reference="{ isOpen, onTrigger }">
        <v-button-chevron
          :switch="isOpen"
          block
          :chevron="{ class: 'ml-auto' }"
          v-on="onTrigger"
        >
          Toggle collapse
        </v-button-chevron>
      </template>

      <div class="p-8">
        {{ text[0] }}
      </div>
    </v-collapse>
  </v-card>
  <!-- CUT START -->
  <v-tabs
    base="material-tabs"
    class="mt-10"
  >
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="transition">transition:</label>
          <v-select
            id="transition"
            v-model="example.transition"
            inline
            :items="[
              'fade-collapse',
              {
                text: 'empty string',
                value: '',
              },
            ]"
          ></v-select>
        </div>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script setup>
import { reactive } from "vue";
import { text } from "../example-data/data.js";

let example = reactive({
  isVisible: false,
  transition: "fade-collapse",
});
</script>
