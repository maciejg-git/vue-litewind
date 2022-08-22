import { addId, removeId } from "../identifiers.js"

export default {
  mounted(el, binding) {
    el.id = binding.arg || binding.value
    addId(el.id, el, null)
  },
  beforeUnmount(el) {
    removeId(el.id, "trigger")
  }
};
