<template>
  <div class="flex flex-col items-start">
    <!-- single value select -->

    <p class="my-6">Simple select</p>

    <v-select
      v-model="example.model"
      :state="example.state"
      :options="options"
      class="w-52"
    >
      <template #options-prepend>
        <option value="option (prepend slot)">option (prepend slot)</option>
      </template>
      <option value="option (default slot)">option (default slot)</option>
    </v-select>

    <!-- multiple value select -->

    <p class="my-6">Multiple options select</p>

    <v-select
      v-model="example.modelMultiple"
      :state="example.state"
      :options="options"
      :multiple="true"
      class="w-52"
    ></v-select>

    <!-- icon (prop) -->

    <p class="my-6">Select with icon (prop)</p>

    <v-select
      v-model="example.model"
      :state="example.state"
      :options="options"
      icon="b-exclamation-circle"
      class="w-52"
    ></v-select>

    <!-- icon (slot) -->

    <p class="my-6">Select with icon (slot)</p>

    <v-select
      v-model="example.model"
      :state="example.state"
      :options="options"
      icon="b-exclamation-circle"
      class="w-52"
    >
      <template #icon>
        <v-icon
          name="b-exclamation-circle"
          class="absolute h-6 w-6 text-gray-400 dark:text-gray-400 ml-2 mr-2"
        ></v-icon>
      </template>
    </v-select>
  </div>
  <!-- CUT START -->
  <v-tabs name="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="model" class="font-semibold">v-model:</label>
        <v-input type="text" id="model" v-model="example.model"></v-input>
      </div>
      <div class="mb-2">
        <label for="model-multiple" class="font-semibold">
          v-model (multiple):
        </label>
        <v-input
          type="text"
          id="model-multiple"
          v-model="example.modelMultiple"
        ></v-input>
      </div>
      <div class="mb-2">
        <label for="state">state:</label>
        <v-select id="state" v-model="example.state">
          <option value="">normal (empty string)</option>
          <option value="valid">valid</option>
          <option value="invalid">invalid</option>
        </v-select>
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
      model: "",
      modelMultiple: [],
      state: "",
    });

    let events = ref([]);

    let options = ref([
      {
        value: "option",
        label: "option",
      },
      {
        value: "option 2",
        label: "option 2",
      },
      {
        value: "option 3",
        label: "option 3",
      },
    ]);

    return {
      example,
      options,
      events,
    };
  },
};
</script>
