<template>
  <v-progress
    style-progress="tiny"
    style-progress-bar="gradient"
    indeterminate
    :indeterminate-width="50"
    :indeterminate-timing="example.timing"
    :indeterminate-speed="+example.speed"
    class="mt-4"
  ></v-progress>
  <br />

  <v-card style-card="shadow" width="400px">
    <div class="flex justify-center p-4">Checking for updates...</div>
    <v-progress
      style-progress="tiny"
      style-progress-bar="gradient"
      indeterminate
      :indeterminate-width="50"
      :indeterminate-timing="example.timing"
      :indeterminate-speed="+example.speed"
      class="m-2"
    ></v-progress>
  </v-card>

  <v-card style-card="shadow" width="400px" class="mt-6">
    <div class="flex justify-center p-4">
      <span v-if="example.indeterminate">Checking for updates...</span>
      <span v-if="!example.indeterminate">Updating...</span>
    </div>
    <v-progress
      style-progress="tiny"
      style-progress-bar="gradient"
      :value="example.indeterminateValue"
      :label="false"
      :indeterminate="example.indeterminate"
      :indeterminate-width="50"
      :indeterminate-timing="example.timing"
      :indeterminate-speed="+example.speed"
      class="m-2"
    ></v-progress>
  </v-card>
  <div class="my-4">Combined indeterminate and deteminate example</div>

  <div class="mb-2 mt-10">
    <label for="timing">indeterminate-timing:</label>
    <v-select id="timing" v-model="example.timing">
      <option value="linear">linear</option>
      <option value="ease">ease</option>
      <option value="ease-in">ease-in</option>
      <option value="ease-out">ease-out</option>
      <option value="ease-in-out">ease-in-out</option>
    </v-select>
  </div>
  <div class="mb-2">
    <label for="speed">indeterminate-speed:</label>
    <v-input type="text" id="speed" v-model="example.speed"></v-input>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";

export default {
  setup() {
    let example = reactive({
      value: 20,
      label: false,
      timing: "linear",
      width: "50",
      speed: 7,
      indeterminate: true,
      indeterminateValue: 0,
    });

    onMounted(() => {
      setInterval(() => {
        example.indeterminate = !example.indeterminate;
        example.indeterminateValue = 0;
        let i = setInterval(() => {
          example.indeterminateValue += 0.05;
          if (example.indeterminateValue >= 100) {
            clearInterval(i);
          }
        }, 2);
      }, 6000);
    });

    return {
      example,
    };
  },
};
</script>
