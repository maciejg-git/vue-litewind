<template>
  <v-select
    :modelValue="modelValue"
    @update:modelValue="updateValue"
    :items="[
      { text: 'true', value: true },
      { text: 'false', value: false },
    ]"
    :input="{
      modIcon: 'true?variant:valid false?variant:invalid',
      icon: modelValue ? 'b-check-lg' : 'b-x',
      variant: modelValue ? 'true' : 'false',
    }"
    @click:icon="handleClickIcon"
    :offsetY="5"
    inline
  ></v-select>
</template>

<script setup>
let props = defineProps({
  modelValue: { type: Boolean, default: undefined },
});

let emit = defineEmits(["update:modelValue"]);

let updateValue = (value) => {
  emit("update:modelValue", value);
};

let handleClickIcon = (ev) => {
  ev.stopPropagation();
  emit("update:modelValue", !props.modelValue);
};
</script>
