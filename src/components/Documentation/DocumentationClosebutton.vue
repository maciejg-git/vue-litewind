<template>
  <h3>Close button</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference" />

    <h6>Styling props</h6>
    <table-reference-basic :items="styles" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <div class="flex gap-x-4">
        <v-close-button />
        <v-close-button base="round" />
      </div>
    </div>
    <v-code :code="code" template language="html"></v-code>
  </section>
</template>

<script>
import { ref } from "vue";
import { styleProps } from "./shared-props"

export default {
  setup(props) {
    let reference = ref([
      ...styleProps(),
    ]);

    let styles = ref([
      {
        prop: "style-wrapper",
        description: "Wrapper button element",
      },
      {
        prop: "style-close-button",
        description: "Icon element",
      },
    ]);

    let code = `<template>
  <v-close-button />
  <v-close-button base="round" />
</template>`

    return {
      reference,
      styles,
      code,
    };
  },
};
</script>

<style scoped>
</style>
