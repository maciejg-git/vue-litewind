import { render, fireEvent } from "@testing-library/vue"
import DatePicker from "../components/vDatePicker.vue"

test("renders component", () => {
   const { getByRole } = render(DatePicker, {
    props: {
      /* ... */
    }
  })

  getByRole("button", { name: "Previous year" })
})

test("select date", async () => {
   const { getByRole } = render(DatePicker, {
    props: {
      /* ... */
    }
  })

  let button = getByRole("button", { name: "1" })

  await fireEvent.click(button)
})
