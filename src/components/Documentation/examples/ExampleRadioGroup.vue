<template>
  <v-radio-group v-model="language">
    <div v-for="l in languagesData" class="my-2">
      <v-radio
        :value="l"
        :id="'language-' + l"
        :label="l"
      ></v-radio>
    </div>
  </v-radio-group>

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
