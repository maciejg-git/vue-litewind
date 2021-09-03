<template>
  <h3>Spinner</h3>
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
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <div>
        <v-spinner style-spinner="blue small" class="mr-10"></v-spinner>
        <v-spinner style-spinner="green" class="mr-10"></v-spinner>
        <v-spinner
          style-spinner="yellow large"
          class="mr-4"
        ></v-spinner>
      </div>
        <div class="mt-10">
        <v-spinner thickness="0.07" class="mr-4"></v-spinner>
        <v-spinner thickness="0.2" style-spinner="yellow" class="mr-4"></v-spinner>
        <v-spinner thickness="0.35" style-spinner="green" class="mr-4"></v-spinner>
        </div>
        <div class="mt-10">
        <v-spinner speed="0.6" style-spinner="blue" class="mr-4"></v-spinner>
        <v-spinner speed="1.0" style-spinner="green" class="mr-4"></v-spinner>
        <v-spinner speed="1.5" style-spinner="yellow" class="mr-4"></v-spinner>
        </div>
      <div class="mt-10">
        <v-button class="mr-2">
          <v-spinner style-spinner="gray small"></v-spinner>
          <span class="ml-2">Button</span>
        </v-button>
        <v-button style-button="secondary">
          <v-spinner style-spinner="green small"></v-spinner>
          <span class="ml-2">Button</span>
        </v-button>
      </div>
    </div>
    <pre>
      <code class="language-html">
  &lt;v-spinner style-spinner=&quot;blue small&quot; class=&quot;mr-10&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner style-spinner=&quot;green&quot; class=&quot;mr-10&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner
    style-spinner=&quot;yellow large&quot;
    class=&quot;mr-4&quot;
  &gt;&lt;/v-spinner&gt;

  &lt;v-spinner thickness=&quot;0.07&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner thickness=&quot;0.2&quot; style-spinner=&quot;yellow&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner thickness=&quot;0.35&quot; style-spinner=&quot;green&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner speed=&quot;0.6&quot; style-spinner=&quot;blue&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner speed=&quot;1.0&quot; style-spinner=&quot;green&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;
  &lt;v-spinner speed=&quot;1.5&quot; style-spinner=&quot;yellow&quot; class=&quot;mr-4&quot;&gt;&lt;/v-spinner&gt;

  &lt;v-button class=&quot;mr-2&quot;&gt;
    &lt;v-spinner style-spinner=&quot;gray small&quot;&gt;&lt;/v-spinner&gt;
    &lt;span class=&quot;ml-2&quot;&gt;Button&lt;/span&gt;
  &lt;/v-button&gt;
  &lt;v-button style-button=&quot;secondary&quot;&gt;
    &lt;v-spinner style-spinner=&quot;green small&quot;&gt;&lt;/v-spinner&gt;
    &lt;span class=&quot;ml-2&quot;&gt;Button&lt;/span&gt;
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
        prop: "thickness",
        type: ["String"],
        default: "0.15",
        description: "Thickness of spinner in em units",
      },
      {
        prop: "speed",
        type: ["String"],
        default: "0.75",
        description: "Speed of spinner in seconds",
      },
      {
        prop: "name",
        type: ["String"],
        default: "spinner",
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
