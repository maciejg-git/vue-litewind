<template>
    <div class="flex gap-x-20">
      <div class="basis-1/2 flex flex-col gap-y-32">
        <div>
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
        
        <div>
          <v-input
            v-model="email"
            type="text"
            placeholder="Email"
            block
            class="w-full"
          />
          <v-form-text
            :status="email.status"
            :messages="messages"
            class="absolute"
          ></v-form-text>
        </div>
        
        <div>
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
        
        <div>
          <v-select v-model="option" :options="options"></v-select>
          <v-form-text
            :status="option.status"
            :messages="messages"
            class="absolute"
          ></v-form-text>
        </div>
        
        <div>
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

        <v-button @click="form.validate()" class="self-start">Send</v-button>
      </div>
      <div>
        <pre class="m-0">
          <code v-html="'model: ' + getStatusString(username.model.value)"></code>
          <code v-html="'status: ' + getStatusString(form.status.value, true)"></code>
          <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
        </pre>
      </div>
    </div>
</template>

<script>
import { ref } from "vue";
import useValidate from "../../composition/use-validate-ref";

export default {
  components: {},
  setup() {
    let { validateForm, validateRef } = useValidate()
    let form = validateForm("form")

    let username = validateRef(
      "",
      {
        required: true,
        minLength: 3,
        alphanumeric: true,
      },
      form
    );

    let email = validateRef(
      "",
      {
        required: true,
        email: true,
      },
      form
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
      form
    );

    let option = validateRef(
      "",
      {
        required: true,
      },
      form
    );

    let languages = validateRef(
      [],
      {
        required: true,
      },
      form
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
      form,
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
