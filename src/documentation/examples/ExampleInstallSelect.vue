<template>
  <v-select
    v-model="select"
    :items="[
      { text: 'true', value: true },
      { text: 'false', value: false },
    ]"
    :input="{
      styleIcon: 'true:valid false:invalid',
      icon: select ? 'b-check-lg' : 'b-x',
      variant: select,
    }"
    :card="{
      styleCard: 'menu shadow',
      base: 'flat-card',
    }"
    @click:icon="handleClickIcon"
    :offsetY="5"
    inline
  ></v-select>
</template>

<script setup>
import { ref } from "vue";

let select = ref(false);

let handleClickIcon = (ev) => {
  ev.stopPropagation();
  select.value = !select.value;
};
</script>
