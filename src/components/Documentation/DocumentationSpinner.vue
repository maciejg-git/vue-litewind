<template>
  <h3>Spinner</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>
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

    let styles = ref([
      {
        prop: "style-spinner",
        description: "Main spinner element",
      },
    ]);

    let events = ref([
      {
        event: "-",
        description: "Update v-model",
      },
    ]);

    let slots = ref([
      {
        slot: "-",
        description: "This component does not provide any slots.",
      },
    ]);

    let example = reactive({});

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      styles,
      events,
      slots,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
