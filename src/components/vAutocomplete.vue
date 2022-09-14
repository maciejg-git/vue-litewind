<template>
  <v-select autocomplete>
    <template
      v-for="(name, slot) of $slots"
      #[slot]="slotProps"
    >
      <slot
        :name="slot"
        v-bind="slotProps"
      ></slot>
    </template>
  </v-select>
</template>

<script>
import vSelect from "./vSelect.vue";

export default {
  components: {
    vSelect,
  },
};
</script>
