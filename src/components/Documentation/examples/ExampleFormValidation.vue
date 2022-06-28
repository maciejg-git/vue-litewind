<template>
  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input
        v-model="username"
        type="text"
        placeholder="Username"
        block
        class="w-full"
      />
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
      <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input
        v-model="password"
        type="text"
        placeholder="Password"
        block
        class="w-full"
      />
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
      <!-- <code v-html="'formstatus: ' + getStatusString(password.formStatus.value)"></code> -->
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-select v-model="option" :options="options"></v-select>
      <v-form-text
        :status="option.status"
        :messages="messages"
        class="absolute"
      ></v-form-text>
    </div>

    <pre class="m-0">
      <code v-html="'model: ' + getStatusString(option.model.value)"></code>
      <code v-html="'validators: ' + getStatusString(option.validators)"></code>
      <code v-html="'status: ' + getStatusString(option.status.value, true)"></code>
      <!-- <code v-html="'formstatus: ' + getStatusString(option.formStatus.value)"></code> -->
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <div v-for="l in languagesData" class="flex items-center my-2">
        <v-checkbox
          v-model="languages"
          :value="l"
          :id="'language-' + l"
        ></v-checkbox>
        <label :for="'language-' + l" class="ml-3">
          {{ l }}
        </label>
      </div>
    </div>

    <pre class="m-0">
      <code v-html="'model: ' + getStatusString(languages.model.value)"></code>
      <code v-html="'validators: ' + getStatusString(languages.validators)"></code>
      <code v-html="'status: ' + getStatusString(languages.status.value, true)"></code>
      <!-- <code v-html="'formstatus: ' + getStatusString(languages.formStatus.value)"></code> -->
    </pre>
  </div>
</template>

<script>
import { ref } from "vue";
import useValidate from "../../composition/use-validate-ref";

export default {
  components: {},
  setup() {
    let { validateForm, validateRef } = useValidate()
    let user = validateForm("user")
    console.log(user)

    let username = validateRef(
      "",
      {
        required: true,
        minLength: 5,
        alphanumeric: true,
      },
      user
    );

    let email = validateRef(
      "",
      {
        required: true,
        email: true,
      },
      user
    );

    let password = validateRef(
      "",
      {
        required: true,
        minLength: 8,
        atLeastOneUppercase: true,
        atLeastOneLowercase: true,
        atLeastOneSpecial: true,
        atLeastOneDigit: true,
      },
      user
    );

    let option = validateRef(
      "",
      {
        required: true,
      },
      user
    );

    let languages = validateRef(
      [],
      {
        required: true,
      },
      user
    );

    let options = ref([
      {
        value: "option",
        label: "option",
      },
      {
        value: "option 2",
        label: "option 2",
      },
      {
        value: "option 3",
        label: "option 3",
      },
    ]);

    let languagesData = ref([
      "english",
      "swedish",
      "korean",
      "german",
      "icelandic",
      "japanese",
    ]);

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
      email,
      password,
      messages,
      option,
      options,
      languages,
      languagesData,
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
