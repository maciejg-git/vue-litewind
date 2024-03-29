import { render, fireEvent, prettyDOM, within } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Table from "../components/vTable.vue";
import data from "./data/company-simple.json";
import * as styles from "../styles/components";

let global = {
  provide: {
    mods: styles,
  },
};

let props = {
  items: data,
  primaryKey: "id",
};

let definition = [
  {
    key: "id",
  },
  {
    key: "first_name",
  },
  {
    key: "last_name",
  },
  {
    key: "city",
  },
  {
    key: "department",
  },
  {
    key: "title",
  },
];

afterEach(() => {
  definition = [
    {
      key: "id",
    },
    {
      key: "first_name",
    },
    {
      key: "last_name",
    },
    {
      key: "city",
    },
    {
      key: "department",
    },
    {
      key: "title",
    },
  ];
});

test("renders component", () => {
  const { getByRole } = render(Table, {
    global,
    props: {
      ...props,
    },
  });

  expect(getByRole("table")).toMatchSnapshot();
});

test("renders component without definition prop", () => {
  const { getAllByRole } = render(Table, {
    global,
    props: {
      ...props,
    },
  });

  expect(getAllByRole("row")).toHaveLength(51);
  expect(getAllByRole("cell")).toHaveLength(300);
});

test("renders component with definition prop", () => {
  const { getAllByRole } = render(Table, {
    global,
    props: {
      ...props,
      definition,
    },
  });

  expect(getAllByRole("row")).toHaveLength(51);
  expect(getAllByRole("cell")).toHaveLength(300);
});

describe("correctly handles definition prop", () => {
  test("reorders columns based on definition", () => {
    definition.splice(5, 0, definition.splice(4, 1)[0]);

    const { getAllByRole } = render(Table, {
      global,
      props: {
        ...props,
        definition,
      },
    });

    let headers = getAllByRole("columnheader");

    expect(headers).toHaveLength(6);
    expect(headers[0]).toHaveTextContent("Id");
    expect(headers[1]).toHaveTextContent("First Name");
    expect(headers[2]).toHaveTextContent("Last Name");
    expect(headers[3]).toHaveTextContent("City");
    expect(headers[4]).toHaveTextContent("Title");
    expect(headers[5]).toHaveTextContent("Department");
  });

  test("correctly names column headers from definition", () => {
    definition[0].label = "label";
    definition[1].label = "label2";
    definition[2].label = "label3";

    const { getAllByRole } = render(Table, {
      global,
      props: {
        ...props,
        definition,
      },
    });

    let headers = getAllByRole("columnheader");

    expect(headers).toHaveLength(6);
    expect(headers[0]).toHaveTextContent("label");
    expect(headers[1]).toHaveTextContent("label2");
    expect(headers[2]).toHaveTextContent("label3");
  });

  test("correctly adds new columns not defined in items", () => {
    definition[6] = {
      key: "edit",
    };

    const { getAllByRole } = render(Table, {
      global,
      props: {
        ...props,
        definition,
      },
    });

    let headers = getAllByRole("columnheader");

    expect(headers).toHaveLength(7);
    expect(headers[0]).toHaveTextContent("Id");
    expect(headers[1]).toHaveTextContent("First Name");
    expect(headers[2]).toHaveTextContent("Last Name");
    expect(headers[3]).toHaveTextContent("City");
    expect(headers[4]).toHaveTextContent("Department");
    expect(headers[5]).toHaveTextContent("Title");
    expect(headers[6]).toHaveTextContent("Edit");
  });

  test("correctly excludes columns not defined in definition", () => {
    definition.splice(4, 2);

    const { getAllByRole } = render(Table, {
      global,
      props: {
        ...props,
        definition,
      },
    });

    let headers = getAllByRole("columnheader");

    expect(headers).toHaveLength(4);
    expect(headers[0]).toHaveTextContent("Id");
    expect(headers[1]).toHaveTextContent("First Name");
    expect(headers[2]).toHaveTextContent("Last Name");
    expect(headers[3]).toHaveTextContent("City");
  });

  test("correctly hides columns (visible property)", () => {
    definition[4].visible = false;
    definition[5].visible = false;

    const { getAllByRole } = render(Table, {
      global,
      props: {
        ...props,
        definition,
      },
    });

    let headers = getAllByRole("columnheader");

    expect(headers).toHaveLength(4);
    expect(headers[0]).toHaveTextContent("Id");
    expect(headers[1]).toHaveTextContent("First Name");
    expect(headers[2]).toHaveTextContent("Last Name");
    expect(headers[3]).toHaveTextContent("City");
  });

  test("correctly disables filtering for columns (filterable property)", () => {
    definition[0].filterable = false;
    definition[1].filterable = false;
    definition[2].filterable = false;
    definition[3].filterable = false;
    definition[5].filterable = false;

    const { getAllByRole } = render(Table, {
      global,
      props: {
        ...props,
        definition,
        filter: "de",
      },
    });

    expect(getAllByRole("row")).toHaveLength(10);
  });
});

test("correctly filters items (filter prop)", () => {
  const { getAllByRole, getAllByText } = render(Table, {
    global,
    props: {
      ...props,
      filter: "de",
    },
  });

  expect(getAllByRole("row")).toHaveLength(17);
  expect(getAllByText(/[Dd]e/)).toHaveLength(21);
});

test("renders caption (caption slot)", () => {
  const { getByText } = render(Table, {
    global,
    props: {
      ...props,
    },
    slots: {
      caption: "caption",
    },
  });

  expect(getByText("caption")).toBeInTheDocument();
});

test("renders correct number of items per page", () => {
  const { getAllByRole } = render(Table, {
    global,
    props: {
      ...props,
      itemsPerPage: 10,
    },
  });

  expect(getAllByRole("row")).toHaveLength(11);
});

test("correctly changes page (page prop)", async () => {
  const { getAllByRole, rerender } = render(Table, {
    global,
    props: {
      ...props,
      itemsPerPage: 20,
      page: 1,
    },
  });

  let rows = getAllByRole("row");
  expect(rows).toHaveLength(21);
  expect(within(rows[1]).getAllByRole("cell")[0]).toHaveTextContent("1");

  await rerender({
    global,
    ...props,
    itemsPerPage: 20,
    page: 2,
  });

  rows = getAllByRole("row");
  expect(rows).toHaveLength(21);
  expect(within(rows[1]).getAllByRole("cell")[0]).toHaveTextContent("21");

  await rerender({
    global,
    ...props,
    itemsPerPage: 20,
    page: 3,
  });

  rows = getAllByRole("row");
  expect(rows).toHaveLength(11);
  expect(within(rows[1]).getAllByRole("cell")[0]).toHaveTextContent("41");
});

test("correctly sorts column", async () => {
  definition.forEach((i) => {
    i.sortable = true;
  });

  const { getAllByRole, getByRole } = render(Table, {
    global,
    props: {
      ...props,
      definition,
    },
  });

  // ascending
  await fireEvent.click(getByRole("columnheader", { name: "First Name" }));
  let rows = getAllByRole("row");
  expect(within(rows[1]).getAllByRole("cell")[1]).toHaveTextContent("Abdul");
  expect(within(rows[2]).getAllByRole("cell")[1]).toHaveTextContent("Adelbert");
  expect(within(rows[3]).getAllByRole("cell")[1]).toHaveTextContent("Amie");
  expect(
    within(rows[rows.length - 3]).getAllByRole("cell")[1]
  ).toHaveTextContent("Town");
  expect(
    within(rows[rows.length - 2]).getAllByRole("cell")[1]
  ).toHaveTextContent("Umberto");
  expect(
    within(rows[rows.length - 1]).getAllByRole("cell")[1]
  ).toHaveTextContent("Yale");

  // descending
  await fireEvent.click(getByRole("columnheader", { name: "First Name" }));
  rows = getAllByRole("row");
  expect(within(rows[1]).getAllByRole("cell")[1]).toHaveTextContent("Yale");
  expect(within(rows[2]).getAllByRole("cell")[1]).toHaveTextContent("Umberto");
  expect(within(rows[3]).getAllByRole("cell")[1]).toHaveTextContent("Town");
  expect(
    within(rows[rows.length - 3]).getAllByRole("cell")[1]
  ).toHaveTextContent("Amie");
  expect(
    within(rows[rows.length - 2]).getAllByRole("cell")[1]
  ).toHaveTextContent("Adelbert");
  expect(
    within(rows[rows.length - 1]).getAllByRole("cell")[1]
  ).toHaveTextContent("Abdul");
});

test("should not sort if column is not sortable (sortable property)", async () => {
  definition.forEach((i) => {
    i.sortable = false;
  });

  const { getAllByRole, getByRole } = render(Table, {
    global,
    props: {
      ...props,
      definition,
    },
  });

  let rows = getAllByRole("row");

  await fireEvent.click(getByRole("columnheader", { name: "First Name" }));

  expect(within(rows[1]).getAllByRole("cell")[1]).toHaveTextContent("Anthony");
  expect(within(rows[2]).getAllByRole("cell")[1]).toHaveTextContent("Richard");
  expect(within(rows[3]).getAllByRole("cell")[1]).toHaveTextContent("Chance");
  expect(
    within(rows[rows.length - 3]).getAllByRole("cell")[1]
  ).toHaveTextContent("Caron");
  expect(
    within(rows[rows.length - 2]).getAllByRole("cell")[1]
  ).toHaveTextContent("Antonie");
  expect(
    within(rows[rows.length - 1]).getAllByRole("cell")[1]
  ).toHaveTextContent("Abdul");
});
