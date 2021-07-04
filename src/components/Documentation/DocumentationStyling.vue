<template>
  <h3>Styling</h3>
  <p>By default does not come with any styling, only the necessary classes are added to properly display components. All additional styling is done in styles.js file and those styles are using style-element prop of component.
  Format of style fil
  </p>
  <pre>
    <code>
let component = {
  element: {
    default: [
      "class",
      "class2",
    ],
    variant: [
      "class",
      "class2",
    ],
    variant2: [
      "class",
      "class2",
    ]
  },
  element2: {
    default: [
      "class",
      "class2",
    ],
    variant: [
      "class",
      "class2",
    ],
    variant2: [
      "class",
      "class2",
    ]
  },
}
    </code>
  </pre>
  <p>
    In the above example "element" is just an html element in component template (can also be state of component). 
    <ul class="my-4 ml-4">
      <li>
    <span class="font-semibold">default</span> is the default set of classes always added to element if style-element is not set. 
      </li>
      <li>
    <span class="font-semibold">variant</span> is optional and can be complete set of classes used as alternative to default or small set to add variants to default.
      </li>
    </ul>
    To style elements of component use style-element. Value for those props should be space separated String and contain 'default', variants or classes. If any name is not recognized as part of styles.js it is included simply as class. Order is important because if there are two tailwind classes that belong to same type (for example bg-green-500 and bg-indigo-200) former class is removed. User defined, non tailwind classes are never removed. Below is the example for single element button:

    <pre>
      <code>
{{`<v-button style-button="primary large">Large button</v-button>
<v-button style-button="primary">Normal button</v-button>
<v-button style-button="primary small">Small button</v-button>
<v-button style-button="primary tiny">Tiny button</v-button>

<v-button style-button="secondary">Secondary button</v-button>

<v-button style-button="default yellow">Yellow button</v-button>
<v-button style-button="default green">Green button</v-button>

<v-button style-button="primary square">Square button</v-button>
<v-button style-button="primary pill">Pill button</v-button>
<v-button style-button="primary uppercase">Uppercase button</v-button>

<v-button style-button="bg-green-500 text-white rounded">Class button</v-button>
`}}

      </code>
    </pre>
  </p>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import hljs from "highlight.js";

export default {
  setup(props) {
    onMounted(() => {
      hljs.configure({languages: ["js"]})
      hljs.highlightAll();
    });

    return {
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
