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
      class,
      class2,
    ],
    preset: [
      class,
      class2,
    ],
    variant: [
      class,
      class2,
    ],
    variant2: [
      class,
      class2,
    ]
  },
  element2: {
    default: [
      class,
      class2,
    ],
    preset: [
      class,
      class2,
    ],
    variant: [
      class,
      class2,
    ],
    variant2: [
      class,
      class2,
    ]
  },
}
    </code>
  </pre>
  <p>
    In the above example "element" is just an html element in component template but can also be state of component. Default is the default set of classes added to element if style-element prop is not set. Preset is optional and can be used as alternative set of classes to replace default set. Variant is also optional and is used with default or presets to add small variants to them. is flexible you can use only complete presets and no variants or only default with many variants. To style component using those classes use style-element prop on component that supports it. Every style-element props accepts space separated Strings of defaults, presets and variants.
  </p>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import hljs from "highlight.js";

export default {
  setup(props) {
    onMounted(() => {
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
