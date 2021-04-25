<template>
  <nav :class="classes">
    <a class="navbar-brand ms-2" href="#">Navbar</a>
    <slot name="default"></slot>
    item 2
  </nav>
</template>

<script>
import { ref, onMounted, computed } from "vue"

export default {
  props: {
  },
  setup(props) {
    let classes = computed(() => {
      return {
        'v-navbar': true,
        'p-1': true,
      }

    })
    return {
      classes,
    }
  }
}
</script>

<style scoped>
.v-navbar {
  position: relative;
  display: flex;
}
</style>
