<template>
  <div class="flex flex-col items-start">
    <p class="my-6">Simple input</p>

    <v-input
      v-model="example.model"
      :type="example.type"
      :clearable="example.clearable"
      :state="example.state"
      placeholder="Type something..."
    />

    <!-- icon (prop) -->

    <p class="my-6">Input with icon (prop)</p>

    <v-input
      v-model="example.model"
      :type="example.type"
      :clearable="example.clearable"
      :state="example.state"
      icon="b-exclamation-circle"
      placeholder="Type something..."
    />

    <!-- icon (slot) -->

    <p class="my-6">Input with icon (slot)</p>

    <v-input
      v-model="example.model"
      :type="example.type"
      :clearable="example.clearable"
      :state="example.state"
      icon="b-exclamation-circle"
      placeholder="Type something..."
    >
      <template #icon>
        <v-icon
          name="b-exclamation-circle"
          class="absolute h-6 w-6 text-gray-400 dark:text-gray-400 ml-2 mr-2"
        ></v-icon>
      </template>
    </v-input>

    <p class="my-6">Styled inputs</p>

    <!-- underlined -->

    <div class="flex gap-x-10">
      <v-input
        v-model="example.model"
        name="input-underline"
        :type="example.type"
        :clearable="example.clearable"
        :state="example.state"
        placeholder="Type something..."
      />

      <!-- rounded -->

      <v-input
        v-model="example.model"
        name="input-rounded"
        :type="example.type"
        :clearable="example.clearable"
        :state="example.state"
        placeholder="Type something..."
      />
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
        <label for="clearable">clearable:</label>
        <v-select id="clearable" v-model="example.clearable">
          <option :value="true">true</option>
          <option :value="false">false</option>
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

export default {
  setup() {
    let example = reactive({
      model: "",
      type: "text",
      clearable: false,
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
