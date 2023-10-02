<template>
  <div class="example">
    <div
      class="rounded-md border bg-secondary-50 p-6 py-8 dark:border-dark-700 dark:bg-[#171717] overflow-auto"
    >
      <component :is="name"></component>
    </div>
    <div
      v-if="showCode && (templateCode || scriptCode)"
      class="mt-2 flex"
    >
      <v-button
        mod-button="preset:plain"
        class="mt-2 ml-auto"
        @click="isCodeVisible = !isCodeVisible"
      >
        <span class="mr-2">Source</span>
        <v-chevron :switch="isCodeVisible"></v-chevron>
      </v-button>
    </div>
    
    <v-collapse v-model="isCodeVisible">
      <v-tabs
        v-if="showCode && (templateCode || scriptCode)"
        base="materialTabs"
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
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    name: { type: String, default: "" },
    showCode: { type: Boolean, default: true },
    autoShowCode: { type: Boolean, default: false }
  },
  setup(props) {
    let templateCode = ref("");
    let scriptCode = ref("");
    let templateRegexp = /^<template>([\s\S]*?)^<\/template>/gm;
    let scriptRegexp = /^<script(?: setup)?>([\s\S]*?)^<\/script>/gm;
    let cutTemplateRegexp = /^.*<!-- CUT START -->([\s\S]*?)<!-- CUT END -->/gm;
    let cutScriptRegexp = /^.*\/\* CUT START \*\/([\s\S]*?)\/\* CUT END \*\//gm;
    let isCodeVisible = ref(props.autoShowCode);

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
