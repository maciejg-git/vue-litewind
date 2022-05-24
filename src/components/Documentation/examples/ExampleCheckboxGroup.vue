<template>
  <div v-for="l in languages" class="flex items-center my-2">
    <v-checkbox
      v-model="languagesModel"
      :value="l"
      :id="'language-' + l"
    ></v-checkbox>
    <label :for="'language-' + l" class="ml-3">
      {{ l }}
    </label>
  </div>

  <v-form-text visible-states="invalid">
    Please select at least 3 languages.
  </v-form-text>

  <v-button class="mt-5">Send</v-button>

  <div class="mt-5">
    <span class="font-semibold">Languages:</span>
    {{ languagesModel }}
  </div>
</template>

<script>
import { ref } from "vue";

import useValidateRef from "../../composition/use-validate-ref";

export default {
  setup() {
    let languages = ref([
      "english",
      "swedish",
      "korean",
      "german",
      "icelandic",
      "japanese",
    ]);

    let languagesModel = useValidateRef(
      "",
      {
        required: true,
        minLength: 3,
        alphanumeric: true,
      },
      "form"
    );

    return {
      languages,
      languagesModel,
    };
  },
};
</script>
