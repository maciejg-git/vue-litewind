<template>
  <h3>Close button</h3>

  <section>
    <h4>Reference</h4>
    <table-reference :items="reference.props" />
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <div class="flex gap-x-4">
        <v-close-button />
        <v-close-button base="round-close-button" />
      </div>
    </div>
    <v-code :code="code" template language="html"></v-code>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import componentDocumentation from "./components-documentation/vCloseButton.json"

export default {
  setup(props) {
    let reference = reactive(componentDocumentation)

    let code = `<template>
  <v-close-button />
  <v-close-button base="round" />
</template>`

    return {
      reference,
      code,
    };
  },
};
</script>

<style scoped>
</style>
