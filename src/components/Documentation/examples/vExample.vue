<template>
  <component :is="name"></component>

  <v-code v-if="code" :code="code" template language="html"></v-code>
  <v-code v-if="code" :code="code" script language="js"></v-code>
</template>

<script>
import { ref } from "vue"

export default {
  props: {
    name: { type: String, default: ""},
  },
  setup(props) {
    let code = ref("")

    import(`./${props.name}.vue?raw`).then((i) => {
      code.value = i.default
    })

    return {
      code
    }
  },
}
</script>
