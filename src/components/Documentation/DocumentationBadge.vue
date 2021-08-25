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
      <div class="mt-10">
        <v-button style-button="default no-margin" class="relative mr-6">
          badge button
          <v-badge position="top-right" style-badge="primary tiny red">
            2
          </v-badge>
        </v-button>
        <v-button style-button="default no-margin" class="relative mr-6">
          badge button
          <v-badge position="top-right" style-badge="circle red"></v-badge>
        </v-button>
      </div>
      <div class="mt-10">
        <v-button style-button="default no-margin" class="relative">
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
            9
          </v-badge>
        </v-button>
      </div>
    </div>
    <pre>
      <code class="language-html">
&lt;v-badge style-badge=&quot;secondary&quot; class=&quot;mr-4&quot;&gt;
  New
  &lt;v-badge style-badge=&quot;default tiny green&quot; class=&quot;ml-2&quot;&gt;7&lt;/v-badge&gt;
&lt;/v-badge&gt;
&lt;v-badge class=&quot;mr-4&quot;&gt;New&lt;/v-badge&gt;
&lt;v-badge style-badge=&quot;default small yellow&quot; class=&quot;mr-4&quot;&gt;New&lt;/v-badge&gt;
&lt;v-badge style-badge=&quot;default small green&quot; class=&quot;mr-4&quot;&gt;New&lt;/v-badge&gt;
&lt;v-badge style-badge=&quot;default small&quot; class=&quot;mr-4&quot;&gt;New&lt;/v-badge&gt;
&lt;v-badge style-badge=&quot;default tiny yellow&quot; class=&quot;mr-4&quot;&gt;New&lt;/v-badge&gt;
&lt;v-badge style-badge=&quot;default tiny&quot; class=&quot;mr-4&quot;&gt;New&lt;/v-badge&gt;

&lt;v-button style-button=&quot;default no-margin&quot; class=&quot;relative mr-4&quot;&gt;
  badge button
  &lt;v-badge position=&quot;top-right&quot; style-badge=&quot;primary tiny red&quot;&gt;
    2
  &lt;/v-badge&gt;
&lt;/v-button&gt;

&lt;v-button style-button=&quot;default no-margin&quot; class=&quot;relative mr-4&quot;&gt;
  badge button
  &lt;v-badge position=&quot;top-right&quot; style-badge=&quot;circle red&quot;&gt;
  &lt;/v-badge&gt;
&lt;/v-button&gt;

&lt;v-button style-button=&quot;default no-margin&quot; class=&quot;relative&quot;&gt;
  badge button
  &lt;v-badge
    style-badge=&quot;primary tiny red&quot;
    class=&quot;absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2&quot;
  &gt;
    9
  &lt;/v-badge&gt;
&lt;/v-button&gt;
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
        prop: "position",
        type: ["String"],
        default: "empty string",
        description:
          "Position of badge. Valid values are 'top-right', 'top-left', 'bottom-right', 'bottom-left'. If position is set to any of those values badge is absolute positioned in the corner of parent element (parent element must be positioned as relative)",
      },
      {
        prop: "name",
        type: ["String"],
        default: "badge",
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
        description: "Slot for badge content",
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
