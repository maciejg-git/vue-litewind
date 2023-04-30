<template>
  <div class="border p-6 py-8 border-dark-700 bg-secondary-50 dark:bg-[#171717] rounded-md">
    <component :is="name"></component>
  </div>
  <div class="flex mt-2">
    <v-button base="plain-button" style-button="bold" class="my-2 ml-auto" @click="isCodeVisible = !isCodeVisible">
      <span class="mr-2">
        Source
      </span>
      <v-chevron :switch="isCodeVisible"></v-chevron>
    </v-button>
  </div>

  <v-collapse v-model="isCodeVisible">
    <v-tabs
      v-if="showCode && (templateCode || scriptCode)"
      base="material-tabs"
    >
      <v-tab
        v-if="templateCode"
        name="Template"
      >
        <v-code
          :code="templateCode"
          template
          language="html"
        ></v-code>
      </v-tab>
      <v-tab
        v-if="scriptCode"
        name="Script"
      >
        <v-code
          :code="scriptCode"
          script
          language="js"
        ></v-code>
      </v-tab>
    </v-tabs>
  </v-collapse>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    name: { type: String, default: "" },
    showCode: { type: Boolean, default: true }
  },
  setup(props) {
    let templateCode = ref("");
    let scriptCode = ref("");
    let templateRegexp = /^<template>([\s\S]*?)^<\/template>/gm;
    let scriptRegexp = /^<script(?: setup)?>([\s\S]*?)^<\/script>/gm;
    let cutTemplateRegexp = /^.*<!-- CUT START -->([\s\S]*?)<!-- CUT END -->/gm;
    let cutScriptRegexp = /^.*\/\* CUT START \*\/([\s\S]*?)\/\* CUT END \*\//gm;
    let isCodeVisible = ref(false)

    import(`../examples/${props.name}.vue?raw`).then((i) => {
      templateCode.value = i.default.match(templateRegexp);
      scriptCode.value = i.default.match(scriptRegexp);

      templateCode.value = templateCode.value && templateCode.value[0];
      scriptCode.value = scriptCode.value && scriptCode.value[0];

      templateCode.value =
        templateCode.value && templateCode.value.replace(cutTemplateRegexp, "");
      scriptCode.value =
        scriptCode.value && scriptCode.value.replace(cutScriptRegexp, "");
    });

    return {
      templateCode,
      scriptCode,
      isCodeVisible,
    };
  },
};
</script>
