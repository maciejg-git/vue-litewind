<template>
  <h3>Input</h3>
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
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <v-input
        v-model="example.model"
        :type="example.type"
        :state="example.state"
        placeholder="Input example"
      >
      </v-input>
      <v-tabs name="tabs-material" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="model" class="font-semibold">v-model:</label>
            <v-input type="text" id="model" v-model="example.model"></v-input>
          </div>
          <div class="mb-2">
            <label for="type">type:</label>
            <v-select id="type" v-model="example.type">
              <option value="text">text</option>
              <option value="password">password</option>
              <option value="email">email</option>
              <option value="number">number</option>
              <option value="search">search</option>
              <option value="time">time</option>
              <option value="url">url</option>
              <option value="color">color</option>
              <option value="date">date</option>
            </v-select>
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
&lt;v-input
  v-model=&quot;example.model&quot;
  :type=&quot;example.type&quot;
  :state=&quot;example.state&quot;
  placeholder=&quot;Input example&quot;
&gt;
&lt;/v-input&gt;
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
        description: "Input v-model",
      },
      {
        prop: "type",
        type: ["String"],
        default: "text",
        description: "Type of input element eg. text, password, search etc",
      },
      {
        prop: "state",
        type: ["String", "Boolean"],
        default: "empty string",
        description:
          "State of input validity. Supported values are 'valid' (or true), 'invalid' (or false) or 'empty string' (or null) for default state",
      },
      {
        prop: "name",
        type: ["String"],
        default: "input",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-input",
        description: "Main input element",
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
        prop: "helper",
        description: "Slot for helper text displayed below input element",
      },
      {
        prop: "invalid",
        description: "Slot for message if state is 'invalid'",
      },
    ]);

    let components = ref([
      {
        component: "-",
        description: "This component does not provide any child components.",
      },
    ]);

    let example = reactive({
      model: "",
      type: "text",
      state: "",
      events: [],
    });

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      styles,
      events,
      slots,
      components,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
