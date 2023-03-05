<template>
  <div class="mb-12">
    <component :is="name"></component>
  </div>

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
    let scriptRegexp = /^<script>([\s\S]*?)^<\/script>/gm;
    let cutTemplateRegexp = /^.*<!-- CUT START -->([\s\S]*?)<!-- CUT END -->/gm;
    let cutScriptRegexp = /^.*\/\* CUT START \*\/([\s\S]*?)\/\* CUT END \*\//gm;

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
    };
  },
};
</script>
