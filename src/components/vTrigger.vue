<template>
  <slot
    name="default"
    v-bind="referenceSlot"
    :isOpen="unref(referenceSlot.isOpen)"
  ></slot>
</template>

<script setup>
import { unref, shallowRef } from "vue";
import { registerTrigger } from "../trigger";

const props = defineProps({
  for: { type: String, default: undefined },
});

let referenceSlot = shallowRef({ reference: null, onTrigger: {} });

registerTrigger(props.for, (slotProps) => {
  referenceSlot.value = slotProps;
});
</script>
