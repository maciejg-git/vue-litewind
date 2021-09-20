<template>
  <div v-for="l in languages" class="flex items-center my-2">
    <v-radio
      v-model="languagesModel"
      :value="l"
      :state="languagesValidated ? (languagesModel ? true : false) : null"
      :id="'language-' + l"
    ></v-radio>
    <label :for="'language-' + l" class="ml-3">
      {{ l }}
    </label>
  </div>
  <v-form-text
    :state="languagesValidated ? (languagesModel ? true : false) : null"
    visible-states="invalid"
  >
    Please select the language.
  </v-form-text>
  <v-button @click="validate()" style-button="default" class="mt-5">
    Send
  </v-button>
  <div class="mt-5">
    <span class="font-semibold">Language:</span>
    {{ languagesModel }}
  </div>
</template>

<script>
import { ref, reactive } from "vue";

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

    let languagesModel = ref("");
    let languagesValidated = ref(false);

    let validate = () => {
      languagesValidated.value = true;
    };

    return {
      languages,
      validate,
      languagesModel,
      languagesValidated,
    };
  },
};
</script>
