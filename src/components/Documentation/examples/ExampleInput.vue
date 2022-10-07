<template>
  <div class="flex w-1/2">
    <v-input
      v-model="example.model"
      v-bind="example"
      multi-value="text"
      :multi-value-items="['test', 'test']"
      icon="b-exclamation-circle"
      placeholder="Type something..."
      @click:clear-button="handleClickClear"
    ></v-input>
  </div>
  <!-- CUT START -->
  <v-tabs
    base="material"
    class="mt-10"
  >
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label
            for="model"
            class="font-semibold"
          >
            v-model:
          </label>
          <v-input
            type="text"
            id="model"
            inline
            v-model="example.model"
          ></v-input>
        </div>
        <div>
          <label for="type">type:</label>
          <v-select
            id="type"
            v-model="example.type"
            :items="[
              'text',
              'password',
              'email',
              'number',
              'search',
              'time',
              'url',
              'color',
              'date',
            ]"
          ></v-select>
        </div>
        <div>
          <label for="label">label:</label>
          <v-input
            type="text"
            id="label"
            inline
            v-model="example.label"
          ></v-input>
        </div>
        <div>
          <label for="clearable">clearable:</label>
          <v-select-prop
            id="clearable"
            v-model="example.clearable"
          ></v-select-prop>
        </div>
        <div>
          <label for="use-loader">use-loader:</label>
          <v-select-prop
            id="use-loader"
            v-model="example.useLoader"
          ></v-select-prop>
        </div>
        <div>
          <label for="is-loading">is-loading:</label>
          <v-select-prop
            id="is-loading"
            v-model="example.isLoading"
          ></v-select-prop>
        </div>
        <div>
          <label for="state">state:</label>
          <v-select
            id="state"
            v-model="example.state"
            :items="[
              {
                text: 'null (component controlled)',
                value: null,
              },
              {
                text: 'empty string',
                value: '',
              },
              'valid',
              'invalid',
            ]"
          ></v-select>
        </div>
      </div>
    </v-tab>
    <v-tab>
      <template #name>
        Events
        <v-badge
          style-badge="secondary tiny"
          class="ml-2"
          update-animation="scale-up"
          :update-key="events.length"
        >
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
      type: "text",
      label: "",
      clearable: false,
      useLoader: false,
      isLoading: false,
      state: "",
    });

    let events = ref([]);

    let handleClickClear = (ev) => {
      example.model = "";
      events.value.unshift({ ev: "click:clear-button", data: ev });
    };

    return {
      example,
      events,
      handleClickClear,
    };
  },
};
</script>
