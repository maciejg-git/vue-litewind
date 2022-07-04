<template>
  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input
        v-model="username"
        type="text"
        placeholder="Username"
        validate="on-blur silent"
        block
        class="w-full"
      />
      <!-- <v-form-text -->
      <!--   :status="username.status" -->
      <!--   :messages="messages" -->
      <!--   class="absolute" -->
      <!-- ></v-form-text> -->
    </div>

    <pre class="m-0">
      Mode: "on-blur silent"
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
        v-model="username2"
        type="text"
        placeholder="Username"
        validate="on-blur eager"
        block
        class="w-full"
      />
      <!-- <v-form-text -->
      <!--   :status="username.status" -->
      <!--   :messages="messages" -->
      <!--   class="absolute" -->
      <!-- ></v-form-text> -->
    </div>

    <pre class="m-0">
      Mode: "on-blur eager"
      <code v-html="'model: ' + getStatusString(username2.model.value)"></code>
      <code v-html="'validators: ' + getStatusString(username2.validators)"></code>
      <code v-html="'status: ' + getStatusString(username2.status.value, true)"></code>
      <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input
        v-model="username3"
        type="text"
        placeholder="Username"
        validate="immediate silent"
        block
        class="w-full"
      />
      <!-- <v-form-text -->
      <!--   :status="username.status" -->
      <!--   :messages="messages" -->
      <!--   class="absolute" -->
      <!-- ></v-form-text> -->
    </div>

    <pre class="m-0">
      Mode: "immediate silent"
      <code v-html="'model: ' + getStatusString(username3.model.value)"></code>
      <code v-html="'validators: ' + getStatusString(username3.validators)"></code>
      <code v-html="'status: ' + getStatusString(username3.status.value, true)"></code>
      <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
    </pre>
  </div>

  <v-divider class="my-10" />

  <div class="flex gap-x-20">
    <div class="basis-1/2">
      <v-input
        v-model="username4"
        type="text"
        placeholder="Username"
        validate="immediate eager"
        block
        class="w-full"
      />
      <!-- <v-form-text -->
      <!--   :status="username.status" -->
      <!--   :messages="messages" -->
      <!--   class="absolute" -->
      <!-- ></v-form-text> -->
    </div>

    <pre class="m-0">
      Mode: "immediate eager"
      <code v-html="'model: ' + getStatusString(username4.model.value)"></code>
      <code v-html="'validators: ' + getStatusString(username4.validators)"></code>
      <code v-html="'status: ' + getStatusString(username4.status.value, true)"></code>
      <!-- <code v-html="'formstatus: ' + getStatusString(username.formStatus.value)"></code> -->
    </pre>
  </div>
</template>

<script>
import { reactive } from "vue";
import useValidate from "../../composition/use-validate-ref";

export default {
  components: {},
  setup() {
    let { validateRef } = useValidate();

    let username = validateRef("", {
      required: true,
      minLength: 5,
      alphanumeric: true,
    });

    let username2 = validateRef("", {
      required: true,
      minLength: 5,
      alphanumeric: true,
    });

    let username3 = validateRef("", {
      required: true,
      minLength: 5,
      alphanumeric: true,
    });

    let username4 = validateRef("", {
      required: true,
      minLength: 5,
      alphanumeric: true,
    });

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
