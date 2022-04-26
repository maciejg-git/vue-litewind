import { render, fireEvent, waitFor } from "@testing-library/vue"
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
   const { getByRole, getByText, findByText } = render(DatePicker, {
    props: {
      /* ... */
    }
  })

  const button = getByRole("button", { name: "Previous month" })

  const date = getByText("Apr 2022")

  await fireEvent.click(button)

  await findByText("Mar 2022")
})
