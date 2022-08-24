<template>
  <div class="mb-12">
    <component :is="name"></component>
  </div>

  <v-tabs v-if="code" base="material">
    <v-tab v-if="template" name="Template">
      <v-code :code="code" template language="html"></v-code>
    </v-tab>
    <v-tab v-if="script" name="Script">
      <v-code :code="code" script language="js"></v-code>
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

    import(`./examples/${props.name}.vue?raw`).then((i) => {
      code.value = i.default
    })

    return {
      code
    }
  },
}
</script>
