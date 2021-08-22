<template>
  <h3>Tooltip</h3>
  <p></p>

  <section>
    <h4>Usage</h4>
    <p>To show tooltip when hovering over html element use the following directive:</p>
    <p class="font-semibold ml-4">
      v-tooltip.modifier1.modifier2="'Tooltip text' or function that returns tooltip
      text"
    </p>
    <p>Modifiers can be in any order.</p>
  </section>

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

    <p></p>
    <v-table
      :items="referenceValue"
      :definition="referenceValueDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:description="{ value }"
        ><span v-html="value"></span
      ></template>
    </v-table>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example flex">
      <div>
        <div class="mb-10">
          <v-button v-tooltip.bottom.delay100.oY5="'This is tooltip'">
            Hover me
          </v-button>
        </div>
        <div class="mb-10">
          <v-button v-tooltip.top.delay100.oY5="'This is tooltip on the top'">
            Hover me (tooltip on top)
          </v-button>
          <v-button v-tooltip.right.delay100.oY5="'This is tooltip on the right'">
            Hover me (tooltip on right)
          </v-button>
        </div>
        <div class="mb-10">
          <v-button v-tooltip.bottom.delay500.oY5="'This is delayed tooltip'">
            Hover me (long delay)
          </v-button>
          <v-button v-tooltip.bottom.delay0.oY5="'This tooltip apears instantaneously'">
            Hover me (no delay)
          </v-button>
        </div>
        <div class="mb-10">
          <v-button v-tooltip.bottom.delay100.oY5="() => 'Dynamic content ' + (Math.random() * 100).toFixed(0)">
            Hover me (dynamic content)
          </v-button>
          <v-button
            v-tooltip.bottom.delay100.oY5
            data-title="This tooltip has content from data-title attribute"
          >
            Hover me (data title attribute)
          </v-button>
        </div>
        <div>
          <v-button v-tooltip.bottom.delay100.oY5.nofade="'This is nofade tooltip'">
            Hover me (no animation tooltip)
          </v-button>
        </div>
      </div>
    </div>
    <pre>
      <code class="language-html">
&lt;div class=&quot;mb-10&quot;&gt;
  &lt;v-button v-tooltip.bottom.delay100.oY5=&quot;'This is tooltip'&quot;&gt;
    Hover me
  &lt;/v-button&gt;
&lt;/div&gt;

&lt;div class=&quot;mb-10&quot;&gt;
  &lt;v-button v-tooltip.top.delay100.oY5=&quot;'This is tooltip on the top'&quot;&gt;
    Hover me (tooltip on top)
  &lt;/v-button&gt;
  &lt;v-button v-tooltip.right.delay100.oY5=&quot;'This is tooltip on the right'&quot;&gt;
    Hover me (tooltip on right)
  &lt;/v-button&gt;
&lt;/div&gt;

&lt;div class=&quot;mb-10&quot;&gt;
  &lt;v-button v-tooltip.bottom.delay500.oY5=&quot;'This is delayed tooltip'&quot;&gt;
    Hover me (long delay)
  &lt;/v-button&gt;
  &lt;v-button v-tooltip.bottom.delay0.oY5=&quot;'This tooltip apears instantaneously'&quot;&gt;
    Hover me (no delay)
  &lt;/v-button&gt;
&lt;/div&gt;

&lt;div class=&quot;mb-10&quot;&gt;
  &lt;v-button v-tooltip.bottom.delay100.oY5=&quot;() =&gt; 'Dynamic content ' + (Math.random() * 100).toFixed(0)&quot;&gt;
    Hover me (dynamic content)
  &lt;/v-button&gt;
  &lt;v-button
    v-tooltip.bottom.delay100.oY5
    data-title=&quot;This tooltip has content from data-title attribute&quot;
  &gt;
    Hover me (data title attribute)
  &lt;/v-button&gt;
&lt;/div&gt;

&lt;div&gt;
  &lt;v-button v-tooltip.bottom.delay100.oY5.nofade=&quot;'This is nofade tooltip'&quot;&gt;
    Hover me (no animation tooltip)
  &lt;/v-button&gt;
&lt;/div&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import tooltip from "../../directives/tooltip.js";
import hljs from "highlight.js";

export default {
  directives: {
    tooltip,
  },
  setup(props) {
    let reference = ref([
      {
        modifier: "position",
        default: "bottom-start",
        description:
          "Position of the tooltip. Valid values are the same as placement values in Popperjs",
      },
      {
        modifier: "d[miliseconds]",
        default: "50",
        description: "Delay before showing and hiding tooltip",
      },
      {
        modifier: "oX[pixels]",
        default: "0",
        description:
          "Offset of tooltip element relative to bound element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
      },
      {
        modifier: "oY[pixels]",
        default: "0",
        description:
          "Offset of tooltip element relative to bound element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
      },
      {
        modifier: "nofade",
        default: "",
        description:
          "Disables fade animation when showing or hiding tooltip",
      },
    ]);

    let referenceDefinition = ref([
      {
        key: "modifier",
        sortable: true,
        class: () => "whitespace-nowrap",
      },
      {
        key: "default",
        class: () => "whitespace-nowrap",
      },
      {
        key: "description",
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

    let example = reactive({});

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      referenceDefinition,
      referenceValue,
      referenceValueDefinition,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
