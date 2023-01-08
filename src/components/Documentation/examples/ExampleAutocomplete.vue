<template>
  <div class="w-1/2">
    <v-autocomplete
      v-model="example.model"
      v-model:input-value="example.inputValue"
      no-filter
      :items="example.items"
      :is-loading="example.isLoading"
      :use-loader="example.useLoader"
      :clearable="example.clearable"
      :transition="example.transition"
      :state="example.state"
      :inline="false"
      multi-value
      style-menu="shadow"
      @input:value="query($event)"
      v-on="handleExampleEvents"
    ></v-autocomplete>
  </div>
<!-- CUT START -->
  <v-tabs base="material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="model" class="font-semibold">v-model:</label>
          <v-input type="text" id="model" inline v-model="example.model"></v-input>
        </div>
        <div>
          <label for="use-loader">use-loader:</label>
          <v-select-prop id="use-loader" v-model="example.useLoader">
          </v-select-prop>
        </div>
        <div>
          <label for="clearable">clearable:</label>
          <v-select-prop id="clearable" v-model="example.clearable">
          </v-select-prop>
        </div>
        <div>
          <label for="transition">transition:</label>
          <v-select id="transition" v-model="example.transition" :items="[
              'fade',
              { text: 'empty string', value: '' },
            ]">
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
import { states } from "../data/data.js";

export default {
  components: {},
  setup() {
    let example = reactive({
      model: [],
      items: [],
      isLoading: false,
      useLoader: true,
      clearable: false,
      transition: "fade",
    });

    let query = (q) => {
      if (q === "") return example.items;
      example.isLoading = true;
      setTimeout(() => {
        example.items = states.filter((e) => {
          return (
            (e.text || "").toLowerCase().indexOf((q || "").toLowerCase()) > -1
          );
        });
        example.isLoading = false;
      }, 500);
    };

    let events = ref([]);

    let handleExampleEvents = {
      ["update:page"]: (event) =>
        events.value.unshift({ ev: "update:page", data: event }),
      ["state:focus"]: (event) =>
        events.value.unshift({ ev: "state:focus", data: event }),
      ["state:opened"]: (event) =>
        events.value.unshift({ ev: "state:opened", data: event }),
      ["state:closed"]: (event) =>
        events.value.unshift({ ev: "state:closed", data: event }),
      ["input:value"]: (event) =>
        events.value.unshift({ ev: "input:value", data: event }),
    };

    return {
      example,
      query,
      events,
      handleExampleEvents,
    };
  },
};
</script>
