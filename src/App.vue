<template>
  <router-view/>
</template>

<script>
export default {
  setup() {
    document.title = "Vue-wind documentation"
  },
}
</script>

<style>
body {
  @apply dark:bg-[#191919]
}
</style>
