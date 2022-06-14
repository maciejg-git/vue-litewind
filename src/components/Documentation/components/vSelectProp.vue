<template>
  <v-select
    v-model="modelValue"
    style-icon="true:valid false:invalid"
    :variant="modelValue"
    :icon="modelValue ? 'b-check-lg' : 'b-x'"
  >
    <option :value="true">true</option>
    <option :value="false">false</option>
  </v-select>
</template>

<script>
export default {
  props: {
    modelValue: { type: Boolean, default: undefined },
  },
};
</script>
