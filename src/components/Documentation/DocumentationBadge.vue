<template>
  <h3>Badge</h3>
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
      <div>
        <v-badge style-badge="secondary" class="mr-4">
          New
          <v-badge style-badge="default tiny green" class="ml-2">7</v-badge>
        </v-badge>
        <v-badge class="mr-4">New</v-badge>
        <v-badge style-badge="default small yellow" class="mr-4">New</v-badge>
        <v-badge style-badge="default small green" class="mr-4">New</v-badge>
        <v-badge style-badge="default small" class="mr-4">New</v-badge>
        <v-badge style-badge="default tiny yellow" class="mr-4">New</v-badge>
        <v-badge style-badge="default tiny" class="mr-4">New</v-badge>
      </div>
      <div>
        <v-button style-button="default noMargin" class="relative mt-4">
          badge button
          <v-badge
            style-badge="primary tiny red"
            class="
              absolute
              top-0
              right-0
              transform
              -translate-y-1/2
              translate-x-1/2
            "
          >
            2
          </v-badge>
        </v-button>
      </div>
    </div>
    <pre>
      <code>
{{`<v-badge style-badge="default tiny">New</v-badge>
<v-badge style-badge="default tiny yellow">New</v-badge>
<v-badge style-badge="default small">New</v-badge>
<v-badge style-badge="default small green">New</v-badge>
<v-badge style-badge="default small yellow">New</v-badge>
<v-badge>New</v-badge>
<v-badge style-badge="secondary">
  New
  <v-badge style-badge="default tiny green">7</v-badge>
</v-badge>`}}
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
        default: "badge",
        description: "",
      },
      {
        prop: "theme",
        type: ["String"],
        default: "default",
        description: "",
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
        prop: "style-badge",
        description: "Main badge element",
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
        description: "Badge content",
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
