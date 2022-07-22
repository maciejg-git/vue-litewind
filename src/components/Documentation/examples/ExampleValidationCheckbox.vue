<template>
  <div class="flex gap-x-20">
    <div class="basis-1/2 pl-4">
      <v-checkbox-group
        v-model="languages"
        :rules="languagesRules"
        @update:status="(status) => (languagesStatus = status)"
      >
        <div v-for="l in languagesData" class="my-2">
          <v-checkbox :value="l" :id="'language-' + l" :label="l"></v-checkbox>
          <!-- <label :for="'language-' + l" class="ml-3"> -->
          <!--   {{ l }} -->
          <!-- </label> -->
        </div>
      </v-checkbox-group>
    </div>
    <pre class="m-0">
      <code v-html="'model: ' + stringifyObject(languages)"></code>
      <code v-html="'rules: ' + stringifyObject(languagesRules)"></code>
      <code v-html="'status: ' + stringifyObject(languagesStatus, true)"></code>
    </pre>
  </div>
</template>

<script>
import { ref } from "vue";
import { stringifyObject } from "../doc-tools"

export default {
  setup() {
    let languages = ref([]);
    let languagesStatus = ref({});
    let languagesRules = {
      required: true,
      minElements: 3,
      maxElements: 5,
    };

    let languagesData = ref([
      "english",
      "swedish",
      "korean",
      "german",
      "icelandic",
      "japanese",
    ]);

    return {
      languages,
      languagesStatus,
      languagesRules,
      languagesData,
      stringifyObject,
    };
  },
};
</script>

<style scoped lang="postcss">
code {
  @apply block dark:text-text-400 my-2;
}
</style>
