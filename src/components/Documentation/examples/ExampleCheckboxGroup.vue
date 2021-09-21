<template>
  <div v-for="l in languages" class="flex items-center my-2">
    <v-checkbox
      v-model="languagesModel"
      :value="l"
      :state="languagesState()"
      :id="'language-' + l"
    ></v-checkbox>
    <label :for="'language-' + l" class="ml-3">
      {{ l }}
    </label>
  </div>

  <v-form-text :state="languagesState()" visible-states="invalid">
    Please select at least 3 languages.
  </v-form-text>

  <v-button @click="validate()" class="mt-5">Send</v-button>

  <div class="mt-5">
    <span class="font-semibold">Languages:</span>
    {{ languagesModel }}
  </div>
</template>

<script>
import { ref } from "vue";

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

    let languagesModel = ref([]);
    let languagesValidated = ref(false);

    let validate = () => {
      languagesValidated.value = true;
    };

    let languagesState = () => {
      return languagesValidated.value
        ? languagesModel.value.length >= 3
          ? "valid"
          : "invalid"
        : "";
    };

    return {
      languages,
      validate,
      languagesState,
      languagesModel,
      languagesValidated,
    };
  },
};
</script>
