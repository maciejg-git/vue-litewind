import { render, fireEvent, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Tabs from "../components/vTabs.vue";
import Tab from "../components/vTab.vue";
import * as styles from "../styles/components";

let stubs = {
  "v-tab": Tab,
};

let global = {
  stubs,
  provide: {
    mods: styles,
  },
};

let tabs = [
  "<v-tab name='tab'>tab content</v-tab>",
  "<v-tab name='tab2'>tab2 content</v-tab>",
  "<v-tab name='tab3'>tab3 content</v-tab>",
  `<v-tab>
    <template #name>
        tab custom
    </template>
    tab custom content
  </v-tab>`,
];

test("renders component", async () => {
  const { getByRole, getAllByRole } = render(Tabs, {
    global,
    props: {},
    slots: {
      default: tabs,
    },
  });

  expect(getByRole("tablist")).toBeInTheDocument();
  await waitFor(() => {
    expect(getAllByRole("tab").length).toBe(4);
  });
});

test("selects first tab by default", async () => {
  const { getByRole, getAllByRole } = render(Tabs, {
    global,
    props: {},
    slots: {
      default: tabs,
    },
  });

  await waitFor(() => {
    expect(getByRole("tabpanel")).toBeVisible();
  });
});

test("change to tab on click", async () => {
  const { getByRole, getByText, findAllByRole, queryByRole } = render(Tabs, {
    global,
    props: {},
    slots: {
      default: tabs,
    },
  });

  let tab = await findAllByRole("tab");
  await fireEvent.click(tab[1]);
  await waitFor(() => {
    expect(queryByRole("tabpanel")).toHaveTextContent("tab2 content");
  });
});

test("renders tab name in name slot", async () => {
  const { getByRole, getAllByRole, findAllByRole, queryByRole } = render(Tabs, {
    global,
    props: {},
    slots: {
      default: tabs,
    },
  });

  let tab = await findAllByRole("tab");
  await fireEvent.click(tab[3]);
  await waitFor(() => {
    expect(queryByRole("tabpanel")).toHaveTextContent("tab custom content");
  });
  expect(tab[3]).toHaveTextContent("tab custom");
});

test("emits input:changed-tab on tab change", async () => {
  const { getByRole, getAllByRole, findAllByRole, emitted } = render(Tabs, {
    global,
    props: {},
    slots: {
      default: tabs,
    },
  });

  expect(emitted('input:changed-tab')[0][0]).toBe(0)
  let tab = await findAllByRole("tab");
  await fireEvent.click(tab[2]);
  expect(emitted('input:changed-tab')[1][0]).toBe(2)
});
