<template>
  <v-input
    v-model="password"
    :rules="passwordRules"
    single-line-message
    inline
    type="text"
    placeholder="Password"
    class="w-[420px]"
  ></v-input>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let password = ref("");
    let passwordStatus = ref({});
    let passwordRules = {
      required: true,
      atLeastOneUppercase: true,
      atLeastOneLowercase: true,
      atLeastOneSpecial: true,
      atLeastOneDigit: true,
      minLength: 8,
    };

    return {
      password,
      passwordStatus,
      passwordRules,
    };
  },
};
</script>

<style scoped lang="postcss">
code {
  @apply block dark:text-text-400 my-2;
}
</style>
