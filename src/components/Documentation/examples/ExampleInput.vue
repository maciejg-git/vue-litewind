<template>
  <p class="my-6">Input with icon</p>

  <div class="flex gap-x-10">
    <!-- icon (prop) -->

    <v-input
      v-model="example.model"
      v-bind="example"
      icon="b-exclamation-circle"
      placeholder="Type something..."
      @input:clear="handleClickClear"
    ></v-input>

    <!-- icon (slot) -->

    <v-input
      v-model="example.model"
      v-bind="example"
      icon="b-exclamation-circle"
      placeholder="Type something..."
      @input:clear="handleClickClear"
    >
      <template #icon>
        <v-icon
          name="b-exclamation-circle"
          class="h-6 w-6 text-gray-400 dark:text-gray-400 mr-2"
        ></v-icon>
      </template>
    </v-input>
  </div>

  <p class="my-6">Prepend and append slots</p>

  <div class="flex gap-x-10">
    <!-- icon (prop) -->

    <v-input
      v-model="example.model"
      v-bind="example"
      placeholder="Type something..."
      @input:clear="handleClickClear"
    >
      <template #prepend>
        <div class="mr-2">http://</div>
      </template>
    </v-input>

    <!-- icon (slot) -->

    <v-input
      v-model="example.model"
      v-bind="example"
      placeholder="Type something..."
      @input:clear="handleClickClear"
    >
      <template #append>
        <div class="ml-2">.com</div>
      </template>
    </v-input>
  </div>

  <p class="my-6">Alternative style input</p>

  <!-- underlined -->

  <div class="flex gap-x-10">
    <v-input
      v-model="example.model"
      v-bind="example"
      base="underlined"
      placeholder="Type something..."
      @input:clear="handleClickClear"
    ></v-input>

    <!-- rounded -->

    <v-input
      v-model="example.model"
      v-bind="example"
      base="round"
      placeholder="Type something..."
      @input:clear="handleClickClear"
    ></v-input>
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
          <v-select-prop id="clearable" v-model="example.clearable">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="use-loader">use-loader:</label>
          <v-select-prop id="use-loader" v-model="example.useLoader">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="is-loading">is-loading:</label>
          <v-select-prop id="is-loading" v-model="example.isLoading">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="state">state:</label>
          <v-select id="state" v-model="example.state">
            <option :value=null>component controlled (null)</option>
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
      clearable: false,
      useLoader: false,
      isLoading: false,
      state: "",
    });

    let events = ref([]);

    let handleClickClear = (ev) => {
      events.value.unshift({ ev: "input:clear", data: ev });
    };

    return {
      example,
      events,
      handleClickClear,
    };
  },
};
</script>
