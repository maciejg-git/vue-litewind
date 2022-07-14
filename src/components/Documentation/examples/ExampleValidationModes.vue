<template>
  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-form-field
        v-model="username"
        :rules="{
          required: true,
          minLength: 5,
          alphanumeric: true,
        }"
        validate="on-blur silent"
        @update:status="(data) => (usernameStatus = data)"
      >
        <v-input type="text" placeholder="Username" block class="w-full" />
      <v-form-text
        class="absolute"
      ></v-form-text>
      </v-form-field>
    </div>

    <pre class="m-0">
      Mode: "on-blur silent"
      <code v-html="'model: ' + getStatusString(username)"></code>
      <!-- <code v-html="'validators: ' + getStatusString(username.validators)"></code> -->
      <code v-html="'status: ' + getStatusString(usernameStatus, true)"></code>
      <!-- <code v-html="'messages: ' + getStatusString(username.messages, true)"></code> -->
      <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-form-field
        v-model="username2"
        :rules="{
          required: true,
          minLength: 5,
          alphanumeric: true,
        }"
        validate="on-blur eager"
        @update:status="(data) => (usernameStatus2 = data)"
      >
        <v-input type="text" placeholder="Username" block class="w-full" />
      <v-form-text
        :status="username.status"
        :messages="messages"
        class="absolute"
      ></v-form-text>
      </v-form-field>
    </div>

    <pre class="m-0">
      Mode: "on-blur eager"
      <code v-html="'model: ' + getStatusString(username2)"></code>
      <!-- <code v-html="'validators: ' + getStatusString(username.validators)"></code> -->
      <code v-html="'status: ' + getStatusString(usernameStatus2, true)"></code>
      <!-- <code v-html="'messages: ' + getStatusString(username.messages, true)"></code> -->
      <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-form-field
        v-model="username3"
        :rules="{
          required: true,
          minLength: 5,
          alphanumeric: true,
        }"
        validate="immediate silent"
        @update:status="(data) => (usernameStatus3 = data)"
      >
        <v-input type="text" placeholder="Username" block class="w-full" />
      <v-form-text
        :status="username.status"
        :messages="messages"
        class="absolute"
      ></v-form-text>
      </v-form-field>
    </div>

    <pre class="m-0">
      Mode: "immediate silent"
      <code v-html="'model: ' + getStatusString(username3)"></code>
      <!-- <code v-html="'validators: ' + getStatusString(username.validators)"></code> -->
      <code v-html="'status: ' + getStatusString(usernameStatus3, true)"></code>
      <!-- <code v-html="'messages: ' + getStatusString(username.messages, true)"></code> -->
      <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-form-field
        v-model="username4"
        :rules="{
          required: true,
          minLength: 5,
          alphanumeric: true,
        }"
        validate="immediate eager"
        @update:status="(data) => (usernameStatus4 = data)"
      >
        <v-input type="text" placeholder="Username" block class="w-full" />
      <v-form-text
        :status="username.status"
        :messages="messages"
        class="absolute"
      ></v-form-text>
      </v-form-field>
    </div>

    <pre class="m-0">
      Mode: "immediate eager"
      <code v-html="'model: ' + getStatusString(username4)"></code>
      <!-- <code v-html="'validators: ' + getStatusString(username.validators)"></code> -->
      <code v-html="'status: ' + getStatusString(usernameStatus4, true)"></code>
      <!-- <code v-html="'messages: ' + getStatusString(username.messages, true)"></code> -->
      <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
    </pre>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import useValidate from "../../composition/use-validate-ref";

export default {
  components: {},
  setup() {
    let { validateRef } = useValidate();

    let username = ref("")

    let username2 = ref("")

    let username3 = ref("")

    let username4 = ref("")

    let usernameStatus = ref("")

    let usernameStatus2 = ref("")

    let usernameStatus3 = ref("")

    let usernameStatus4 = ref("")

    let messages = {
      required: "Please enter a value for this field",
      alpha: "Please enter only letters",
      numeric: "Please enter only numbers",
      alphanumeric: "Please enter only letters or numbers",
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
      username2,
      username3,
      username4,
      usernameStatus,
      usernameStatus2,
      usernameStatus3,
      usernameStatus4,
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
