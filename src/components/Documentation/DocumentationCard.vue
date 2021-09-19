<template>
  <h3>Card</h3>
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
      <example-card></example-card>
    </div>
    <pre>
      <code class="language-html">
&lt;v-card width=&quot;320px&quot; style-card=&quot;shadow hoverable&quot;&gt;
  &lt;img :src=&quot;randomPhoto()&quot; alt=&quot;&quot; /&gt;
  &lt;header class=&quot;pt-3 px-3&quot;&gt;
    &lt;span class=&quot;font-semibold&quot;&gt;Example card&lt;/span&gt;
  &lt;/header&gt;
  &lt;header class=&quot;py-1 px-3&quot;&gt;
    &lt;span class=&quot;text-gray-500 text-sm&quot;&gt;Subtitle&lt;/span&gt;
  &lt;/header&gt;
  &lt;div class=&quot;p-3&quot;&gt;
    Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book.
  &lt;/div&gt;
  &lt;hr /&gt;
  &lt;div class=&quot;text-sm px-3 py-2&quot;&gt;Card footer&lt;/div&gt;
&lt;/v-card&gt;

&lt;v-card width=&quot;720px&quot; style-card=&quot;shadow hoverable&quot; style=&quot;height: 320px&quot; class=&quot;flex my-10&quot;&gt;
  &lt;img :src=&quot;randomPhotoHorizontal()&quot; alt=&quot;&quot; /&gt;
  &lt;div class=&quot;flex flex-col&quot;&gt;
  &lt;header class=&quot;pt-4 px-3&quot;&gt;
    &lt;span class=&quot;font-semibold&quot;&gt;Example card&lt;/span&gt;
  &lt;/header&gt;
  &lt;header class=&quot;py-1 px-3&quot;&gt;
    &lt;span class=&quot;text-gray-500 text-sm&quot;&gt;Subtitle&lt;/span&gt;
  &lt;/header&gt;
    &lt;div class=&quot;p-4&quot;&gt;
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book.
    &lt;/div&gt;
    &lt;hr class=&quot;w-10/12 mx-auto&quot;&gt;
    &lt;v-button style-button=&quot;small&quot; class=&quot;ml-auto mt-auto m-4&quot;&gt;Details&lt;/v-button&gt;
  &lt;/div&gt;
&lt;/v-card&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref } from "vue";
import ExampleCard from "./examples/ExampleCard.vue"

export default {
  components: {
    ExampleCard,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "width",
        type: ["String"],
        default: "undefined",
        description: "Width of the card",
      },
      {
        prop: "name",
        type: ["String"],
        default: "card",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-card",
        description: "Main card element",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for card content",
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
