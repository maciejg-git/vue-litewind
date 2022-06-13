<template>
  <div class="flex items-center my-2">
    <v-radio
      v-model="example.model"
      :state="example.state"
      value="option"
      id="option"
    ></v-radio>
    <label for="option" class="ml-3">option</label>
  </div>

  <div class="flex items-center my-2">
    <v-radio
      v-model="example.model"
      :state="example.state"
      value="option 2"
      id="option2"
    ></v-radio>
    <label for="option2" class="ml-3">option 2</label>
  </div>

  <div class="flex items-center my-2">
    <v-radio
      v-model="example.model"
      :state="example.state"
      value="option 3"
      id="option3"
    ></v-radio>
    <label for="option3" class="ml-3">option 3</label>
  </div>
<!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="model" class="font-semibold">v-model:</label>
          <v-input type="text" id="model" v-model="example.model"></v-input>
        </div>
        <div>
          <label for="state">state:</label>
          <v-select id="state" v-model="example.state">
            <option value="">normal (empty string)</option>
            <option value="valid">valid</option>
            <option value="invalid">invalid</option>
          </v-select>
        </div>
      </div>
    </v-tab>
    <v-tab>
      <template #name>
        Events
        <v-badge style-badge="secondary tiny" class="ml-2">
          {{ events.length }}
        </v-badge>
      </template>
      <event-viewer :events="events" />
    </v-tab>
  </v-tabs>
<!-- CUT END -->
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      model: true,
      state: "",
    });

    let events = ref([]);

    return {
      example,
      events,
    };
  },
};
</script>
