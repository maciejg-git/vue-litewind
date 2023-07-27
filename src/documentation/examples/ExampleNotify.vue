<template>
  <v-notify-container direction="top" :delay="2000" class="top-10 left-1/2 w-[200px]">
    <!-- <template #default="{ id, text }"> -->
    <!--   slot {{ id }} -->
    <!--   slot {{ text }} -->
    <!-- </template> -->
  </v-notify-container>
  <v-button @click="notify.push('notify')">Add notify</v-button>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useNotify } from "../../components/composition/use-notify"

let notify = useNotify()

setTimeout(() => {
notify.push({text: "notify", header: "header"})
notify.push("notify")
notify.push("notify")

}, 1000)

</script>

