<template>
  <slot
    name="default"
    v-bind="referenceSlot"
    :isOpen="unref(referenceSlot.isOpen)"
  ></slot>
</template>

<script>
import { unref, shallowRef } from "vue"
import { addTrigger } from "../trigger";

export default {
  props: {
    for: { type: String, default: undefined },
  },
  setup(props) {
    let referenceSlot = shallowRef({ reference: null, onTrigger: {} })

    addTrigger(props.for, (slotProps) => {
      referenceSlot.value = slotProps;
    });

    return {
      referenceSlot,
      unref,
    };
  },
};
</script>
