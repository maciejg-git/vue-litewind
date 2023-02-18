<template>
  <v-checkbox-group
    v-model="languages"
    :rules="languagesRules"
    ref="group"
  >
    <div
      v-for="l in languagesData"
      class="my-2"
    >
      <v-checkbox
        :value="l"
        :id="'language-' + l"
        :label="l"
      ></v-checkbox>
    </div>
  </v-checkbox-group>
  <v-button @click="group.reset()">reset</v-button>
  <v-button @click="group.validate()">validate</v-button>
</template>

<script>
import { ref } from "vue";
import vCheckboxGroup from "../../components/vCheckboxGroup.vue"
import vCheckbox from "../../components/vCheckbox.vue"
import vButton from "../../components/vButton.vue"

export default {
  components: {
    vCheckboxGroup,
    vCheckbox,
    vButton,
  },
  setup() {
    let languages = ref([]);
    let languagesStatus = ref({});
    let languagesRules = {
      required: true,
      minElements: 3,
      maxElements: 5,
    };

    let group = ref(null);

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
      group,
    };
  },
};
</script>
