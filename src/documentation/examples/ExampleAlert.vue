<template>
  <!-- static alert -->

  <p class="my-6">Static alert</p>

  <v-alert
    :icon="example.variant"
    :variant="example.variant"
    style-alert="bold info:info danger:danger warn:warn success:success invalid:danger valid:success"
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
    style-alert="bold info:info danger:danger warn:warn success:success invalid:danger valid:success"
  >
    <template #icon>
      <v-icon
        :icon-type="example.variant"
        class="w-6 h-6 mr-2"
      ></v-icon>
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
    style-alert="bold marked shadowed outline info:info danger:danger warn:warn success:success invalid:danger valid:success"
  >
    Alert
  </v-alert>

  <p class="my-6">Styled alert</p>

  <v-alert
    v-model="example.isVisible"
    :dismissable="example.dismissable"
    :auto-dismiss-delay="example.autoDismissDelay"
    :icon="example.variant"
    :variant="example.variant"
    style-alert="bold light info:info danger:danger warn:warn success:success invalid:danger valid:success"
  >
    Alert
  </v-alert>
  <!-- CUT START -->
  <div class="flex justify-between mt-5">
    <div>
      <label for="variant">Alert variant:</label>
      <v-select
        id="variant"
        v-model="example.variant"
        inline
        :items="['info', 'danger', 'warn', 'success', 'valid', 'invalid']"
      ></v-select>
    </div>
    <div class="flex gap-4">
      <v-button
        :disabled="example.isVisible"
        @click="example.isVisible = true"
      >
        Show alert
      </v-button>
    </div>
  </div>
  <v-tabs
    base="material-tabs"
    class="mt-5"
  >
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label
            for="model"
            class="font-semibold"
          >
            v-model:
          </label>
          <v-input
            type="text"
            id="model"
            inline
            v-model="example.isVisible"
          ></v-input>
        </div>
        <div>
          <label for="dismissable">dismissable:</label>
          <v-select-prop
            id="dismissable"
            v-model="example.dismissable"
          ></v-select-prop>
        </div>
        <div>
          <label for="auto-dismiss-delay">auto-dismiss-delay:</label>
          <v-input
            type="text"
            id="auto-dismiss-delay"
            inline
            v-model="example.autoDismissDelay"
          ></v-input>
        </div>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script setup>
import { reactive } from "vue";

let example = reactive({
  isVisible: true,
  isVisibleAbsolute: false,
  dismissable: true,
  autoDismissDelay: 0,
  variant: "info",
  icon: "info",
});
</script>
