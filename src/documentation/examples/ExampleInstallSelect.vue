<template>
  <v-select
    v-model="currentValue"
    :items="[
      { text: 'true', value: true },
      { text: 'false', value: false },
    ]"
    :input="{
      base: 'underlinedInput',
      modIcon: 'true?variant:valid false?variant:invalid',
      icon: currentValue ? 'b-check-lg' : 'b-x',
      variant: currentValue ? 'true' : 'false',
    }"
    @click:icon="handleClickIcon"
    :offsetY="5"
    inline
  ></v-select>
</template>

<script setup>
import { ref } from "vue";

let currentValue = ref(false);

let handleClickIcon = (ev) => {
  ev.stopPropagation();
  currentValue.value = !currentValue.value;
};
</script>
