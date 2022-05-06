<template>
  <!-- model collapse -->

  <span>Model collapse</span>

  <v-card class="my-4">
    <v-button-collapse block v-model="example.isVisible">
      Toggle collapse
    </v-button-collapse>
    <v-collapse v-model="example.isVisible" :transition="example.transition">
      <div class="py-8 px-10">
        {{ text[0] }}
      </div>
    </v-collapse>
  </v-card>

  <!-- reference slot collapse -->

  <span>Reference slot collapse</span>

  <v-card class="my-4">
    <v-collapse :transition="example.transition">
      <template #reference="{ isOpen, onTrigger }">
        <v-button-collapse block v-on="onTrigger" :switch="isOpen">
          Toggle collapse
        </v-button-collapse>
      </template>
      <div class="py-8 px-10">
        {{ text[0] }}
      </div>
    </v-collapse>
  </v-card>

  <!-- custom button collapse -->

  <span>Custom button collapse</span>

  <v-card class="my-4">
    <v-collapse :transition="example.transition">
      <template #reference="{ isOpen, onTrigger }">
        <v-button block v-on="onTrigger">
          <span class="ml-auto">Toggle collapse</span>
          <v-chevron
            initial="down"
            rotate180
            counter-clockwise
            :switch="isOpen"
            class="ml-auto"
          />
        </v-button>
      </template>
      <div class="py-8 px-10">
        {{ text[1] }}
      </div>
    </v-collapse>
  </v-card>
<!-- CUT START -->
  <v-tabs name="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="transition">transition:</label>
        <v-select id="transition" v-model="example.transition">
          <option value="fade-collapse">fade-collapse</option>
          <option value="">none (empty string)</option>
        </v-select>
      </div>
    </v-tab>
  </v-tabs>
<!-- CUT END -->
</template>

<script>
import { reactive } from "vue";
import { text } from "../../../const";

export default {
  setup() {
    let example = reactive({
      isVisible: false,
      transition: "fade-collapse",
    });

    return {
      example,
      text,
    };
  },
};
</script>
