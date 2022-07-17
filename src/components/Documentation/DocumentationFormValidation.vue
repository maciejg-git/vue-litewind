<template>
  <h3>Form Validation</h3>
  <p></p>

  <section>
    <h4>Usage</h4>
    <p>
    <ul>
      <li>
        Validation modes
      </li>
      <li>
        Form validation
      </li>
      <li>
        Global validators
      </li>
    </ul>
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
    <h4>Example - validation modes</h4>
    <p>Validation modes allows control over when to display validation results and how to display them. Currently there are 4 of them: 
    <ul>
      <li class="my-2"><code class="code-text">"on-blur silent"</code> updates input state only after it loses focus. If after focusing out validation result is invalid set state to invalid. Valid values do not change input state.</li>
      <li class="my-2"><code class="code-text">"on-blur eager"</code> as above but also changes state if input is valid.</li>
      <li class="my-2"><code class="code-text">"immediate silent"</code> start updating state immediately after first input. Invalid states are ignored until value is at last once valid.</li>
      <li class="my-2"><code class="code-text">"immediate eager"</code> as above but state is updated immedietely for invalid and valid values.</li>
    </ul>
    </p>
    <div class="example">
      <example-validation-modes></example-validation-modes>
    </div>
    <!-- <v-code :code="ExampleFormValidationCode" template language="html"></v-code> -->
    <!-- <v-code :code="ExampleFormValidationCode" script language="js"></v-code> -->
  </section>

  <section>
    <h4>Example - form validation</h4>
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
import ExampleValidationModes from "./examples/ExampleValidationModes.vue"
import ExampleFormValidationCode from "./examples/ExampleFormValidation.vue?raw"

export default {
  components: {
    ExampleFormValidation,
    ExampleInputValidation,
    ExampleValidationModes,
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
