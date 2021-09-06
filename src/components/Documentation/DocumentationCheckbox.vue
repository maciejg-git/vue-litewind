<template>
  <h3>Checkbox</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <v-table
      :items="reference"
      :definition="referenceDefinition"
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
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
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
    >
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>

    <h6>Events</h6>
    <p></p>
    <v-table
      :items="referenceEvents"
      :definition="referenceEventsDefinition"
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
    >
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <div class="flex items-center">
        <v-checkbox
          v-model="example.model"
          :state="example.state"
          id="example"
        ></v-checkbox>
        <label for="example" class="ml-3">Example checkbox</label>
      </div>
      <v-tabs name="tabs-material" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="model" class="font-semibold">v-model:</label>
            <v-input type="text" id="model" v-model="example.model"></v-input>
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
      <div v-for="l in languages" class="flex items-center my-2">
        <v-checkbox
          v-model="languagesModel"
          :value="l"
          :state="
            languagesValidated
              ? languagesModel.length >= 3
                ? true
                : false
              : null
          "
          :id="'language-' + l"
        ></v-checkbox>
        <label :for="'language-' + l" class="ml-3">
          {{ l }}
        </label>
      </div>
      <v-form-text
        :state="
          languagesValidated
            ? languagesModel.length >= 3
              ? true
              : false
            : null
        "
      >
        Please select at least 3 languages.
      </v-form-text>
      <v-button @click="validate()" style-button="default" class="mt-5">
        Send
      </v-button>
      <div class="mt-5">
        <span class="font-semibold">Languages:</span>
        {{ languagesModel }}
      </div>
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
import hljs from "highlight.js";

export default {
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
        prop: "style-checkbox",
        description: "Main input element",
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
        slot: "helper",
        description: "Slot for helper text displayed below input element",
      },
      {
        slot: "invalid",
        description: "Slot for message if state is 'invalid'",
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
      model: true,
      state: "",
      events: [],
    });

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
      languages,
      validate,
      languagesModel,
      languagesValidated,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
