<template>
  <pre class="">
    <code class="code" :class="'language-' + language">{{ code }}</code>
  </pre>
</template>

<script>
import { onMounted } from "vue";
import hljs from "highlight.js";

export default {
  props: {
    code: { type: String, default: undefined },
    language:{ type: String, default: undefined },
    template: { type: Boolean, default: false },
    script: { type: Boolean, default: false },
  },
  setup(props) {
    let code = props.code;

    if (props.template || props.script) {
      let templateRegexp = /^<template>([\s\S]*?)^<\/template>/gm;
      let scriptRegexp = /^<script>([\s\S]*?)^<\/script>/gm;
      let regexp = props.template
        ? templateRegexp
        : props.script
        ? scriptRegexp
        : templateRegexp;

      let cutTemplateRegexp = /<!-- CUT START -->([\s\S]*?)<!-- CUT END -->\r\n/gm;
      let cutScriptRegexp = /\/\* CUT START \*\/([\s\S]*?)\/\* CUT END \*\/\r\n/gm;
      let cutRegexp = props.template
        ? cutTemplateRegexp
        : props.script
        ? cutScriptRegexp
        : cutTemplateRegexp;

      code = props.code.match(regexp);
      code = code[0].replace(cutRegexp, "");
    }

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
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
  @apply whitespace-pre pl-4;
}
</style>
