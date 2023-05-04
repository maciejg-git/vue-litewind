<template>
  <v-button>
    Button
    <v-chevron
      :initial="example.initial"
      :rotate90="example.rotate90"
      :triangle="example.triangle"
      :clockwise="example.clockwise"
      :switch="example.switch"
      style-chevron="right"
    />
  </v-button>
  <!-- CUT START -->
  <v-tabs
    base="material-tabs"
    class="mt-5"
  >
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="initial">initial:</label>
          <v-select
            id="initial"
            inline
            v-model="example.initial"
            :items="['down', 'left', 'right', 'up']"
          ></v-select>
        </div>
        <div>
          <label for="rotate90">rotate90:</label>
          <v-select-prop
            id="rotate90"
            v-model="example.rotate90"
          ></v-select-prop>
        </div>
        <div>
          <label for="triangle">triangle:</label>
          <v-select-prop
            id="triangle"
            v-model="example.triangle"
          ></v-select-prop>
        </div>
        <div>
          <label for="clockwise">clockwise:</label>
          <v-select-prop
            id="clockwise"
            v-model="example.clockwise"
          ></v-select-prop>
        </div>
        <div>
          <label for="switch">switch:</label>
          <v-select-prop
            id="switch"
            v-model="example.switch"
          ></v-select-prop>
        </div>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script setup>
import { reactive } from "vue";

let example = reactive({
  initial: "right",
  rotate90: false,
  triangle: false,
  clockwise: false,
  switch: false,
});
</script>
