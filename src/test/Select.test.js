import { render, fireEvent } from "@testing-library/vue";
import {prettyDOM} from '@testing-library/dom'
import Select from "../components/vSelect.vue";

test("renders component", () => {
  const { getByRole } = render(Select, {
    props: {},
  });

  getByRole("combobox");
});

test("opens select dropdown with no items", async () => {
  const { getByRole } = render(Select, {
    props: {},
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  getByRole("listbox")
});

test("does not open autocomplete dropdown with no items", async () => {
  const { getByRole, queryByRole } = render(Select, {
    props: {
      autocomplete: true,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  expect(queryByRole("listbox")).toBeNull()
});

// test("previous month", async () => {
//   const { getByRole, getByText, findByText } = render(DatePicker, {
//     props: {},
//   });
//
//   const button = getByRole("button", { name: "Previous month" });
//   getByText(dateTest);
//   await fireEvent.click(button);
// });
