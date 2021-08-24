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
        <div class="space-y-1">
          <code v-for="v in value" class="code-word">
            {{ v }}
          </code>
        </div>
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
      <code class="language-html">
&lt;v-progress
  :value=&quot;+example.value&quot;
  :max=&quot;+example.max&quot;
  :label=&quot;example.label&quot;
  :precision=&quot;+example.precision&quot;
  :transition=&quot;example.transition&quot;
&gt;&lt;/v-progress&gt;

&lt;v-progress
  :value=&quot;+example.value&quot;
  :max=&quot;+example.max&quot;
  :label=&quot;example.label&quot;
  :precision=&quot;+example.precision&quot;
  :transition=&quot;example.transition&quot;
  class=&quot;mt-4&quot;
&gt;
  &lt;template #default=&quot;{ value, max }&quot;&gt;&#123;&#123; value &#125;&#125; / &#123;&#123; max &#125;&#125;&lt;/template&gt;
&lt;/v-progress&gt;

&lt;v-progress
  :value=&quot;+example.value&quot;
  :max=&quot;+example.max&quot;
  :label=&quot;example.label&quot;
  :precision=&quot;+example.precision&quot;
  :transition=&quot;example.transition&quot;
  style-progress=&quot;default tiny&quot;
  style-progress-bar=&quot;default gradient&quot;
  class=&quot;mt-4&quot;
&gt;&lt;/v-progress&gt;
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
        :indeterminate-speed="+example.speed"
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
          :indeterminate-speed="+example.speed"
          class="m-2"
        ></v-progress>
      </v-card>
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
    </div>
    <pre>
      <code class="language-html">
&lt;v-progress
  style-progress=&quot;default tiny&quot;
  style-progress-bar=&quot;default gradient&quot;
  indeterminate
  :indeterminate-width=&quot;50&quot;
  :indeterminate-timing=&quot;example.timing&quot;
  :indeterminate-speed=&quot;+example.speed&quot;
  class=&quot;mt-4&quot;
&gt;&lt;/v-progress&gt;

&lt;v-card style-card=&quot;default shadow&quot; width=&quot;400px&quot;&gt;
  &lt;div class=&quot;flex justify-center p-4&quot;&gt;Checking for updates...&lt;/div&gt;
  &lt;v-progress
    style-progress=&quot;default tiny&quot;
    style-progress-bar=&quot;default gradient&quot;
    indeterminate
    :indeterminate-width=&quot;50&quot;
    :indeterminate-timing=&quot;example.timing&quot;
    :indeterminate-speed=&quot;+example.speed&quot;
    class=&quot;m-2&quot;
  &gt;&lt;/v-progress&gt;
&lt;/v-card&gt;
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
        type: ["Number"],
        default: "undefined",
        description: "Current progress",
      },
      {
        prop: "max",
        type: ["Number"],
        default: "undefined",
        description: "Maximum value of progress",
      },
      {
        prop: "label",
        type: ["Boolean"],
        default: "false",
        description:
          "Display value on progress bar if true. Label can be customized via label slot",
      },
      {
        prop: "precision",
        type: ["Number"],
        default: "2",
        description:
          "Number of digits after dot in progress value, minimum = 0, maximum = 100",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "true",
        description: "Add smooth animation when value change",
      },
      {
        prop: "indeterminate",
        type: ["Boolean"],
        default: "false",
        description:
          "Renders indeterminate progress bar. <span class='font-semibold'>Note</span>: value, max, label, precision and transition props are ignored if indeterminate is true",
      },
      {
        prop: "indeterminate-width",
        type: ["Number"],
        default: "50",
        description: "Width of indeterminate bar in %",
      },
      {
        prop: "indeterminate-timing",
        type: ["String"],
        default: "linear",
        description:
          "Value of animation-timing-function property. Valid values are: 'linear', 'ease', 'ease-in', 'ease-out' or 'ease-in-out'",
      },
      {
        prop: "indeterminate-speed",
        type: ["Number"],
        default: "7",
        description:
          "Speed of indeterminate bar animation (1 - 20)",
      },
      {
        prop: "name",
        type: ["String"],
        default: "progress",
        description: "Name of the component",
      },
      {
        prop: "theme",
        type: ["String"],
        default: "default",
        description: "Name of the theme to apply to component",
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
      speed: 7,
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
