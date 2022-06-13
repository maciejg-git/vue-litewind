<template>
  <!-- simple input -->

  <p class="my-6">Simple input</p>

  <v-input
    v-model="example.model"
    :type="example.type"
    :clearable="example.clearable"
    :state="example.state"
    placeholder="Type something..."
  />

  <p class="my-6">Input with icon</p>

  <div class="flex gap-x-10">
    <!-- icon (prop) -->

    <v-input
      v-model="example.model"
      :type="example.type"
      :clearable="example.clearable"
      :state="example.state"
      icon="b-exclamation-circle"
      placeholder="Type something..."
    />

    <!-- icon (slot) -->

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
  </div>

  <p class="my-6">Styled inputs</p>

  <!-- underlined -->

  <div class="flex gap-x-10">
    <v-input
      v-model="example.model"
      base="input-underline"
      :type="example.type"
      :clearable="example.clearable"
      :state="example.state"
      placeholder="Type something..."
    />

    <!-- rounded -->

    <v-input
      v-model="example.model"
      base="input-rounded"
      :type="example.type"
      :clearable="example.clearable"
      :state="example.state"
      placeholder="Type something..."
    />
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
        <div>
          <label for="clearable">clearable:</label>
          <v-select id="clearable" v-model="example.clearable">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
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
