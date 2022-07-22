<template>
  <h3>Form Validation</h3>
  <p></p>

  <section>
    <h4>Usage</h4>
    <p>
    <code class="code-text">rules</code> prop allows to add validation to form components. <code class="code-text">rules</code> is an object where each prop is a name of global validator or user defined function. User functions should return <code class="code-text">true</code> for valid result or the <code class="code-text">string</code> message if the result is invalid. Global validators include: 
    <ul>
      <li>
        <code class="code-text">
          required
        </code>
      </li>
      <li>
        <code class="code-text">
          alpha
        </code>
      </li>
      <li>
        <code class="code-text">
          numeric
        </code>
      </li>
      <li>
        <code class="code-text">
          alphanumeric
        </code>
      </li>
      <li>
        <code class="code-text">
          minLength
        </code>
      </li>
      <li>
        <code class="code-text">
          maxLength
        </code>
      </li>
      <li>
        <code class="code-text">
          minElements
        </code>
      </li>
      <li>
        <code class="code-text">
          maxElements
        </code>
      </li>
      <li>
        <code class="code-text">
          minValue
        </code>
      </li>
      <li>
        <code class="code-text">
          maxValue
        </code>
      </li>
      <li>
        <code class="code-text">
          email
        </code>
      </li>
      <li>
        <code class="code-text">
          atLeastOneUppercase
        </code>
      </li>
      <li>
        <code class="code-text">
          atLeastOneLowercase
        </code>
      </li>
      <li>
        <code class="code-text">
          atLeastOneDigit
        </code>
      </li>
      <li>
        <code class="code-text">
          atLeastOneSpecial
        </code>
      </li>
      <li>
        <code class="code-text">
          sameAs
        </code>
      </li>
    </ul>
    </p>
    <p>
      Default messages returned by global validators can be changed by importing <code class="code-text">validationMessages</code> object:
    </p>
  </section>

  <section>
    <h4>Example - simple validation</h4>
    <div class="example">
      <example-validation-username></example-validation-username>
    </div>
    <v-code :code="ExampleValidationUsernameCode" template language="html"></v-code>
    <v-code :code="ExampleValidationUsernameCode" script language="js"></v-code>

    <div class="example">
      <example-validation-password></example-validation-password>
    </div>
    <v-code :code="ExampleValidationPasswordCode" template language="html"></v-code>
    <v-code :code="ExampleValidationPasswordCode" script language="js"></v-code>

    <div class="example">
      <example-validation-checkbox></example-validation-checkbox>
    </div>
    <v-code :code="ExampleValidationCheckboxCode" template language="html"></v-code>
    <v-code :code="ExampleValidationCheckboxCode" script language="js"></v-code>
  </section>

  <section>
    <h4>Example - validation modes</h4>
    <p>Validation modes, only available on text inputs, allows control over when to display validation results and how to display them. Currently there are 4: 
    <ul>
      <li class="my-2"><code class="code-text">"on-blur silent"</code> starts updating input state only after it loses focus. State of input is changed only for invalid values (default)</li>
      <li class="my-2"><code class="code-text">"on-blur eager"</code> as above but also changes state if input is valid.</li>
      <li class="my-2"><code class="code-text">"immediate silent"</code> starts updating state immediately after first input. Invalid values are ignored until value is at last once valid.</li>
      <li class="my-2"><code class="code-text">"immediate eager"</code> as above but state is updated immedietely for invalid and valid values.</li>
    </ul>
    </p>
    <div class="example">
      <example-validation-modes />
    </div>
    <!-- <v-code :code="ExampleFormValidationCode" template language="html"></v-code> -->
    <!-- <v-code :code="ExampleFormValidationCode" script language="js"></v-code> -->
  </section>

  <section>
    <h4>Example - form validation</h4>
    <p>
     In order to validate entire form wrap inputs with v-form component and use exposed <code class="code-text">validate</code> function. This function updates state of every input according to validation results and return true if all are valid. Additioanlly it emits <code class="code-word">update:form-state</code> with new form state after each validation.
    </p>
    <div class="example">
      <example-validation-form />
    </div>
    <v-code :code="ExampleValidationFormCode" template language="html"></v-code>
    <v-code :code="ExampleValidationFormCode" script language="js"></v-code>
  </section>
</template>

<script>
import ExampleValidationUsername from "./examples/ExampleValidationUsername.vue"
import ExampleValidationPassword from "./examples/ExampleValidationPassword.vue"
import ExampleValidationCheckbox from "./examples/ExampleValidationCheckbox.vue"
import ExampleValidationForm from "./examples/ExampleValidationForm.vue"
import ExampleValidationModes from "./examples/ExampleValidationModes.vue"
import ExampleValidationUsernameCode from "./examples/ExampleValidationUsername.vue?raw"
import ExampleValidationPasswordCode from "./examples/ExampleValidationPassword.vue?raw"
import ExampleValidationCheckboxCode from "./examples/ExampleValidationUsername.vue?raw"
import ExampleValidationFormCode from "./examples/ExampleValidationForm.vue?raw"

export default {
  components: {
    ExampleValidationUsername,
    ExampleValidationPassword,
    ExampleValidationCheckbox,
    ExampleValidationForm,
    ExampleValidationModes,
  },
  setup(props) {
    return {
      ExampleValidationUsernameCode,
      ExampleValidationPasswordCode,
      ExampleValidationCheckboxCode,
      ExampleValidationFormCode,
    };
  },
};
</script>

<style scoped>
</style>
