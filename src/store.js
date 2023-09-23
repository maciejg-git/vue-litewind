import { defineStore } from 'pinia'
import { ref } from "vue"

export const useStore = defineStore("store", () => {
  let filter = ref("")

  return {
    filter,
  }
})
