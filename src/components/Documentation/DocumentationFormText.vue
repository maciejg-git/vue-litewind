<template>
  <h3>Form text helper</h3>
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
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
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
      <div class="example">
        <v-input
          v-model="name"
          :state="nameValidated ? (name.length > 0 ? true : false) : null"
          class="mr-4"
        ></v-input>
        <v-form-text
          :state="nameValidated ? (name.length > 0 ? true : false) : null"
          :inline="example.inline"
          :always-visible="example.alwaysVisible"
        >
          This field cannot be empty.
        </v-form-text>

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
          :always-visible="example.alwaysVisible"
        >
          Please select at least 3 languages.
        </v-form-text>
        <v-button @click="validate()" style-button="" class="mt-5">
          Send
        </v-button>
        <v-button @click="reset()" name="button-link" class="mt-5 ml-4">
          <span class="font-semibold">Reset</span>
        </v-button>
        <div class="mt-5">
          <span class="font-semibold">Languages:</span>
          {{ languagesModel }}
        </div>
      </div>
      <pre>
      <code v-pre class="language-html">
      </code>
    </pre>
      <pre>
      <code class="language-js">
      </code>
    </pre>
      <v-tabs name="tabs-material" class="mt-5">
        <v-tab name="Props">
          <div class="mt-5">
            <div class="mb-2">
              <label for="inline">inline:</label>
              <v-select id="inline" v-model="example.inline">
                <option :value="true">true</option>
                <option :value="false">false</option>
              </v-select>
            </div>
            <div class="mb-2">
              <label for="always-visible">always-visible:</label>
              <v-select id="always-visible" v-model="example.alwaysVisible">
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
        prop: "state",
        type: "String",
        default: "empty string",
        description:
          "Current state. Most useful if form text uses the same state as input.",
      },
      {
        prop: "inline",
        type: "Boolean",
        default: "false",
        description: "Inline version of form text. Default is block.",
      },
      {
        prop: "always-visible",
        type: "Boolean",
        default: "false",
        description:
          "Makes form text always visible even if it is in default/normal state",
      },
      {
        prop: "name",
        type: "String",
        default: "form-text",
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
        prop: "style-form-text",
        description: "Text element",
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
        description: "Slot for text",
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
      inline: false,
      alwaysVisible: false,
    });

    let languages = ref([
      "english",
      "swedish",
      "korean",
      "german",
      "icelandic",
      "japanese",
    ]);

    let name = ref("");
    let languagesModel = ref([]);
    let languagesValidated = ref(false);
    let nameValidated = ref(false);

    let validate = () => {
      languagesValidated.value = true;
      nameValidated.value = true;
    };

    let reset = () => {
      languagesValidated.value = false;
      nameValidated.value = false;
      languagesModel.value = [];
      name.value = "";
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
      reset,
      languagesModel,
      name,
      languagesValidated,
      nameValidated,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
