<template>
  <v-select
    v-model="select"
    style-icon="true:valid false:invalid"
    :variant="select"
    :icon="select ? 'b-check-lg' : 'b-x'"
    @input:icon-click="select = !select"
  >
    <option :value="true">true</option>
    <option :value="false">false</option>
  </v-select>
</template>

<script>
import { ref } from "vue"

export default {
  setup(props, { emit }) {
    let select = ref(false)

    return {
      select
    }
  }
};
</script>
