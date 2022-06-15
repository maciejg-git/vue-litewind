<template>
  <div class="my-5">
    <v-input v-model="username" type="text" class="mr-4" />

    <v-form-text
      :status="username"
      :inline="example.inline"
      :visible-states="example.visibleStates"
      :messages="messages"
    >
      <template #prepend-message>
        <v-icon class="mr-2" />
      </template>
    </v-form-text>
  </div>

  <!-- <div class="mt-5"> -->
  <!--   <div v-for="l in languages" class="flex items-center my-2"> -->
  <!--     <v-checkbox -->
  <!--       :value="l" -->
  <!--       :id="'language-' + l" -->
  <!--     /> -->
  <!--     <label :for="'language-' + l" class="ml-3"> -->
  <!--       {{ l }} -->
  <!--     </label> -->
  <!--   </div> -->
  <!-- </div> -->
  <!--  -->
  <!-- <v-form-text -->
  <!--   :visible-states="example.visibleStates" -->
  <!-- > -->
  <!--   <v-icon -->
  <!--     :icon-type="languagesState()" -->
  <!--     class="mr-2" -->
  <!--   /> -->
  <!--   Please select at least 3 languages. -->
  <!-- </v-form-text> -->
  <!--  -->
  <!-- <v-button @click="validate()" style-button="" class="mt-5">Send</v-button> -->
  <!--  -->
  <!-- <v-button @click="reset()" name="button-plain" class="mt-5 ml-4"> -->
  <!--   <span class="font-semibold">Reset</span> -->
  <!-- </v-button> -->

  <!-- <div class="mt-5"> -->
  <!--   <span class="font-semibold">Languages:</span> -->
  <!--   {{ languagesModel }} -->
  <!-- </div> -->
  <!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-5">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="inline">inline:</label>
          <v-select-prop id="inline" v-model="example.inline">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
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

    // let messages = {
    //   valid: "OK",
    //   invalid: "This field cannot be empty",
    //   default: "Username",
    // };
    let messages = {
      numeric: "numeric",
      required: "required",
      minLength: "min length",
    };

    let username = useValidateRef("", {
      minLength: 6,
      // alpha: true,
      numeric: true,
      // alphanumeric: true,
      required: true,
      passwordMin: () => {
        return true;
      },
    });

    let example = reactive({
      inline: false,
      visibleStates: "default,invalid,valid",
    });

    return {
      example,
      languages,
      messages,
      username,
    };
  },
};
</script>
