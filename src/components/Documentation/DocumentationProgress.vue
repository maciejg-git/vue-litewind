<template>
  <h3>Progress</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <v-table
      :items="reference"
      :definition="referenceDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:type="{ value }">
        <code class="code-word mx-1">
          {{ value }}
        </code>
      </template>
      <template #cell:default="{ value }">
        <code class="text-sm">{{ value }}</code>
      </template>
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>

    <h6>Styling props</h6>
    <p></p>
    <v-table
      :items="referenceStyles"
      :definition="referenceStylesDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>

    <h6>Slots</h6>
    <p></p>
    <v-table
      :items="referenceSlots"
      :definition="referenceSlotsDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <v-progress
        :value="+example.value"
        :max="+example.max"
        :label="example.label"
        :precision="+example.precision"
        :transition="example.transition"
      ></v-progress>
      <v-progress
        :value="+example.value"
        :max="+example.max"
        :label="example.label"
        :precision="+example.precision"
        :transition="example.transition"
        class="mt-4"
      >
        <template #default="{ value, max }">{{ value }} / {{ max }}</template>
      </v-progress>
      <v-progress
        :value="+example.value"
        :max="+example.max"
        :label="example.label"
        :precision="+example.precision"
        :transition="example.transition"
        style-progress="default tiny"
        style-progress-bar="default gradient"
        class="mt-4"
      ></v-progress>
      <v-tabs theme="material" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="value">value:</label>
            <v-input type="text" id="value" v-model="example.value"></v-input>
          </div>
          <div class="mb-2">
            <label for="max">max:</label>
            <v-input type="text" id="max" v-model="example.max"></v-input>
          </div>
          <div class="mb-2">
            <label for="precision">precision:</label>
            <v-input
              type="text"
              id="precision"
              v-model="example.precision"
            ></v-input>
          </div>
          <div class="mb-2">
            <label for="label">label:</label>
            <v-select id="label" v-model="example.label">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="transition">transition:</label>
            <v-select id="transition" v-model="example.transition">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
        </v-tab>
        <v-tab>
          <template #name>
            Events
            <v-badge style-badge="secondary tiny" class="ml-2">
              {{ example.events.length }}
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
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h4>Example indeterminate</h4>
    <div class="example">
      <v-progress
        style-progress="default tiny"
        style-progress-bar="default gradient"
        indeterminate
        :indeterminate-width="50"
        :indeterminate-timing="example.timing"
        class="mt-4"
      ></v-progress>
      <br />

      <v-card style-card="default shadow" width="400px">
        <div class="flex justify-center p-4">Checking for updates...</div>
        <v-progress
          style-progress="default tiny"
          style-progress-bar="default gradient"
          indeterminate
          :indeterminate-width="50"
          :indeterminate-timing="example.timing"
          class="m-2"
        ></v-progress>
      </v-card>
      <div class="mb-2 mt-10">
        <label for="label">indeterminate-timing:</label>
        <v-select id="label" v-model="example.timing">
          <option value="linear">linear</option>
          <option value="ease">ease</option>
        </v-select>
      </div>
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
  setup() {
    let reference = ref([
      {
        prop: "value",
        type: "Number",
        default: "undefined",
        description: "Current progress",
      },
      {
        prop: "max",
        type: "Number",
        default: "undefined",
        description: "Maximum value of progress",
      },
      {
        prop: "label",
        type: "Boolean",
        default: "false",
        description:
          "Display value on progress bar if true. Label can be customized via label slot",
      },
      {
        prop: "precision",
        type: "Number",
        default: "2",
        description:
          "Number of digits after dot in progress value, minimum = 0, maximum = 100",
      },
      {
        prop: "transition",
        type: "String",
        default: "true",
        description: "If true changes in value animates smoothly",
      },
      {
        prop: "indeterminate",
        type: "Boolean",
        default: "false",
        description:
          "Renders indeterminate progress bar. Note: value, max, label, precision and transition props are ignored if indeterminate is true",
      },
      {
        prop: "indeterminate-width",
        type: "Number",
        default: "75",
        description: "Width of indeterminate bar in %",
      },
      {
        prop: "name",
        type: "String",
        default: "progress",
        description: "Useful for setting alternative styles",
      },
      {
        prop: "theme",
        type: "String",
        default: "default",
        description: "Theme to use",
      },
    ]);

    let referenceDefinition = ref([
      {
        key: "prop",
        sortable: true,
        class: () => "whitespace-nowrap",
      },
      {
        key: "type",
        sortable: true,
      },
      {
        key: "default",
        class: () => "whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let referenceStyles = ref([
      {
        prop: "style-progress",
        description: "Main progress element",
      },
      {
        prop: "style-progress-bar",
        description: "Progress bar element",
      },
      {
        prop: "style-label",
        description: "Label on progress bar",
      },
    ]);

    let referenceStylesDefinition = ref([
      {
        key: "prop",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let referenceEvents = ref([
      {
        event: "update:modelValue",
        description: "Update v-model",
      },
    ]);

    let referenceEventsDefinition = ref([
      {
        key: "event",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let referenceSlots = ref([
      {
        slot: "default",
        description: "Slot for custom label",
      },
    ]);

    let referenceSlotsDefinition = ref([
      {
        key: "slot",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let referenceComponents = ref([
      {
        component: "-",
        description: "This component does not provide any child components.",
      },
    ]);

    let referenceComponentsDefinition = ref([
      {
        key: "component",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let example = reactive({
      value: 20,
      max: 100,
      label: false,
      precision: 2,
      transition: true,
      timing: "linear",
      width: "50",
      events: [],
    });

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      referenceDefinition,
      referenceStyles,
      referenceStylesDefinition,
      referenceEvents,
      referenceEventsDefinition,
      referenceSlots,
      referenceSlotsDefinition,
      referenceComponents,
      referenceComponentsDefinition,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
