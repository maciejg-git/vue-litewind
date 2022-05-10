<template>
  <div class="flex flex-col items-start">
    <!-- simple input -->

    <p class="my-6">Simple input</p>

    <v-input
      v-model="example.model"
      :type="example.type"
      :icon="example.icon"
      :clearable="example.clearable"
      :state="example.state"
      placeholder="Type something..."
    />

    <p class="my-6">Styled inputs</p>

    <!-- underlined -->

    <div class="flex gap-x-10">
      <v-input
        v-model="example.model"
        name="input-underline"
        :type="example.type"
      :icon="example.icon"
        :clearable="example.clearable"
        :state="example.state"
        placeholder="Type something..."
      />

      <!-- rounded -->

      <v-input
        v-model="example.model"
        name="input-rounded"
        :type="example.type"
      :icon="example.icon"
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
        <label for="icon">icon:</label>
        <v-select id="icon" v-model="example.icon">
          <option value="">no icon</option>
          <option value="b-exclamation-circle">icon</option>
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
      icon: "",
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
