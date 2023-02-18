<template>
  <v-select
    v-model="select"
    :items="[true, false]"
    :input="{
      icon: select ? 'b-check-lg' : 'b-x',
      styleIcon: 'true:valid false:invalid',
      variant: select,
    }"
    :icon="select ? 'b-check-lg' : 'b-x'"
    :offsetY="5"
    inline
    @click:icon="select = !select"
  ></v-select>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props, { emit }) {
    let select = ref(false);

    return {
      select,
    };
  },
};
</script>
