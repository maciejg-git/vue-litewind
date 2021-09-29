<template>
  <!-- position relative -->

  <v-alert
    v-model="example.isVisible"
    :dismissable="example.dismissable"
    :auto-dismiss-delay="example.autoDismissDelay"
    :state="example.state"
    class="my-2"
  >
    <v-icon :icon-type="example.state" class="b-icon--md mr-2"></v-icon>
    Alert
  </v-alert>

  <!-- position absolute -->

  <v-alert
    v-model="example.isVisibleAbsolute"
    :dismissable="example.dismissable"
    :auto-dismiss-delay="example.autoDismissDelay"
    :state="example.state"
    class="fixed top-20 left-1/2 w-3/4 transform -translate-x-1/2 shadow"
  >
    Alert
  </v-alert>
  <!-- CUT START -->
  <div class="flex justify-between items-center">
    <div class="mt-5">
      <label for="state">Alert state:</label>
      <v-select id="state" v-model="example.state">
        <option value="info">info</option>
        <option value="danger">danger</option>
        <option value="warn">warn</option>
        <option value="success">success</option>
        <option value="light">light</option>
        <option value="valid">valid</option>
        <option value="invalid">invalid</option>
      </v-select>
    </div>
    <div class="flex gap-4">
      <v-button :disabled="example.isVisible" @click="example.isVisible = true">
        Show alert
      </v-button>
      <v-button
        :disabled="example.isVisibleAbsolute"
        @click="example.isVisibleAbsolute = true"
      >
        Show absolute alert
      </v-button>
    </div>
  </div>
  <v-tabs name="tabs-material" class="mt-5">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="model" class="font-semibold">v-model:</label>
        <v-input type="text" id="model" v-model="example.isVisible"></v-input>
      </div>
      <div class="mb-2">
        <label for="dismissable">dismissable:</label>
        <v-select id="dismissable" v-model="example.dismissable">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="auto-dismiss-delay">auto-dismiss-delay:</label>
        <v-input
          type="text"
          id="auto-dismiss-delay"
          v-model="example.autoDismissDelay"
        ></v-input>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      isVisible: true,
      isVisibleAbsolute: false,
      dismissable: true,
      autoDismissDelay: 0,
      state: "info",
    });

    return {
      example,
    };
  },
};
</script>
