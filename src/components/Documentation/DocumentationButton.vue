<template>
  <h3>Button</h3>
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
        <v-button>Button</v-button>
        <v-button tag="a">Button (link)</v-button>
      </div>
      <div class="mt-4">
        <v-button style-button="primary large">Large button</v-button>
        <v-button style-button="primary">Normal button</v-button>
        <v-button style-button="primary small">Small button</v-button>
        <v-button style-button="primary tiny">Tiny button</v-button>
      </div>
      <div class="mt-4">
        <v-button style-button="secondary">Secondary button</v-button>
        <v-button style-button="default yellow">Yellow button</v-button>
        <v-button style-button="default green">Green button</v-button>
        <v-button style-button="default red">Red button</v-button>
      </div>
      <div class="mt-4">
        <v-button style-button="primary square">Square button</v-button>
        <v-button style-button="primary pill">Pill button</v-button>
        <v-button style-button="primary uppercase">Uppercase button</v-button>
      </div>
      <div class="mt-4">
        <v-button block>Block button</v-button>
      </div>
      <div class="mt-4">
        <v-button disabled>Button (disabled)</v-button>
      </div>
    </div>
    <pre>
      <code>
{{`<v-button>Button</v-button>
<v-button tag="a">Button (link)</v-button>

<v-button style-button="secondary">Button</v-button>
<v-button style-button="primary small">Small button</v-button>
<v-button style-button="primary tiny">Tiny button</v-button>

<v-button style-button="secondary square">Square button</v-button>
<v-button style-button="primary pill">Pill button</v-button>
<v-button style-button="primary uppercase">Uppercase button</v-button>

<v-button block>Block button</v-button>
<v-button disabled>Button (disabled)</v-button>`}}
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
        prop: "tag",
        type: ["String"],
        default: "button",
        description: "Tag of button element. Valid values are: 'button', 'a'",
      },
      {
        prop: "disabled",
        type: ["Boolean"],
        default: "false",
        description: "Displays button in disabled state",
      },
      {
        prop: "block",
        type: ["Boolean"],
        default: "false",
        description: "Displays button as full width block",
      },
      {
        prop: "name",
        type: ["String"],
        default: "button",
        description: "Name of the component",
      },
      {
        prop: "theme",
        type: ["String"],
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
        prop: "style-button",
        description: "Main button element",
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
        description: "Button content",
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
