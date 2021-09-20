<template>
      <v-button>
        Button
        <v-chevron
          :initial="example.initial"
          :rotate180="example.rotate180"
          :triangle="example.triangle"
          :counter-clockwise="example.counterClockwise"
          :switch="example.switch"
          style-chevron="right"
        />
      </v-button>

      <v-tabs name="tabs-material" class="mt-5">
        <v-tab name="Props">
          <div class="mt-5">
            <div class="mb-2">
              <label for="initial">initial:</label>
              <v-select id="initial" v-model="example.initial">
                <option value="down">down</option>
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="up">up</option>
              </v-select>
            </div>
            <div class="mb-2">
              <label for="rotate180">rotate180:</label>
              <v-select id="rotate180" v-model="example.rotate180">
                <option :value="true">true</option>
                <option :value="false">false</option>
              </v-select>
            </div>
            <div class="mb-2">
              <label for="triangle">triangle:</label>
              <v-select id="triangle" v-model="example.triangle">
                <option :value="true">true</option>
                <option :value="false">false</option>
              </v-select>
            </div>
            <div class="mb-2">
              <label for="counter-clockwise">counter-clockwise:</label>
              <v-select
                id="counter-clockwise"
                v-model="example.counterClockwise"
              >
                <option :value="true">true</option>
                <option :value="false">false</option>
              </v-select>
            </div>
            <div class="mb-2">
              <label for="switch">switch:</label>
              <v-select id="switch" v-model="example.switch">
                <option :value="true">true</option>
                <option :value="false">false</option>
              </v-select>
            </div>
          </div>
        </v-tab>
      </v-tabs>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      initial: "right",
      rotate180: false,
      triangle: false,
      counterClockwise: false,
      switch: false,
    });

    return {
      example,
    };
  },
};
</script>
