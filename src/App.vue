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
  @apply h-screen dark:bg-dark-800
}
</style>
