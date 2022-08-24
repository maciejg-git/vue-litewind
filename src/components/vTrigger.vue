<template>
  <slot
    name="default"
    v-bind="referenceSlot"
    :isOpen="referenceSlot.isOpen && referenceSlot.isOpen.value"
  ></slot>
</template>

<script>
import { addTrigger } from "../identifiers";

export default {
  props: {
    for: { type: String, default: undefined },
  },
  setup(props) {
    let referenceSlot = { reference: null, onTrigger: {} };

    addTrigger(props.for, (slotProps) => {
      referenceSlot = slotProps;
    });

    return {
      referenceSlot,
    };
  },
};
</script>
