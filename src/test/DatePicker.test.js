import { render } from "@testing-library/vue"
import DatePicker from "../components/vDatePicker.vue"

test("renders component", () => {
   const { getByRole } = render(DatePicker, {
    props: {
      /* ... */
    }
  })

  getByRole("button")
})
