<template>
  <h3>Chevron</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
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
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import hljs from "highlight.js";

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "initial",
        type: ["String"],
        default: "down",
        description: "Initial direction of chevron/triangle. Valid values are: 'down', 'left' ,'right' and 'up'",
      },
      {
        prop: "rotate180",
        type: ["Boolean"],
        default: "false",
        description: "If true rotates chevron 180 degrees. Default is 90 degree",
      },
      {
        prop: "triangle",
        type: ["Boolean"],
        default: "false",
        description: "Use filled triangle instead of chevron",
      },
      {
        prop: "counter-clockwise",
        type: ["Boolean"],
        default: "false",
        description: "Rotate chevron/triangle counter-clockwise",
      },
      {
        prop: "switch",
        type: ["Boolean"],
        default: "false",
        description:
          "Flick this to rotate chevron/triangle to initial/rotated position",
      },
      {
        prop: "name",
        type: ["String"],
        default: "chevron",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-chevron",
        description: "Chevron element",
      },
    ]);

    let example = reactive({
      initial: "right",
      rotate180: false,
      triangle: false,
      counterClockwise: false,
      switch: false,
    });

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      styles,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
