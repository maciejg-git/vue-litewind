<template>
  <v-form
    ref="form"
  >
    <v-input
      v-model="username"
      type="text"
      label="username"
      :rules="usernameRules"
    ></v-input>

    <v-input
      v-model="password"
      type="text"
      label="password"
      :rules="passwordRules"
    ></v-input>

    <v-textarea
      v-model="text"
      :rules="textRules"
    ></v-textarea>
  </v-form>

  <v-button @click="form.reset()">reset</v-button>
  <v-button @click="form.validate()">validate</v-button>
</template>

<script>
import { ref } from "vue";
import vInput from "../../components/vInput.vue"
import vTextarea from "../../components/vTextarea.vue"
import vButton from "../../components/vButton.vue"
import vForm from "../../components/vForm.vue"

export default {
  components: {
    vInput,
    vTextarea,
    vButton,
    vForm,
  },
  setup() {
    let username = ref("");
    let usernameStatus = ref({});
    let usernameRules = [
      "required",
      { minLength: 5 },
      "alphanumeric",
    ];

    let password = ref("");
    let passwordStatus = ref({});
    let passwordRules = [
      "required",
      { minLength: 8 },
      "atLeastOneUppercase",
      "atLeastOneLowercase",
      "atLeastOneSpecial",
      "atLeastOneDigit",
    ];

    let text = ref("");
    let textStatus = ref({});
    let textRules = [
      "required",
      { maxLength: 30 },
    ];

    let form = ref(null);

    return {
      username,
      usernameStatus,
      usernameRules,
      password,
      passwordStatus,
      passwordRules,
      text,
      textStatus,
      textRules,
      form,
    };
  },
};
</script>
