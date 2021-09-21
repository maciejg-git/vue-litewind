<template>
  <div class="my-5">
    <v-input v-model="name" :state="nameState()" class="mr-4" />
    <v-form-text
      :state="nameState()"
      :inline="example.inline"
      :visible-states="example.visibleStates"
      :messages="messages"
    >
      <template #prepend-message>
        <v-icon
          :icon-type="nameState()"
          transition="fade-scale-up"
          class="mr-2"
        />
      </template>
    </v-form-text>
  </div>

  <div class="mt-5">
    <div v-for="l in languages" class="flex items-center my-2">
      <v-checkbox
        v-model="languagesModel"
        :value="l"
        :state="languagesState()"
        :id="'language-' + l"
      />
      <label :for="'language-' + l" class="ml-3">
        {{ l }}
      </label>
    </div>
  </div>

  <v-form-text
    :state="languagesState()"
    :visible-states="example.visibleStates"
  >
    <v-icon
      :icon-type="languagesState()"
      transition="fade-scale-up"
      class="mr-2"
    />
    Please select at least 3 languages.
  </v-form-text>

  <v-button @click="validate()" style-button="" class="mt-5">Send</v-button>

  <v-button @click="reset()" name="button-link" class="mt-5 ml-4">
    <span class="font-semibold">Reset</span>
  </v-button>

  <div class="mt-5">
    <span class="font-semibold">Languages:</span>
    {{ languagesModel }}
  </div>
  <!-- CUT START -->
  <v-tabs name="tabs-material" class="mt-5">
    <v-tab name="Props">
      <div class="mt-5">
        <div class="mb-2">
          <label for="inline">inline:</label>
          <v-select id="inline" v-model="example.inline">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div class="mb-2">
          <label for="visible-states">visible-states:</label>
          <v-select id="visible-states" v-model="example.visibleStates">
            <option value="default,invalid,valid">default,invalid,valid</option>
            <option value="invalid,valid">invalid,valid</option>
            <option value="invalid">invalid</option>
            <option value="default">default</option>
          </v-select>
        </div>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      inline: false,
      visibleStates: "default,invalid,valid",
    });

    let messages = {
      valid: "OK",
      invalid: "This field cannot be empty",
      default: "Username",
    };

    let languages = ref([
      "english",
      "swedish",
      "korean",
      "german",
      "icelandic",
      "japanese",
    ]);

    let name = ref("");
    let languagesModel = ref([]);
    let languagesValidated = ref(false);
    let nameValidated = ref(false);

    let validate = () => {
      languagesValidated.value = true;
      nameValidated.value = true;
    };

    let languagesState = () => {
      return languagesValidated.value
        ? languagesModel.value.length >= 3
          ? "valid"
          : "invalid"
        : "";
    };

    let nameState = () => {
      return nameValidated.value
        ? name.value.length > 0
          ? "valid"
          : "invalid"
        : "";
    };

    let reset = () => {
      languagesValidated.value = false;
      nameValidated.value = false;
      languagesModel.value = [];
      name.value = "";
    };

    return {
      example,
      languages,
      validate,
      reset,
      languagesModel,
      name,
      languagesValidated,
      languagesState,
      nameState,
      nameValidated,
      messages,
    };
  },
};
</script>
