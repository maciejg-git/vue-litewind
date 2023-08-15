<template>
  <input
    type="checkbox"
    :class="[
     'form-checkbox',
      classes.checkbox.value,
      ($attrs.disabled === '' || $attrs.disabled === true) && 'disabled'
    ]"
  />
</template>

<script setup>
import { inject } from "vue"
import useTailwindStyles from "./composition/use-tailwind-styles"
import { sharedProps, sharedModProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("checkbox", ["Checkbox"]),
});

let { checkbox } = inject("mods", {})

let elements = {
  checkbox: null,
  label: null,
}

let { classes } = useTailwindStyles(props, checkbox, elements)
console.log(classes)
</script>

<style scoped></style>
