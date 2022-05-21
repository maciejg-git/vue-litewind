<template>
  <!-- Simple alert -->

  <p class="my-6">Simple alert</p>

  <v-alert
    v-model="example.isVisible"
    :dismissable="example.dismissable"
    :auto-dismiss-delay="example.autoDismissDelay"
    :icon="example.variant"
    :variant="example.variant"
    style-alert="info:info danger:danger warn:warn success:success invalid:danger valid:success"
  >
    Alert
  </v-alert>

  <!-- alert with custom icon -->

  <p class="my-6">Custom icon alert</p>

  <v-alert
    v-model="example.isVisible"
    :dismissable="example.dismissable"
    :auto-dismiss-delay="example.autoDismissDelay"
    :variant="example.variant"
    style-alert="info:info danger:danger warn:warn success:success invalid:danger valid:success"
  >
    <template #icon>
      <v-icon :icon-type="example.variant" class="w-6 h-6 mr-2"></v-icon>
    </template>
    Alert
  </v-alert>

  <!-- styled alert -->

  <p class="my-6">Styled alert</p>

  <v-alert
    v-model="example.isVisible"
    :dismissable="example.dismissable"
    :auto-dismiss-delay="example.autoDismissDelay"
    :icon="example.variant"
    :variant="example.variant"
    style-alert="borderless shadowed outline info:info danger:danger warn:warn success:success invalid:danger valid:success"
  >
    Alert
  </v-alert>
<!-- CUT START -->
  <div class="flex justify-between items-center">
    <div class="mt-5">
      <label for="variant">Alert variant:</label>
      <v-select id="variant" v-model="example.variant">
        <option value="info">info</option>
        <option value="danger">danger</option>
        <option value="warn">warn</option>
        <option value="success">success</option>
        <option value="valid">valid</option>
        <option value="invalid">invalid</option>
      </v-select>
    </div>
    <div class="flex gap-4">
      <v-button :disabled="example.isVisible" @click="example.isVisible = true">
        Show alert
      </v-button>
    </div>
  </div>
  <v-tabs base="tabs-material" class="mt-5">
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
      variant: "info",
      icon: "info",
    });

    return {
      example,
    };
  },
};
</script>
