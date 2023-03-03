<template>
  <p class="mx-4 my-2 font-semibold text-text-100">
  Props:
  </p>
  <ul class="mx-4 divide-y divide-secondary-500">
    <li
      v-for="item in items"
      class="py-4"
    >
      <div class="flex">
        <code>
          {{ item[props.reference] }}
        </code>
        <code v-for="type in item.type" class="code-word ml-auto">{{ type }}</code>
      </div>
      <span>
        {{ item.description }}
      </span>
    </li>
  </ul>
</template>

<script setup>
let props = defineProps({
  items: {
    type: Array,
    default: undefined,
  },
  reference: {
    type: String,
    default: undefined,
  },
});
</script>
