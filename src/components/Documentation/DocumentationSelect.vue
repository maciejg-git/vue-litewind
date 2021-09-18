<template>
  <h3>Select</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Events</h6>
    <p></p>
    <table-reference-basic :items="events"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <div>
        <v-select
          v-model="example.model"
          :type="example.type"
          :state="example.state"
          :options="options"
          class="w-52"
        >
        <template #options-prepend>
          <option value="option (prepend slot)">option (prepend slot)</option>
        </template>
        <option value="option (default slot)">option (default slot)</option>
        </v-select>
      </div>
      <div class="mt-4">
        <v-select
          v-model="example.modelMultiple"
          :type="example.type"
          :state="example.state"
          :options="options"
          :multiple="true"
          class="w-52"
        ></v-select>
      </div>
      <v-tabs name="tabs-material" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="model" class="font-semibold">v-model:</label>
            <v-input type="text" id="model" v-model="example.model"></v-input>
          </div>
          <div class="mb-2">
            <label for="model-multiple" class="font-semibold">
              v-model (multiple):
            </label>
            <v-input
              type="text"
              id="model-multiple"
              v-model="example.modelMultiple"
            ></v-input>
          </div>
          <div class="mb-2">
            <label for="state">state:</label>
            <v-select id="state" v-model="example.state">
              <option value="">normal (empty string)</option>
              <option value="valid">valid</option>
              <option value="invalid">invalid</option>
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
&lt;v-select
  v-model=&quot;example.model&quot;
  :type=&quot;example.type&quot;
  :state=&quot;example.state&quot;
  :options=&quot;options&quot;
  class=&quot;w-40&quot;
&gt;
  &lt;template #options-prepend&gt;
    &lt;option value=&quot;option (prepend slot)&quot;&gt;option (prepend slot)&lt;/option&gt;
  &lt;/template&gt;
  &lt;option value=&quot;option (default slot)&quot;&gt;option (default slot)&lt;/option&gt;
&lt;/v-select&gt;

&lt;v-select
  v-model=&quot;example.modelMultiple&quot;
  :type=&quot;example.type&quot;
  :state=&quot;example.state&quot;
  :options=&quot;options&quot;
  :multiple=&quot;true&quot;
  class=&quot;w-40&quot;
&gt;
&lt;/v-select&gt;
      </code>
    </pre>
    <pre>
      <code class="language-js">
let options = ref([
  {
    value: "option",
    label: "option",
  },
  {
    value: "option 2",
    label: "option 2",
  },
  {
    value: "option 3",
    label: "option 3",
  },
])
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
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Select v-model",
      },
      {
        prop: "options",
        type: ["Array"],
        default: "undefined",
        description:
          "Array of options to display in select element. Each option is <code class='code-word'>Object</code> with <code class='code-word'>value</code> and <code class='code-word'>label</code> properties. This prop is optional, you can use default slot to add options instead",
      },
      {
        prop: "state",
        type: ["String"],
        default: "empty string",
        description:
          "State of select validity. Supported values are 'valid', 'invalid' or 'empty string' for default state",
      },
      {
        prop: "name",
        type: ["String"],
        default: "select",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-select",
        description: "Main select element",
      },
    ]);

    let events = ref([
      {
        prop: "update:modelValue",
        description: "Update v-model",
      },
    ]);

    let slots = ref([
      {
        prop: "options-prepend",
        description: "Slot for additional options (added before options from options prop)",
      },
      {
        prop: "default",
        description: "Slot for additional options (added after options from options prop)",
      },
    ]);

    let example = reactive({
      model: "",
      modelMultiple: [],
      state: "",
      events: [],
    });

    let options = ref([
      {
        value: "option",
        label: "option",
      },
      {
        value: "option 2",
        label: "option 2",
      },
      {
        value: "option 3",
        label: "option 3",
      },
    ]);

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      styles,
      events,
      slots,
      example,
      options,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
