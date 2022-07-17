<template>
  <div class="flex gap-x-20">
    <div class="basis-1/2 flex flex-col gap-y-32">
      <div>
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
        ></v-input>
      </div>

      <div>
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
          @update:status="(data) => (usernameStatus = data)"
        ></v-input>
      </div>

      <div>
        <v-input
          type="text"
          placeholder="Username"
          block
          class="w-full"
          v-model="email"
          :rules="{
            required: true,
            email: true,
          }"
          @update:status="(data) => (usernameStatus = data)"
        ></v-input>
      </div>

      <v-button @click="form.validate()" class="self-start">Send</v-button>
    </div>
    <div>
      <pre class="m-0">
          <!-- <code v-html="'model: ' + getStatusString(username.model.value)"></code> -->
          <!-- <code v-html="'status: ' + getStatusString(form.status.value, true)"></code> -->
          <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
        </pre>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  components: {},
  setup() {
    let username = ref("");
    let email = ref("");
    let password = ref("");

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
      email,
      password,
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
