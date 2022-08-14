<template>
  <h3>Form Validation</h3>
  <p></p>

  <section>
    <h4>Usage</h4>
    <p>
    <code class="code-text">rules</code> prop allows validation of form components. <code class="code-text">rules</code> is an object where each prop is a name of global validator or user defined function with tested value as argument. User functions should return <code class="code-text">true</code> for valid result or the <code class="code-text">string</code> message if the result is invalid. Global validators include: 
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
      Default messages of global validators can be changed by <code class="code-text">setValidationMessage(validator, message)</code> function. If validator has argument (for example <code class="code-text">maxLength</code>) <code class="code-text">%d</code> token can be used in message in place of that argument.
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
    <p><code class="code-text">validation-on</code> and <code class="code-text">validation-mode</code>, only available on text inputs, allows control over when to start validation and how to update state according to validation results:
    <ul>
      <li class="my-2">
        <code class="code-text">validate-on: "blur"</code> - starts updating input state only after it loses focus (<code class="code-text">default</code>)
      </li>
      <li class="my-2">
        <code class="code-text">validate-on: "immediate"</code> - starts updating state immediately after first input
      </li>
      <li class="my-2">
        <code class="code-text">validate-mode: "silent"</code> - invalid values are ignored until value is at last once valid (<code class="code-text">default</code>)
      </li>
      <li class="my-2">
        <code class="code-text">validate-mode: "eager"</code> - invalid and valid values always change state
      </li>
    </ul>
    </p>
    <div class="example">
      <example-validation-modes />
    </div>
  </section>

  <section>
    <h4>Example - form validation</h4>
    <p>
     In order to validate entire form wrap inputs with <code class="code-text">v-form</code> component which exposes two functions: <code class="code-text">validate()</code> and <code class="code-text">reset()</code>. Calling <code class="code-text">validate()</code> function validates every input according to its rules and return <code class="code-text">true</code> if all are valid (<code class="code-text">false</code> if any input is invalid). To reset all inputs within <code class="code-text">v-form</code> use exposed <code class="code-text">reset()</code> function.
    </p>
    <div class="example">
      <example-validation-form />
    </div>
    <v-code :code="ExampleValidationFormCode" template language="html"></v-code>
    <v-code :code="ExampleValidationFormCode" script language="js"></v-code>
  </section>
</template>

<script>
import ExampleValidationUsernameCode from "./examples/ExampleValidationUsername.vue?raw"
import ExampleValidationPasswordCode from "./examples/ExampleValidationPassword.vue?raw"
import ExampleValidationCheckboxCode from "./examples/ExampleValidationUsername.vue?raw"
import ExampleValidationFormCode from "./examples/ExampleValidationForm.vue?raw"

export default {
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
