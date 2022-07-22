<template>
  <div v-for="l in languagesData" class="flex items-center my-2">
    <v-radio
      v-model="language"
      :value="l"
      :id="'language-' + l"
    ></v-radio>
    <label :for="'language-' + l" class="ml-3">
      {{ l }}
    </label>
  </div>

  <div class="mt-5">
    <span class="font-semibold">Language:</span>
    {{ language }}
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let language = ref("");

    let languagesData = ref([
      "english",
      "swedish",
      "korean",
      "german",
      "icelandic",
      "japanese",
    ]);

    return {
      language,
      languagesData,
    };
  },
};
</script>
