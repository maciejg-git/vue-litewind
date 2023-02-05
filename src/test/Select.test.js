import { render, fireEvent } from "@testing-library/vue";
import Select from "../components/vSelect.vue";

const states = [
  {
    text: "Alabama",
    value: "Alabama",
  },
  {
    text: "Alaska",
    value: "Alaska",
  },
  {
    text: "American Samoa",
    value: "American Samoa",
  },
  {
    text: "Arizona",
    value: "Arizona",
  },
  {
    text: "Arkansas",
    value: "Arkansas",
  },
  {
    text: "California",
    value: "California",
  },
  {
    text: "Colorado",
    value: "Colorado",
  },
  {
    text: "Connecticut",
    value: "Connecticut",
  },
]

test("renders component", () => {
  const { getByRole } = render(Select, {
    props: {},
  });

  getByRole("combobox");
});

test("opens select dropdown with no items (click)", async () => {
  const { getByRole } = render(Select, {
    props: {},
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  getByRole("listbox")
});

test("opens select dropdown with no items (focus)", async () => {
  const { getByRole } = render(Select, {
    props: {},
  });

  let select = getByRole("combobox");
  await fireEvent.focus(select)
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

test("opens autocomplete on input update", async () => {
  const { getByRole, queryByRole, debug } = render(Select, {
    props: {
      items: states,
      autocomplete: true,
    },
  });

  let select = getByRole("combobox");
  // await fireEvent.update(select, "a")
  // debug()
});

test("renders options", async () => {
  const { getByRole, getAllByRole } = render(Select, {
    props: {
      items: states,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select)
  expect(getAllByRole("option").length).toBe(8)
});

// click outside
