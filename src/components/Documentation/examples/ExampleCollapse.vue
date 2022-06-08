<template>
  <!-- model collapse -->

  <p class="mt-8 mb-4">Model collapse</p>

  <v-card>
    <v-button-collapse v-model="example.isVisible" block class="w-full">
      Toggle collapse
    </v-button-collapse>
    <v-collapse v-model="example.isVisible" :transition="example.transition">
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
        <v-button-collapse
          :switch="isOpen"
          block
          class="w-full"
          v-on="onTrigger"
        >
          Toggle collapse
        </v-button-collapse>
      </template>
      <div class="p-8">
        {{ text[0] }}
      </div>
    </v-collapse>
  </v-card>

  <!-- custom button collapse -->

  <p class="mt-8 mb-4">Custom button collapse</p>

  <v-card>
    <v-collapse :transition="example.transition">
      <template #reference="{ isOpen, onTrigger }">
        <v-button block class="w-full" v-on="onTrigger">
          <span class="ml-auto">Toggle collapse</span>
          <v-chevron
            initial="down"
            rotate180
            counter-clockwise
            triangle
            :switch="isOpen"
            class="ml-auto"
          />
        </v-button>
      </template>
      <div class="p-8">
        {{ text[1] }}
      </div>
    </v-collapse>
  </v-card>
  <!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="transition">transition:</label>
          <v-select id="transition" v-model="example.transition">
            <option value="fade-collapse-f">fade-collapse-f</option>
            <option value="fade-collapse-m">fade-collapse-m</option>
            <option value="fade-collapse-s">fade-collapse-s</option>
            <option value="">none (empty string)</option>
          </v-select>
        </div>
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
      transition: "fade-collapse-m",
    });

    return {
      example,
      text,
    };
  },
};
</script>
