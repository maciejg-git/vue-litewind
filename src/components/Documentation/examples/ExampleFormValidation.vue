<template>
  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input 
         type="text" 
         placeholder="Username"
         block 
         class="w-full"
        v-model="username"
        :rules="{
          required: true,
          minLength: 5,
          alphanumeric: true,
        }"
        @update:status="(data) => (usernameStatus = data)"
        >
        </v-input>
    </div>
    <pre class="m-0">
      <code v-html="'model: ' + getStatusString(username)"></code>
      <!-- <code v-html="'validators: ' + getStatusString(username.validators)"></code> -->
      <code v-html="'status: ' + getStatusString(usernameStatus, true)"></code>
      <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
    </pre>
    </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input 
         type="text" 
         placeholder="Username"
         block 
         class="w-full"
        v-model="password"
        :rules="{
          required: true,
          minLength: 8,
          atLeastOneUppercase: true,
          atLeastOneLowercase: true,
          atLeastOneSpecial: true,
          atLeastOneDigit: true,
        }"
        @update:status="(data) => (passwordStatus = data)"
        >
        </v-input>
    </div>
    <pre class="m-0">
      <code v-html="'model: ' + getStatusString(password)"></code>
      <!-- <code v-html="'validators: ' + getStatusString(username.validators)"></code> -->
      <code v-html="'status: ' + getStatusString(passwordStatus, true)"></code>
      <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
    </pre>
    </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-checkbox-group
        v-model="languages"
        :rules="{
          required: true,
          minLength: 3,
        }"
        @update:status="(data) => (languagesStatus = data)"
      >
      <div v-for="l in languagesData" class="flex items-center my-2">
        <v-checkbox
          :value="l"
          :id="'language-' + l"
        ></v-checkbox>
        <label :for="'language-' + l" class="ml-3">
          {{ l }}
        </label>
      </div>
      <v-form-text
        class="absolute"
      ></v-form-text>
      </v-checkbox-group>
    </div>

    <pre class="m-0">
      <code v-html="'model: ' + getStatusString(languages)"></code>
      <!-- <code v-html="'validators: ' + getStatusString(languages.validators)"></code> -->
      <code v-html="'status: ' + getStatusString(languagesStatus, true)"></code>
      <!-- <code v-html="'formstatus: ' + getStatusString(languages.formStatus.value)"></code> -->
    </pre>
  </div>

  <v-divider class="my-10" />
</template>

<script>
import { ref } from "vue";
import useValidate from "../../composition/use-validate-ref";

export default {
  components: {},
  setup() {
    let { validateForm, validateRef } = useValidate();
    let user = validateForm("user");
    console.log(user);

    let username = ref("");
    let usernameStatus = ref({});

    let password = ref("");
    let passwordStatus = ref({});

    let languages = ref([])
    let languagesStatus = ref({});

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

    let getStatusString = (value, highlight) => {
      let s = JSON.stringify(value, null, "&#9;");
      if (!highlight) return s;
      return s
        .replace(/(false)/gi, "<span class='text-danger-400'>$1</span>")
        .replace(/(true)/gi, "<span class='text-success-400'>$1</span>");
    };

    return {
      username,
      usernameStatus,
      password,
      passwordStatus,
      options,
      languages,
      languagesStatus,
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
