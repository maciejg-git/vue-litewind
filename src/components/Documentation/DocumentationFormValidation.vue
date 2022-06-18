<template>
  <h3>Form Validation</h3>
  <p></p>

  <section>
    <h4>Usage</h4>
    <p>
    To validate forms Vue-wind uses extended refs.
    </p>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-form-validation></example-form-validation>
    </div>
    <v-code :code="ExampleFormValidationCode" template language="html"></v-code>
    <v-code :code="ExampleFormValidationCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <example-input-validation></example-input-validation>
    </div>
    <!-- <v-code :code="ExampleInputValidationCode" template language="html"></v-code> -->
    <!-- <v-code :code="ExampleInputValidationCode" script language="js"></v-code> -->
  </section>
</template>

<script>
import ExampleFormValidation from "./examples/ExampleFormValidation.vue"
import ExampleInputValidation from "./examples/ExampleInputValidation.vue"
import ExampleFormValidationCode from "./examples/ExampleFormValidation.vue?raw"

export default {
  components: {
    ExampleFormValidation,
    ExampleInputValidation,
  },
  setup(props) {
    return {
      ExampleFormValidationCode,
    };
  },
};
</script>

<style scoped>
</style>
