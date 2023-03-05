<template>
  <div class="mb-12">
    <component :is="name"></component>
  </div>

  <v-tabs v-if="(templateCode || scriptCode) && (template || script)" base="material">
    <v-tab v-if="template" name="Template">
      <v-code :code="templateCode" template language="html"></v-code>
    </v-tab>
    <v-tab v-if="script" name="Script">
      <v-code :code="scriptCode" script language="js"></v-code>
    </v-tab>
  </v-tabs>
  <!-- <v-code v-if="template &#38;&#38; code" :code="code" template language="html"></v-code> -->
  <!-- <v-code v-if="script &#38;&#38; code" :code="code" script language="js"></v-code> -->
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    name: { type: String, default: "" },
    template: { type: Boolean, default: true },
    script: { type: Boolean, default: true },
  },
  setup(props) {
    let code = ref("")
    let templateCode = ref("")
    let scriptCode = ref("")
    let templateRegexp = /^<template>([\s\S]*?)^<\/template>/gm;
    let scriptRegexp = /^<script>([\s\S]*?)^<\/script>/gm;
      let cutTemplateRegexp =
        /^.*<!-- CUT START -->([\s\S]*?)<!-- CUT END -->/gm;
      let cutScriptRegexp =
        /^.*\/\* CUT START \*\/([\s\S]*?)\/\* CUT END \*\//gm;

    import(`../examples/${props.name}.vue?raw`).then((i) => {
      templateCode.value = i.default.match(templateRegexp)[0]
      scriptCode.value = i.default.match(scriptRegexp)[0]
      templateCode.value = templateCode.value.replace(cutTemplateRegexp, "")
      scriptCode.value = scriptCode.value.replace(cutScriptRegexp, "")
      // code.value = i.default
    })

    return {
      code,
      templateCode,
      scriptCode
    }
  },
}
</script>
