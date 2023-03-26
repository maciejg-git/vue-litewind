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
  @apply h-screen dark:bg-[#191919]
}
</style>
