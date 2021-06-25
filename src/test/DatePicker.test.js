import { mount } from '@vue/test-utils'
import DatePicker from "../components/vDatePicker.vue"

test("renders component", () => {
  const wrapper = mount(DatePicker)
  console.log(wrapper)
})
