<template>
  <!-- @slot default -->
  <slot
    name="default"
    v-bind="referenceSlot"
    :isOpen="unref(referenceSlot.isOpen)"
  ></slot>
</template>

<script setup>
import { unref, shallowRef, onUnmounted } from "vue";
import { registerTrigger, removeTrigger } from "./composition/use-trigger";

const props = defineProps({
  for: { type: String, default: undefined },
});

let referenceSlot = shallowRef({ reference: null, onTrigger: {} });

registerTrigger(props.for, (slotProps) => {
  referenceSlot.value = slotProps;
});

onUnmounted(() => removeTrigger(props.for))
</script>
