<template>
  <pre class="relative">
    <code ref="codeEl" class="code" :class="'language-' + language"><slot name="default">{{ code }}</slot></code>
  <div class="absolute right-4 top-4 text-text-500 dark:text-text-400">
    <v-icon v-if="template" name="b-code" class="w-10 h-10"></v-icon>
    <v-icon v-else-if="script" name="mdi-language-javascript" class="w-10 h-10"></v-icon>
  </div>
  </pre>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import hljs from "highlight.js";

export default {
  props: {
    code: { type: String, default: undefined },
    language: { type: String, default: undefined },
    template: { type: Boolean, default: false },
    script: { type: Boolean, default: false },
  },
  setup(props) {
    let code = props.code;

    let codeEl = ref(null);

    if (props.template || props.script) {
      let templateRegexp = /^<template>([\s\S]*?)^<\/template>/gm;
      let scriptRegexp = /^<script>([\s\S]*?)^<\/script>/gm;
      let regexp = props.template
        ? templateRegexp
        : props.script
        ? scriptRegexp
        : templateRegexp;

      let cutTemplateRegexp =
        /^.*<!-- CUT START -->([\s\S]*?)<!-- CUT END -->\r\n/gm;
      let cutScriptRegexp =
        /^.*\/\* CUT START \*\/([\s\S]*?)\/\* CUT END \*\/\r\n/gm;
      let cutRegexp = props.template
        ? cutTemplateRegexp
        : props.script
        ? cutScriptRegexp
        : cutTemplateRegexp;

      code = props.code.match(regexp);
      code = code[0].replace(cutRegexp, "");
    }

    onMounted(() => {
      hljs.highlightElement(codeEl.value);
    });

    return {
      codeEl,
      code,
    };
  },
};
</script>

<style scoped>
pre {
  @apply whitespace-normal my-5;
}
pre code {
  @apply text-sm whitespace-pre pl-4 py-6;
}
</style>
