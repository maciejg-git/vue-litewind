<template>
  <div class="w-1/2">
    <v-autocomplete
      v-model="example.model"
      no-filter
      :items="example.items"
      :state="example.state"
      :inline="false"
      style-menu="shadow"
      @input:value="query($event)"
      v-on="handleExampleEvents"
    ></v-autocomplete>
  </div>
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
