<template>
  <div class="overflow-y-auto max-h-[400px] mt-5 w-full">
    <div class="px-2 pb-2">
      <template v-for="ev in events">
        <div class="py-1">
          <code class="code-word">{{ ev.ev }}</code>
          {{ ev.data }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: { type: Array, default: [] },
  },
};
</script>
