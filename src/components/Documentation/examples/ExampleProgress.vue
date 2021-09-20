<template>
      <v-progress
        :value="+example.value"
        :max="+example.max"
        :label="example.label"
          auto-close
        :precision="+example.precision"
        :transition="example.transition"
      ></v-progress>
      <v-progress
        :value="+example.value"
        :max="+example.max"
        :label="example.label"
        :precision="+example.precision"
        :transition="example.transition"
        style-progress="rounded"
        style-progress-bar="red rounded"
        class="mt-4"
      >
        <template #default="{ value, max }">{{ value.toFixed() }} / {{ max }}</template>
      </v-progress>
      <v-progress
        :value="+example.value"
        :max="+example.max"
        :label="false"
        :precision="+example.precision"
        :transition="example.transition"
        style-progress="tiny"
        style-progress-bar="gradient"
        class="mt-4"
      ></v-progress>

      <v-progress
        style-progress="tiny"
        style-progress-bar="gradient"
        :value="example.value"
        :label="false"
        class="fixed top-0 left-0 w-full z-50"
      ></v-progress>

      <v-tabs name="tabs-material" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="value">value:</label>
            <v-input type="text" id="value" v-model="example.value"></v-input>
            <v-button
              style-button="small"
              @click="example.value += 10"
              class="ml-2"
            >
              +10
            </v-button>
            <v-button
              style-button="small"
              @click="example.value -= 10"
              class="ml-2"
            >
              -10
            </v-button>
          </div>
          <div class="mb-2">
            <label for="max">max:</label>
            <v-input type="text" id="max" v-model="example.max"></v-input>
          </div>
          <div class="mb-2">
            <label for="precision">precision:</label>
            <v-input
              type="text"
              id="precision"
              v-model="example.precision"
            ></v-input>
          </div>
          <div class="mb-2">
            <label for="label">label:</label>
            <v-select id="label" v-model="example.label">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="transition">transition:</label>
            <v-select id="transition" v-model="example.transition">
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

</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      value: 20,
      max: 100,
      label: false,
      precision: 2,
      transition: true,
      events: [],
    });

    return {
      example,
    };
  },
};
</script>
