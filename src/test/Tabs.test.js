import { render, fireEvent, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom"
import Tabs from "../components/vTabs.vue";
import Tab from "../components/vTab.vue";

let tabs = [
  "<v-tab name='tab'>tab content</v-tab>",
  "<v-tab name='tab2'>tab2 content</v-tab>",
  "<v-tab name='tab3'>tab3 content</v-tab>",
];

let stubs = {
  "v-tab": Tab,
}

test("renders component", async () => {
  const { getByRole, getAllByRole } = render(Tabs, {
    props: {},
    slots: {
      default: tabs,
    },
    global: {
      stubs,
    },
  });

  expect(getByRole("tablist")).toBeInTheDocument()
  await waitFor(() => {
    expect(getAllByRole("tab").length).toBe(3)
  })
});

test("selects first tab by default", async () => {
  const { getByRole, getAllByRole } = render(Tabs, {
    props: {},
    slots: {
      default: tabs,
    },
    global: {
      stubs,
    },
  });

  await waitFor(() => {
    expect(getByRole("tabpanel")).toBeVisible()
  })
});

test("change to tab on click", async () => {
  const { getByRole, getByText, findAllByRole, queryByRole } = render(Tabs, {
    props: {},
    slots: {
      default: tabs,
    },
    global: {
      stubs,
    },
  });

  let tab = await findAllByRole("tab")
  await fireEvent.click(tab[1])
  await waitFor(() => {
    expect(queryByRole("tabpanel")).toHaveTextContent("tab2 content")
  })
});
