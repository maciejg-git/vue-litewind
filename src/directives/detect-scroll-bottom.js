export default {
  mounted(el, binding) {
    el.addEventListener("scroll", () => {
      if (el.offsetHeight + el.scrollTop + 100 >= el.scrollHeight) {
        binding.value();
      }
    });
  },
};
