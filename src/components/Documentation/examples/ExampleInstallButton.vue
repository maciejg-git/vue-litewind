<template>
  <div class="flex items-center gap-4">
    <v-button name="button-plain">Large button</v-button>
    <v-button style-button="large">Large button</v-button>
    <v-button style-button="success">Success button</v-button>
    <v-button style-button="primary small">Small button</v-button>
    <v-button style-button="secondary tiny uppercase">Tiny button</v-button>
    <v-button style-button="visited:secondary small" :variant="variant" @click="variant = 'visited'">Small button</v-button>
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  setup() {
    let variant = ref("")

    return {
      variant,
    }
  }
}
</script>
