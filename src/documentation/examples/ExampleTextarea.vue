<template>
  <v-textarea
    v-model="example.model"
    :label="example.label"
    :state="example.state"
    inline
    placeholder="Type something..."
    class="w-[400px] h-[120px]"
  />

  <p class="my-6">Alternative style textarea</p>

  <v-textarea
    v-model="example.model"
    base="underlined"
    :label="example.label"
    :state="example.state"
    inline
    placeholder="Type something..."
    class="w-[400px] h-[120px]"
  />
<!-- CUT START -->
  <v-tabs base="material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="model" class="font-semibold">v-model:</label>
          <v-input type="text" id="model" inline v-model="example.model"></v-input>
        </div>
        <div>
          <label for="label">label:</label>
          <v-input type="text" id="label" inline v-model="example.label"></v-input>
        </div>
        <div>
          <label for="state">state:</label>
          <v-select id="state" v-model="example.state" :items="[
              {
                text: 'component controlled (null)',
                value: null,
              },
              {
                text: 'empty string',
                value: '',
              },
              'valid',
              'invalid,'
            ]">
          </v-select>
        </div>
      </div>
    </v-tab>
    <v-tab>
      <template #name>
        Events
        <v-badge style-badge="secondary tiny">
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
      model: "",
      label: "Textarea label",
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
