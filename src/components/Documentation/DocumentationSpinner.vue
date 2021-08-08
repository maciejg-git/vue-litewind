<template>
  <h3>Spinner</h3>
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
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <div>
        <v-spinner style-spinner="default blue small"></v-spinner>
        <v-spinner class="ml-2"></v-spinner>
        <v-spinner style-spinner="default blue" class="ml-2"></v-spinner>
        <v-spinner style-spinner="default yellow" class="ml-2"></v-spinner>
        <v-spinner style-spinner="default green" class="ml-2"></v-spinner>
        <v-spinner
          style-spinner="default yellow large"
          class="ml-2"
        ></v-spinner>
      </div>
      <div class="mt-4">
        <v-button style-button="default no-margin" class="mr-2">
          <v-spinner style-spinner="default gray small"></v-spinner>
          <span class="ml-2">Button</span>
        </v-button>
        <v-button style-button="default secondary no-margin">
          <v-spinner style-spinner="default green small"></v-spinner>
          <span class="ml-2">Button</span>
        </v-button>
      </div>
    </div>
    <pre>
      <code>
{{`<v-spinner style-spinner="default blue small"></v-spinner>
<v-spinner class="ml-2"></v-spinner>
<v-spinner style-spinner="default blue" class="ml-2"></v-spinner>
<v-spinner style-spinner="default yellow" class="ml-2"></v-spinner>
<v-spinner style-spinner="default green" class="ml-2"></v-spinner>
<v-spinner style-spinner="default yellow large" class="ml-2"></v-spinner>
<v-button>
  <v-spinner style-spinner="default gray small" class="mr-2"></v-spinner>
  Spinner in button
</v-button>
<v-button style-button="default secondary">
  <v-spinner style-spinner="default green small" class="mr-2"></v-spinner>
  Spinner in button
</v-button>`}}
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
        prop: "name",
        type: ["String"],
        default: "spinner",
        description: "Name of the component",
      },
      {
        prop: "theme",
        type: ["String"],
        default: "default",
        description: "Theme of the component",
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
        prop: "style-spinner",
        description: "Main spinner element",
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
        event: "-",
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
        slot: "-",
        description: "This component does not provide any slots.",
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

    let example = reactive({});

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
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
