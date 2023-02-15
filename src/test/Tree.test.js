import { render, fireEvent, prettyDOM, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Tree from "../components/vTree.vue";
import ExclamationCircle from "./exclamation-circle"

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

test("renders component", async () => {
  const { getAllByRole, queryByRole } = render(Tree, {
    props: {
      items,
    },
  });

  expect(queryByRole("tree")).toBeInTheDocument()
  await waitFor(() => {
    expect(getAllByRole("treeitem", { hidden: true }).length).toBe(17)
  })
});

test("auto open all items on mount (auto-open-all prop)", async () => {
  const { getAllByRole } = render(Tree, {
    props: {
      items,
      autoOpenAll: true,
    },
  });

  await waitFor(() => {
    expect(getAllByRole("treeitem").length).toBe(17)
  })
});

test("auto open root node on mount (auto-open-root prop)", async () => {
  const { getAllByRole } = render(Tree, {
    props: {
      items,
      autoOpenRoot: true,
    },
  });

  await waitFor(() => {
    expect(getAllByRole("treeitem").length).toBe(7)
  })
});

test("filter items (filter prop)", async () => {
  const { getAllByRole } = render(Tree, {
    props: {
      items,
      autoOpenAll: true,
      filter: "item",
    },
  });

  await waitFor(() => {
    expect(getAllByRole("treeitem").length).toBe(9)
  })
});

test("renders checkboxes (show-checkboxes prop)", async () => {
  const { getAllByRole, queryByRole } = render(Tree, {
    props: {
      items,
      showCheckboxes: true,
    },
  });

  expect(queryByRole("tree")).toBeInTheDocument()
  await waitFor(() => {
    expect(getAllByRole("checkbox", { hidden: true }).length).toBe(17)
  })
});

// FIXME
test.skip("renders placeholder icons (placeholder-item-icon prop)", async () => {
  const { getAllByRole, queryByRole,debug } = render(Tree, {
    props: {
      items,
      placeholderItemIcon: ExclamationCircle,
    },
  });

  expect(queryByRole("tree")).toBeInTheDocument()
  debug()
  await waitFor(() => {
    expect(getAllByRole("checkbox", { hidden: true }).length).toBe(17)
  })
});
