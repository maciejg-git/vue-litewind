<template>
  <div class="mb-24">
    <v-input v-model="user" type="text" placeholder="Type something..." />
    <v-form-text
      :status="user.status"
      :messages="messages"
      class="absolute"
    ></v-form-text>
  </div>

  <pre>
    <div class="mb-2">
      <code v-html="'model: ' + JSON.stringify(user.model.value, null, '&#9;')"></code>
    </div>
    <div class="mb-2">
      <code v-html="'validators: ' + JSON.stringify(user.validators, null, '&#9;')"></code>
    </div>
    <div class="mb-2">
      <code v-html="'status: ' + JSON.stringify(user.status.value, null, '&#9;')"></code>
    </div>
    <div class="mb-2">
      <code v-html="'formStatus: ' + JSON.stringify(user.formStatus.value, null, '&#9;')"></code>
    </div>
  </pre>
</template>

<script>
import { ref } from "vue";
import useValidateRef from "../../composition/use-validate-ref";

export default {
  components: {},
  setup() {
    let user = useValidateRef(
      "",
      {
        minLength: 6,
        // alpha: true,
        numeric: true,
        // alphanumeric: true,
        required: true,
        passwordMin: () => {
          return true;
        },
        // email: true,
      },
      "model"
    );

    let messages = {
      alpha: "Please enter only letters",
      numeric: "Please enter only numbers",
      required: "Please enter a value for this field",
      minLength: "Please enter at least 6 characters",
      email: "Please enter valid email address",
    };

    return {
      user,
      messages,
    };
  },
};
</script>
