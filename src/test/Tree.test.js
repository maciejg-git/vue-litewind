import { render, fireEvent, prettyDOM, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Tree from "../components/vTree.vue";
import ExclamationCircle from "./icons/exclamation-circle";
import * as styles from "../styles/components";

let global = {
  provide: {
    mods: styles,
  },
};

const items = [
  {
    name: "Directory",
    id: 17,
    children: [
      { name: "Some item", id: 1 },
      { name: "Another item", id: 2 },
      { name: "Third", id: 3 },
      { name: "File" },
      {
        name: "Sub directory",
        id: 5,
        children: [
          {
            name: "Another sub directory",
            id: 6,
            children: [
              { name: "Content", id: 7 },
              { name: "Another item", id: 8 },
            ],
          },
          { name: "Fourth", id: 9 },
          { name: "Another file", id: 10 },
          { name: "Video file", id: 11 },
          { name: "Secret item", id: 12 },
          {
            name: "More content here",
            id: 13,
            children: [
              { name: "Another video file", id: 14 },
              { name: "Fifth", id: 15 },
            ],
          },
        ],
      },
      { name: "Sixth item", id: 16 },
    ],
  },
];

const itemsModifiedKeys = [
  {
    name: "Directory",
    value: 17,
    children: [
      { name: "Some item", value: 1 },
      { name: "Another item", value: 2 },
      { name: "Third", value: 3 },
      { name: "File" },
      {
        name: "Sub directory",
        value: 5,
        children: [
          {
            name: "Another sub directory",
            value: 6,
            children: [
              { name: "Content", value: 7 },
              { name: "Another item", value: 8 },
            ],
          },
          { name: "Fourth", value: 9 },
          { name: "Another file", value: 10 },
          { name: "Video file", value: 11 },
          { name: "Secret item", value: 12 },
          {
            name: "More content here",
            value: 13,
            children: [
              { name: "Another video file", value: 14 },
              { name: "Fifth", value: 15 },
            ],
          },
        ],
      },
      { name: "Sixth item", value: 16 },
    ],
  },
];

test("renders component", async () => {
  const { getAllByRole, queryByRole } = render(Tree, {
    global,
    props: {
      items,
    },
  });

  expect(queryByRole("tree")).toBeInTheDocument();
  await waitFor(() => {
    expect(getAllByRole("treeitem", { hidden: true }).length).toBe(17);
  });
});

test("auto open all items on mount (auto-open-all prop)", async () => {
  const { getAllByRole } = render(Tree, {
    global,
    props: {
      items,
      autoOpenAll: true,
    },
  });

  await waitFor(() => {
    expect(getAllByRole("treeitem").length).toBe(17);
  });
});

test("auto open root node on mount (auto-open-root prop)", async () => {
  const { getAllByRole } = render(Tree, {
    global,
    props: {
      items,
      autoOpenRoot: true,
    },
  });

  await waitFor(() => {
    expect(getAllByRole("treeitem").length).toBe(7);
  });
});

test("filter items (filter prop)", async () => {
  const { getAllByRole } = render(Tree, {
    global,
    props: {
      items,
      autoOpenAll: true,
      filter: "item",
    },
  });

  await waitFor(() => {
    expect(getAllByRole("treeitem").length).toBe(9);
  });
});

test("renders checkboxes (show-checkboxes prop)", async () => {
  const { getAllByRole, queryByRole } = render(Tree, {
    global,
    props: {
      items,
      showCheckboxes: true,
    },
  });

  expect(queryByRole("tree")).toBeInTheDocument();
  await waitFor(() => {
    expect(getAllByRole("checkbox", { hidden: true }).length).toBe(17);
  });
});

// FIXME
test.skip("renders placeholder icons (placeholder-item-icon prop)", async () => {
  const { getAllByRole, queryByRole, debug } = render(Tree, {
    global,
    props: {
      items,
      placeholderItemIcon: ExclamationCircle,
    },
  });

  expect(queryByRole("tree")).toBeInTheDocument();
  debug();
  await waitFor(() => {
    expect(getAllByRole("checkbox", { hidden: true }).length).toBe(17);
  });
});

describe("opens and closes directory on click", () => {
  test("open", async () => {
    const { getAllByRole, queryByRole, getByText, getByRole } = render(Tree, {
      global,
      props: {
        items,
      },
    });

    let root = getByText("Directory");
    await userEvent.click(root);

    expect(queryByRole("button", { name: "Fourth" })).not.toBeInTheDocument();

    let directory = getByText("Sub directory");
    expect(directory).toBeInTheDocument();
    await userEvent.click(directory);

    expect(getByRole("button", { name: "Fourth" })).toBeInTheDocument();
  });

  test("close", async () => {
    const { getAllByRole, queryByRole, getByText, getByRole } = render(Tree, {
      global,
      props: {
        items,
      },
    });

    let root = getByText("Directory");
    await userEvent.click(root);

    expect(queryByRole("button", { name: "Fourth" })).not.toBeInTheDocument();

    let directory = getByText("Sub directory");
    expect(directory).toBeInTheDocument();
    await userEvent.click(directory);
    await userEvent.click(directory);

    expect(queryByRole("button", { name: "Fourth" })).not.toBeInTheDocument();
  });
});

describe("emits events", () => {
  test("input:selected after clicking items checkbox", async () => {
    const { getAllByRole, queryByRole, emitted } = render(Tree, {
      global,
      props: {
        items,
        showCheckboxes: true,
        autoOpenAll: true,
      },
    });

    await new Promise((r) => setTimeout(r, 2000));
    expect(queryByRole("tree")).toBeInTheDocument();
    let checkbox = getAllByRole("checkbox");
    await userEvent.click(checkbox[5]);
    expect(emitted("input:selected")[0][0][0].name).toBe("Sub directory");
  });

  test("emits input:selected with keys (select-return-keys prop)", async () => {
    const { getAllByRole, queryByRole, emitted } = render(Tree, {
      global,
      props: {
        items,
        showCheckboxes: true,
        autoOpenAll: true,
        selectReturnKeys: true,
      },
    });

    await new Promise((r) => setTimeout(r, 2000));
    expect(queryByRole("tree")).toBeInTheDocument();
    let checkbox = getAllByRole("checkbox");
    await userEvent.click(checkbox[5]);
    expect(emitted("input:selected")[0][0][0]).toBe(5);
  });

  test("input:click after clicking item", async () => {
    const { getAllByRole, queryByRole, getByText, emitted } = render(Tree, {
      global,
      props: {
        items,
        showCheckboxes: true,
        autoOpenAll: true,
      },
    });

    let root = getByText("Directory");
    await userEvent.click(root);
    let directory = getByText("Sub directory");
    await userEvent.click(directory);

    expect(emitted("input:click")[1][0].name).toBe("Sub directory");
  });
});

test("uses correct item key (item-keys prop)", async () => {
  const { getAllByRole, queryByRole, emitted } = render(Tree, {
    global,
    props: {
      items: itemsModifiedKeys,
      showCheckboxes: true,
      autoOpenAll: true,
      selectReturnKeys: true,
      itemKey: "value",
    },
  });

  await new Promise((r) => setTimeout(r, 2000));
  expect(queryByRole("tree")).toBeInTheDocument();
  let checkbox = getAllByRole("checkbox");
  await userEvent.click(checkbox[5]);
  expect(emitted("input:selected")[0][0][0]).toBe(5);
});
