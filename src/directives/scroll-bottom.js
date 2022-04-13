export default {
  mounted(el, binding) {
    el.addEventListener('scroll', () => {  
  if (el.offsetHeight + el.scrollTop >= el.scrollHeight) {  
    binding.value()
  }  
})
  }
}
