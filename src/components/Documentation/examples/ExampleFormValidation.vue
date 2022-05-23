<template>
  <div class="flex gap-x-20">
    <div>
      <v-input v-model="username" type="text" placeholder="Username" />
      <v-form-text
        :status="username.status"
        :messages="messages"
        class="absolute"
      ></v-form-text>
    </div>

    <pre class="m-0">
      <code v-html="'model: ' + getStatusString(username.model.value)"></code>
      <code v-html="'validators: ' + getStatusString(username.validators)"></code>
      <code v-html="'status: ' + getStatusString(username.status.value, true)"></code>
      <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code>
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div>
      <v-input v-model="email" type="text" placeholder="Email" />
      <v-form-text
        :status="email.status"
        :messages="messages"
        class="absolute"
      ></v-form-text>
    </div>

    <pre class="m-0">
      <code v-html="'model: ' + getStatusString(email.model.value)"></code>
      <code v-html="'validators: ' + getStatusString(email.validators)"></code>
      <code v-html="'status: ' + getStatusString(email.status.value, true)"></code>
      <code v-html="'formstatus: ' + getStatusString(email.formStatus.value)"></code>
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div>
      <v-input v-model="password" type="text" placeholder="Password" />
      <v-form-text
        :status="password.status"
        :messages="messages"
        class="absolute"
      ></v-form-text>
    </div>

    <pre class="m-0">
      <code v-html="'model: ' + getStatusString(password.model.value)"></code>
      <code v-html="'validators: ' + getStatusString(password.validators)"></code>
      <code v-html="'status: ' + getStatusString(password.status.value, true)"></code>
      <code v-html="'formstatus: ' + getStatusString(password.formStatus.value)"></code>
    </pre>
  </div>
</template>

<script>
import { ref } from "vue";
import useValidateRef from "../../composition/use-validate-ref";

export default {
  components: {},
  setup() {
    let username = useValidateRef(
      "",
      {
        required: true,
        minLength: 3,
        alphanumeric: true,
      },
      "form"
    );

    let email = useValidateRef(
      "",
      {
        required: true,
        email: true,
      },
      "form"
    );

    let password = useValidateRef(
      "",
      {
        required: true,
        minLength: 8,
        atLeastOneUppercase: true,
        atLeastOneLowercase: true,
        atLeastOneSpecial: true,
        atLeastOneDigit: true,
      },
      "form"
    );

    let messages = {
      required: "Please enter a value for this field",
      alpha: "Please enter only letters",
      numeric: "Please enter only numbers",
      alphanumeric: "Please enter only letters or numbers",
      // minLength: (value) => `Please enter at least ${value} characters`,
      minLength: "Please enter at least 3 characters",
      email: "Please enter valid email address",
      atLeastOneUppercase: "Please enter at least one uppercase character",
      atLeastOneLowercase: "Please enter at least one lowercase character",
      atLeastOneDigit: "Please enter at least one numeric character",
      atLeastOneSpecial: "Please enter at least one special character",
    };

    let getStatusString = (value, highlight) => {
      let s = JSON.stringify(value, null, "&#9;");
      if (!highlight) return s;
      return s
        .replace(/(false)/gi, "<span class='text-danger-400'>$1</span>")
        .replace(/(true)/gi, "<span class='text-success-400'>$1</span>");
    };

    return {
      username,
      email,
      password,
      messages,
      getStatusString,
    };
  },
};
</script>

<style scoped lang="postcss">
code {
  @apply block dark:text-text-400 my-2;
}
</style>
