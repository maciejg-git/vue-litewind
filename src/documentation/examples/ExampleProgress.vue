<template>
  <!-- simple progress -->

  <v-progress v-bind="example"></v-progress>

  <!-- progress with custom label -->

  <v-progress
    v-bind="example"
    mod-progress="shape:rounded"
    mod-progress-bar="variant:red shape:rounded"
    class="mt-4"
  >
    <template #label="{ value, max }">
      {{ value.toFixed() }} / {{ max }}
    </template>
  </v-progress>

  <!-- narrow, styled progress -->

  <v-progress
    v-bind="example"
    mod-progress="size:tiny"
    mod-progress-bar="variant:gradient"
    class="mt-4"
  ></v-progress>

  <!-- page load progress -->

  <v-progress
    mod-progress="size:tiny variant:transparent"
    mod-progress-bar="variant:gradient"
    :value="example.value"
    :label="false"
    :transition="example.transition"
    class="fixed top-0 left-0 w-full z-50"
  ></v-progress>
  <!-- CUT START -->
  <v-tabs
    base="materialTabs"
    class="mt-10"
  >
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="value">value:</label>
          <v-input
            type="text"
            id="value"
            inline
            v-model.number="example.value"
          ></v-input>
          <v-button
            mod-button="size:small"
            @click="example.value += 10"
            class="ml-2"
          >
            +10
          </v-button>
          <v-button
            mod-button="size:small"
            @click="example.value -= 10"
            class="ml-2"
          >
            -10
          </v-button>
        </div>
        <div>
          <label for="max">max:</label>
          <v-input
            type="text"
            id="max"
            inline
            v-model.number="example.max"
          ></v-input>
        </div>
        <div>
          <label for="precision">precision:</label>
          <v-input
            type="text"
            id="precision"
            inline
            v-model.number="example.precision"
          ></v-input>
        </div>
        <div>
          <label for="label">label:</label>
          <v-select-prop
            id="label"
            v-model="example.label"
          ></v-select-prop>
        </div>
        <div>
          <label for="transition">transition:</label>
          <v-select-prop
            id="transition"
            v-model="example.transition"
          ></v-select-prop>
        </div>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script setup>
import { reactive } from "vue";

let example = reactive({
  value: 20,
  max: 100,
  label: false,
  precision: 2,
  transition: true,
});
</script>
