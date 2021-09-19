<template>
  <h3>Radio</h3>
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
      <example-radio></example-radio>
    </div>
    <pre>
      <code class="language-html">
&lt;div class=&quot;flex items-center&quot;&gt;
  &lt;v-radio
    v-model=&quot;example.model&quot;
    :state=&quot;example.state&quot;
    value=&quot;option&quot;
    id=&quot;option&quot;
  &gt;&lt;/v-radio&gt;
  &lt;label for=&quot;option&quot; class=&quot;ml-3&quot;&gt;option&lt;/label&gt;
&lt;/div&gt;
&lt;div class=&quot;flex items-center&quot;&gt;
  &lt;v-radio
    v-model=&quot;example.model&quot;
    :state=&quot;example.state&quot;
    value=&quot;option 2&quot;
    id=&quot;option2&quot;
  &gt;&lt;/v-radio&gt;
  &lt;label for=&quot;option2&quot; class=&quot;ml-3&quot;&gt;option 2&lt;/label&gt;
&lt;/div&gt;
&lt;div class=&quot;flex items-center&quot;&gt;
  &lt;v-radio
    v-model=&quot;example.model&quot;
    :state=&quot;example.state&quot;
    value=&quot;option 3&quot;
    id=&quot;option3&quot;
  &gt;&lt;/v-radio&gt;
  &lt;label for=&quot;option3&quot; class=&quot;ml-3&quot;&gt;option 3&lt;/label&gt;
&lt;/div&gt;
      </code>
    </pre>
  </section>

  <section>
    <h4>Radio group</h4>
    <div class="example">
      <example-radio-group></example-radio-group>
    </div>
    <pre>
      <code v-pre class="language-html">
&lt;div v-for=&quot;l in languages&quot; class=&quot;flex items-center my-2&quot;&gt;
  &lt;v-radio
    v-model=&quot;languagesModel&quot;
    :value=&quot;l&quot;
    :state=&quot;
      languagesValidated
        ? languagesModel
          ? true
          : false
        : null
    &quot;
    :id=&quot;'language-' + l&quot;
  &gt;&lt;/v-radio&gt;
  &lt;label :for=&quot;'language-' + l&quot; class=&quot;ml-3&quot;&gt;
    {{ l }}
  &lt;/label&gt;
&lt;/div&gt;

&lt;div
  v-if=&quot;languagesValidated &amp;&amp; !languagesModel ? true : false&quot;
  class=&quot;text-red-500 mt-4&quot;
&gt;
  Please select the language.
&lt;/div&gt;

&lt;v-button
  @click=&quot;validate()&quot;
  style-button=&quot;default&quot;
  class=&quot;mt-5&quot;
&gt;
  Send
&lt;/v-button&gt;

&lt;div class=&quot;mt-5&quot;&gt;
  &lt;span class=&quot;font-semibold&quot;&gt;Language:&lt;/span&gt;
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

let languagesModel = ref("");
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
import ExampleRadio from "./examples/ExampleRadio.vue"
import ExampleRadioGroup from "./examples/ExampleRadioGroup.vue"

export default {
  components: {
    ExampleRadio,
    ExampleRadioGroup,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["String"],
        default: "undefined",
        description: "Radio v-model",
      },
      {
        prop: "state",
        type: ["String"],
        default: "empty string",
        description:
          "State of input validity. Supported values are 'valid', 'invalid' or 'empty string' for default state",
      },
      {
        prop: "name",
        type: ["String"],
        default: "radio",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-radio",
        description: "Main input element",
      },
    ]);

    let events = ref([
      {
        prop: "update:modelValue",
        description: "Update v-model",
      },
    ]);

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
