<template>
  <div>
    <v-select
      v-model="example.model"
      :type="example.type"
      :state="example.state"
      :options="options"
      class="w-52"
    >
      <template #options-prepend>
        <option value="option (prepend slot)">option (prepend slot)</option>
      </template>
      <option value="option (default slot)">option (default slot)</option>
    </v-select>
  </div>
  <div class="mt-4">
    <v-select
      v-model="example.modelMultiple"
      :type="example.type"
      :state="example.state"
      :options="options"
      :multiple="true"
      class="w-52"
    ></v-select>
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
      model: "",
      modelMultiple: [],
      state: "",
      events: [],
    });

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
    };
  },
};
</script>
