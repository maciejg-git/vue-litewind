import { addId } from "../identifiers.js"

export default {
  mounted(el, binding) {
    el.id = binding.value
    addId(binding.value, el, null)
  },
};
