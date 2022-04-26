<template>
  <div class="flex flex-col gap-y-4">
    <div>
      remote state
      <v-autocomplete
        v-model="example.model"
        v-model:input-value="example.inputValue"
        :items="itemsState"
        :is-loading="example.isLoading"
        style-dropdown="shadow"
        no-filter
        @input:value="querySelections($event)"
        class="w-[620px]"
      >
        <!-- <template #item="{ text, item, value, inputValue, highlightMatch }"> -->
        <!--   <span v-html="highlightMatch(text, inputValue)"></span> -->
        <!--   <span v-html="highlightMatch(value, inputValue)">  </span> -->
        <!-- </template> -->
      </v-autocomplete>
    </div>
    
    <div>
      local
      <v-autocomplete
        v-model="example.model"
        :items="itemsLanguages"
        item-text="Description"
        item-value="Link"
        style-dropdown="shadow"
        class="w-[620px]"
      >
      </v-autocomplete>
    </div>
  </div>
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
import { languages } from "../../../const";
import { states } from "../../../const"

export default {
  setup() {
    let example = reactive({
      model: "",
      inputValue: "",
      type: "text",
      state: "",
      isLoading: false,
    });

    let events = ref([]);

    let itemsLanguages = ref(languages);
    let items = ref([]);
    let itemsRemote = ref([]);

    let itemsState = ref([])

    let querySelections = (v) => {
        // Simulated ajax query
      if (v === "") return
      example.isLoading = true
        setTimeout(() => {
          itemsState.value = states.filter(e => {
            return (e.text || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          example.isLoading = false
        }, 500)
      };

    return {
      example,
      events,
      languages,
      itemsState,
      items,
      itemsLanguages,
      itemsRemote,
      querySelections,
    };
  },
};
</script>
