<template>

  <!-- remote async autocomplete -->

  <p class="my-6">Remote async autocomplete</p>

  <v-autocomplete
    v-model="example.model"
    v-model:input-value="example.inputValue"
    :items="example.items"
    :is-loading="example.isLoading"
    style-dropdown="shadow"
    no-filter
    @input:value="query($event)"
    @update:page="events.unshift({ ev: 'update:page', data: $event })"
    @state:focus="events.unshift({ ev: 'state:focus', data: $event })"
    @state:opened="events.unshift({ ev: 'state:opened', data: $event })"
    @state:closed="events.unshift({ ev: 'state:closed', data: $event })"
    class="w-[420px]"
  >
  </v-autocomplete>

  <!-- customized menu options -->

  <p class="my-6">Customized menu options</p>

  <v-autocomplete
    v-model="example.model"
    v-model:input-value="example.inputValue"
    :items="example.items"
    :is-loading="example.isLoading"
    style-dropdown="shadow"
    no-filter
    @input:value="query($event)"
    @update:page="events.unshift({ ev: 'update:page', data: $event })"
    @state:focus="events.unshift({ ev: 'state:focus', data: $event })"
    @state:opened="events.unshift({ ev: 'state:opened', data: $event })"
    @state:closed="events.unshift({ ev: 'state:closed', data: $event })"
    class="w-[420px]"
  >
    <template #item="{ text, item, value, inputValue, highlightMatch }">
      <div class="flex justify-between">
        <div v-html="highlightMatch(text, inputValue)"></div>
        <div>USA</div>
      </div>
      <span class="text-text-400 dark:text-text-400 text-sm font-semibold">free</span>
    </template>
  </v-autocomplete>
  <!-- CUT START -->
  <v-tabs name="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="model" class="font-semibold">v-model:</label>
        <v-input type="text" id="model" v-model="example.model"></v-input>
      </div>
      <div class="mb-2">
        <label for="type">type:</label>
        <v-select id="type" v-model="example.type">
          <option value="text">text</option>
          <option value="password">password</option>
          <option value="email">email</option>
          <option value="number">number</option>
          <option value="search">search</option>
          <option value="time">time</option>
          <option value="url">url</option>
          <option value="color">color</option>
          <option value="date">date</option>
        </v-select>
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
          <template v-for="ev in events">
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
import { states } from "../../../const";

export default {
  setup() {
    let example = reactive({
      model: "",
      items: [],
      isLoading: false,
    });

    let query = (q) => {
      if (q === "") return;

      example.isLoading = true;

      setTimeout(() => {
        example.items = states.filter((e) => {
          return (
            (e.text || "").toLowerCase().indexOf((q || "").toLowerCase()) > -1
          );
        });
        example.isLoading = false;
      }, 500);

      events.value.unshift({ ev: "input:value", data: q });
    };

    let events = ref([]);

    return {
      example,
      query,
      events,
    };
  },
};
</script>
