<template>
  <router-view/>
</template>

<script>
export default {
  setup() {
    document.title = "Vue-Litewind documentation"
  },
}
</script>

<style>
body {
  @apply dark:bg-[#191919]
}
</style>
