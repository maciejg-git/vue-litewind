<template>
  <h3>Checkbox</h3>
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
    <example-checkbox></example-checkbox>
    </div>
    <pre>
      <code class="language-html">
&lt;div class=&quot;flex items-center&quot;&gt;
  &lt;v-checkbox
    v-model=&quot;example.model&quot;
    :state=&quot;example.state&quot;
    id=&quot;example&quot;
  &gt;&lt;/v-checkbox&gt;
  &lt;label for=&quot;example&quot; class=&quot;ml-3&quot;&gt;Example checkbox&lt;/label&gt;
&lt;/div&gt;
      </code>
    </pre>
  </section>

  <section>
    <h4>Checkbox group</h4>
    <div class="example">
      <example-checkbox-group></example-checkbox-group>
    </div>
    <pre>
      <code v-pre class="language-html">
&lt;div v-for=&quot;l in languages&quot; class=&quot;flex items-center my-2&quot;&gt;
  &lt;v-checkbox
    v-model=&quot;languagesModel&quot;
    :value=&quot;l&quot;
    :state=&quot;
      languagesValidated
        ? languagesModel.length &gt;= 3
          ? true
          : false
        : null
    &quot;
    :id=&quot;'language-' + l&quot;
  &gt;&lt;/v-checkbox&gt;
  &lt;label :for=&quot;'language-' + l&quot; class=&quot;ml-3&quot;&gt;
    {{ l }}
  &lt;/label&gt;
&lt;/div&gt;

&lt;div
  v-if=&quot;languagesValidated &amp;&amp; languagesModel.length &lt; 3 ? true : false&quot;
  class=&quot;text-red-500 mt-4&quot;
&gt;
  Please select at least 3 languages.
&lt;/div&gt;

&lt;v-button
  @click=&quot;validate()&quot;
  style-button=&quot;default&quot;
  class=&quot;mt-5&quot;
&gt;
  Send
&lt;/v-button&gt;

&lt;div class=&quot;mt-5&quot;&gt;
  &lt;span class=&quot;font-semibold&quot;&gt;Languages:&lt;/span&gt;
  {{ languagesModel }}
&lt;/div&gt;
      </code>
    </pre>
    <pre>
      <code class="language-js">
let languages = ref([
  "english",
  "swedish",
  "korean",
  "german",
  "icelandic",
  "japanese",
]);

let languagesModel = ref([]);
let languagesValidated = ref(false);

let validate = () => {
  languagesValidated.value = true;
};
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import ExampleCheckbox from "./examples/ExampleCheckbox.vue"
import ExampleCheckboxGroup from "./examples/ExampleCheckboxGroup.vue"
import hljs from "highlight.js";

export default {
  components: {
    ExampleCheckbox,
    ExampleCheckboxGroup,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Checkbox v-model",
      },
      {
        prop: "state",
        type: ["String"],
        default: "empty string",
        description:
          "State of input validity. Supported values are 'valid' (or true), 'invalid' (or false) or 'empty string' (or null) for default state",
      },
      {
        prop: "name",
        type: ["String"],
        default: "checkbox",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-checkbox",
        description: "Main input element",
      },
    ]);

    let events = ref([
      {
        prop: "update:modelValue",
        description: "Update v-model",
      },
    ]);

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      styles,
      events,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
