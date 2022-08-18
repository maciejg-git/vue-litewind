<template>
  <div class="mb-12">
    <component :is="name"></component>
  </div>

  <v-code v-if="template && code" :code="code" template language="html"></v-code>
  <v-code v-if="script && code" :code="code" script language="js"></v-code>
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

    import(`./examples/${props.name}.vue?raw`).then((i) => {
      code.value = i.default
    })

    return {
      code
    }
  },
}
</script>
