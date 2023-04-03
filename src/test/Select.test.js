import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
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
];

const statesWithLabel = [
  {
    label: "Alabama",
    value: "Alabama",
  },
  {
    label: "Alaska",
    value: "Alaska",
  },
  {
    label: "American Samoa",
    value: "American Samoa",
  },
  {
    label: "Arizona",
    value: "Arizona",
  },
  {
    label: "Arkansas",
    value: "Arkansas",
  },
  {
    label: "California",
    value: "California",
  },
  {
    label: "Colorado",
    value: "Colorado",
  },
  {
    label: "Connecticut",
    value: "Connecticut",
  },
];

const statesValues = [
  {
    label: "Alabama",
    state: "Alabama",
  },
  {
    label: "Alaska",
    state: "Alaska",
  },
  {
    label: "American Samoa",
    state: "American Samoa",
  },
  {
    label: "Arizona",
    state: "Arizona",
  },
  {
    label: "Arkansas",
    state: "Arkansas",
  },
  {
    label: "California",
    state: "California",
  },
  {
    label: "Colorado",
    state: "Colorado",
  },
  {
    label: "Connecticut",
    state: "Connecticut",
  },
];

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  window.ResizeObserver = ResizeObserver;
})

test("renders component", () => {
  const { getByRole } = render(Select, {
    props: {},
  });

  getByRole("combobox");
});

describe("opens select menu", () => {
  test("opens select dropdown with no items (click)", async () => {
    const { getByRole } = render(Select, {
      props: {},
    });

    let select = getByRole("combobox");
    await fireEvent.click(select);
    expect(getByRole("listbox")).toBeInTheDocument();
  });

  test("opens select dropdown with no items (focus)", async () => {
    const { getByRole } = render(Select, {
      props: {},
    });

    let select = getByRole("combobox");
    await userEvent.tab(select);
    expect(getByRole("listbox")).toBeInTheDocument();
  });

  test("does not open autocomplete dropdown with no items", async () => {
    const { getByRole, queryByRole } = render(Select, {
      props: {
        autocomplete: true,
      },
    });

    let select = getByRole("combobox");
    await fireEvent.click(select);
    expect(queryByRole("listbox")).toBeNull();
  });

  test("opens autocomplete on input update", async () => {
    const { getByRole, findByRole } = render(Select, {
      props: {
        items: states,
        autocomplete: true,
      },
    });

    let select = getByRole("combobox");
    await fireEvent.click(select);
    let input = select.querySelector("input");
    await fireEvent.update(input, "a");
    await findByRole("listbox");
  });
});

test("renders options", async () => {
  const { getByRole, getAllByRole } = render(Select, {
    props: {
      items: states,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select);
  expect(getAllByRole("option").length).toBe(8);
});

test("filters options", async () => {
  const { getByRole, findAllByRole } = render(Select, {
    props: {
      items: states,
      autocomplete: true,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select);
  let input = select.querySelector("input");
  await fireEvent.update(input, "c");
  expect((await findAllByRole("option")).length).toBe(4);
});

test("filters options (filter-keys prop)", async () => {
  const { getByRole, findAllByRole } = render(Select, {
    props: {
      items: statesWithLabel,
      autocomplete: true,
      filterKeys: ["label"],
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select);
  let input = select.querySelector("input");
  await fireEvent.update(input, "c");
  expect((await findAllByRole("option")).length).toBe(4);
});

test("does not filter options (no-filter prop)", async () => {
  const { getByRole, findAllByRole } = render(Select, {
    props: {
      items: states,
      autocomplete: true,
      noFilter: true,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select);
  let input = select.querySelector("input");
  await fireEvent.update(input, "c");
  expect((await findAllByRole("option")).length).toBe(8);
});

describe("pagination", () => {
  test("paginates options", async () => {
    const { getByRole, getAllByRole } = render(Select, {
      props: {
        items: states,
        itemsPerPage: 2,
      },
    });

    let select = getByRole("combobox");
    await fireEvent.click(select);
    expect(getAllByRole("option").length).toBe(2);
  });

  test("does not paginate options (no-pagination prop)", async () => {
    const { getByRole, getAllByRole } = render(Select, {
      props: {
        items: states,
        itemsPerPage: 2,
        noPagination: true,
      },
    });

    let select = getByRole("combobox");
    await fireEvent.click(select);
    expect(getAllByRole("option").length).toBe(8);
  });
});

test("closes menu after selecting option in single mode", async () => {
  const { getByRole, getAllByRole, queryByRole } = render(Select, {
    props: {
      items: states,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select);
  let option = getAllByRole("option");
  await fireEvent.click(option[0]);
  expect(queryByRole("listbox")).toBeNull();
});

test("does no close menu after selecting option in multi value mode", async () => {
  const { getByRole, getAllByRole, queryByRole } = render(Select, {
    props: {
      items: states,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select);
  let option = getAllByRole("option");
  await fireEvent.click(option[0]);
  queryByRole("listbox");
});

test("selects item in single mode", async () => {
  const { getByRole, getAllByRole, queryByText } = render(Select, {
    props: {
      items: states,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select);
  let option = getAllByRole("option");
  await fireEvent.click(option[0]);
  queryByText("Alabama");
});

test("shows no items message", async () => {
  const { getByRole, getByText } = render(Select, {
    props: {
      emptyDataMessage: "empty",
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select);
  getByText("empty");
});

test("opens autocomplete on items update", async () => {
  const { getByRole, findByRole, rerender } = render(Select, {
    props: {
      items: [],
      noFilter: true,
      autocomplete: true,
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select);
  let input = select.querySelector("input");
  await fireEvent.update(input, "a");
  await rerender({
    items: states,
  });
  await findByRole("listbox");
});

describe("sets attributes for subcomponents", () => {
  test("input", async () => {
    const { getByText } = render(Select, {
      props: {
        items: [],
        input: {
          label: "username",
        }
      },
    });

    expect(getByText("username")).toBeInTheDocument()
  });
})

test("should use correct property to display text options (item-text prop)", async () => {
  const { getByRole, getAllByRole, getByText } = render(Select, {
    props: {
      items: statesValues,
      itemText: "label",
    },
  });

  let select = getByRole("combobox");
  await fireEvent.click(select);
  expect(getByText("Alaska")).toBeInTheDocument()
});

// click outside
