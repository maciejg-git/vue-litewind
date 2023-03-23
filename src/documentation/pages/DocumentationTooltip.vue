<template>
  <h3>Tooltip</h3>

  <section>
    <h4>Usage</h4>
    <p>
      To show tooltip when hovering over html element use the
      <code class="code-text">v-tooltip</code>
      directive. There are three possible ways to set directive value:
      <code class="code-text">string</code>
      ,
      <code class="code-text">function</code>
      or
      <code class="code-text">object</code>
      :
    </p>
    <v-code
      language="html"
      :code="codeStringDirective"
    ></v-code>
    <v-code
      language="html"
      :code="codeFunctionDirective"
    ></v-code>
    <v-code
      language="html"
      :code="codeObjectDirective"
    ></v-code>
    <p>If value is an object additional options can be set:</p>
    <v-code
      language="html"
      :code="codeObjectDirectiveDetails"
    ></v-code>
  </section>

  <section>
    <h4>Tooltip options reference</h4>
    <table-reference :items="reference"></table-reference>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <p class="my-6">Default tooltip:</p>
      <example name="ExampleTooltipSimple"></example>
    </div>

    <div class="example">
      <p class="my-6">Tooltip placement:</p>
      <example name="ExampleTooltipPlacement"></example>
    </div>

    <div class="example">
      <p class="my-6">Tooltip delay:</p>
      <example name="ExampleTooltipDelay"></example>
    </div>

    <div class="example">
      <p class="my-6">Tooltip content source:</p>
      <example name="ExampleTooltipContent"></example>
    </div>

    <div class="example">
      <p class="my-6">Tooltip animation:</p>
      <example name="ExampleTooltipAnimation"></example>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let reference = ref([
      {
        prop: "placement",
        type: ["String"],
        default: "'bottom'",
        description:
          "Position of the tooltip. Valid values are the same as placement values in FloatingUI",
      },
      {
        prop: "autoPlacement",
        type: ["Boolean"],
        default: false,
        description:
          "Calculates best placement for tooltip based on available space.",
      },
      {
        prop: "flip",
        type: ["Boolean"],
        default: true,
        description:
          "Changes the placement of the tooltip in order to keep it in view",
      },
      {
        prop: "delay",
        type: ["Number"],
        default: "50",
        description: "Delay before showing and hiding tooltip",
      },
      {
        prop: "offsetX",
        type: ["Number"],
        default: "0",
        description: "Offset of tooltip element relative to bound element.",
      },
      {
        prop: "offsetY",
        type: ["Number"],
        default: "0",
        description: "Offset of tooltip element relative to bound element.",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade",
        description:
          "Use animation when showing or hiding tooltip. Valid values are: 'fade', 'scale-fade' or empty string",
      },
      {
        prop: "text",
        type: ["String", "Function"],
        default: "undefined",
        description:
          "Defines text to display inside tooltip. If text is `undefined` then `data-title` attribute of reference element is used as content for tooltip",
      },
    ]);

    let referenceValue = ref([
      {
        value: "tooltip content",
        description:
          "Tooltip content can be a string or a function. Altenatively you can set content using data-tooltip attribute of directive element",
      },
    ]);

    let referenceValueDefinition = ref([
      {
        key: "value",
        label: "Directive value",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let codeStringDirective = `<button v-tooltip="'Tooltip text'">Button</button>`;

    let codeFunctionDirective = `<button v-tooltip="() => 'Tooltip text'">Button</button>`;

    let codeObjectDirective = `<button v-tooltip="{ text: 'Tooltip text' }">Button</button>`;

    let codeObjectDirectiveDetails = `<button v-tooltip="{ 
  placement: string,
  offsetX: number,
  offsetY: number,
  flip: boolean,
  delay: number,
  autoPlacement: boolean,
  transition: string,
  inline: boolean,
  text: string | function | undefined,
}">
  Button
</button>`;

    return {
      reference,
      referenceValue,
      referenceValueDefinition,
      codeStringDirective,
      codeFunctionDirective,
      codeObjectDirective,
      codeObjectDirectiveDetails,
    };
  },
};
</script>

<style scoped></style>
