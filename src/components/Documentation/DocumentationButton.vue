<template>
  <h3>Button</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="slots"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-button></example-button>
    </div>
    <pre>
      <code class="language-html">
&lt;v-button&gt;Button&lt;/v-button&gt;
&lt;v-button tag=&quot;a&quot;&gt;Button (link)&lt;/v-button&gt;

&lt;v-button style-button=&quot;large&quot;&gt;Large button&lt;/v-button&gt;
&lt;v-button style-button=&quot;&quot;&gt;Normal button&lt;/v-button&gt;
&lt;v-button style-button=&quot;small&quot;&gt;Small button&lt;/v-button&gt;
&lt;v-button style-button=&quot;tiny&quot;&gt;Tiny button&lt;/v-button&gt;

&lt;v-button style-button=&quot;secondary&quot;&gt;Secondary button&lt;/v-button&gt;
&lt;v-button style-button=&quot;yellow&quot;&gt;Yellow button&lt;/v-button&gt;
&lt;v-button style-button=&quot;green&quot;&gt;Green button&lt;/v-button&gt;
&lt;v-button style-button=&quot;red&quot;&gt;Red button&lt;/v-button&gt;

&lt;v-button style-button=&quot;square&quot;&gt;Square button&lt;/v-button&gt;
&lt;v-button style-button=&quot;pill&quot;&gt;Pill button&lt;/v-button&gt;
&lt;v-button style-button=&quot;uppercase&quot;&gt;Uppercase button&lt;/v-button&gt;

&lt;v-button block&gt;Block button&lt;/v-button&gt;

&lt;v-button disabled&gt;Button (disabled)&lt;/v-button&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleButton from "./examples/ExampleButton.vue"

export default {
  components: {
    ExampleButton,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "tag",
        type: ["String"],
        default: "button",
        description: "Tag of button element. Valid values are: 'button' or 'a'",
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
    ]);

    let styles = ref([
      {
        prop: "style-button",
        description: "Main button element",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for button content",
      },
    ]);

    return {
      reference,
      styles,
      slots,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
