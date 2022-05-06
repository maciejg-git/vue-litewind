<template>

  <!-- v-button-collapse -->

  <v-card>
    <v-button-collapse block v-model="example.isVisible">
      Toggle collapse
    </v-button-collapse>
    <v-collapse v-model="example.isVisible" :transition="example.transition">
      <div class="p-4">
        {{ text[0] }}
      </div>
    </v-collapse>
  </v-card>

  <v-card class="mt-1">
    <v-collapse :transition="example.transition" v-model="example.isVisible">
    <template #reference="{ isOpen, onTrigger }">
      <v-button-collapse block v-on="onTrigger" :switch="isOpen.value">
        Toggle collapse
      </v-button-collapse>
    </template>
      <div class="p-4">
        {{ text[0] }}
      </div>
    </v-collapse>
  </v-card>

  <!-- v-button -->

  <v-card class="mt-1">
    <v-button block @click="example.isVisible2 = !example.isVisible2">
      <span class="ml-auto">Toggle collapse 2</span>
      <v-chevron
        initial="down"
        rotate180
        counter-clockwise
        :switch="example.isVisible2"
        class="ml-auto"
      />
    </v-button>
    <v-collapse v-model="example.isVisible2" :transition="example.transition">
      <div class="p-4">
        {{ text[1] }}
      </div>
    </v-collapse>
  </v-card>

  <!-- v-button-collapse (styled) -->

  <v-card class="mt-1">
    <v-button-collapse
      block
      v-model="example.isVisible3"
      style-button="square small pink uppercase"
    >
      Toggle collapse
    </v-button-collapse>
    <v-collapse v-model="example.isVisible3" :transition="example.transition">
      <div class="p-4">
        {{ text[2] }}
      </div>
    </v-collapse>
  </v-card>
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
</template>

<script>
import { reactive } from "vue";
import { text } from "../../../const"

export default {
  setup() {
    let example = reactive({
      isVisible: false,
      isVisible2: false,
      isVisible3: false,
      transition: "fade-collapse",
    });

    return {
      example,
      text,
    };
  },
};
</script>
