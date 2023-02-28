<template>
  <p class="mx-4 font-semibold">
  Props:
  </p>
  <ul class="mx-4 divide-y divide-secondary-500">
    <li
      v-for="item in items"
      class="py-4"
    >
      <div class="flex">
        <code>
          {{ item.prop }}
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
});
</script>
