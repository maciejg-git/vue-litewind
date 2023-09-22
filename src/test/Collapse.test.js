import { render, fireEvent, prettyDOM, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Collapse from "../components/vCollapse.vue";
import Accordion from "./components/Accordion.vue";
import * as styles from "../styles/components";

let global = {
  provide: {
    mods: styles,
  },
};

let slots = {
  default: "<div>collapse content</div>",
};

test("renders component", async () => {
  const { getByRole, getByText, queryByText } = render(Collapse, {
    global,
    props: {
      modelValue: true,
    },
    slots: {
      ...slots,
      reference: "<button v-on='onTrigger'>trigger</button>",
    },
  });

  expect(getByText("collapse content")).toBeInTheDocument();
  expect(getByRole("button", { name: "trigger" })).toBeInTheDocument();
  await waitFor(() => {
    expect(queryByText("collapse content")).toBeVisible();
  });
});

describe("reference element click", () => {
  test("should uncollapse on reference click", async () => {
    const { getByRole, queryByText } = render(Collapse, {
      global,
      props: {
        modelValue: false,
      },
      slots: {
        ...slots,
        reference: "<button v-on='onTrigger'>trigger</button>",
      },
    });

    await fireEvent.click(getByRole("button", { name: "trigger" }));
    expect(queryByText("collapse content")).toBeVisible();
  });

  test("should collapse on reference click", async () => {
    const { getByRole, queryByText } = render(Collapse, {
      global,
      props: {
        modelValue: true,
      },
      slots: {
        ...slots,
        reference: "<button v-on='onTrigger'>trigger</button>",
      },
    });

    await fireEvent.click(getByRole("button", { name: "trigger" }));
    await waitFor(() => {
      expect(queryByText("collapse content")).not.toBeVisible();
    });
  });
});

test("updates isOpen slot prop", async () => {
  const { getByRole, getByText } = render(Collapse, {
    global,
    props: {},
    slots: {
      ...slots,
      reference:
        "<button v-on='onTrigger'>{{ isOpen ? 'isOpen true' : 'isOpen false' }}</button>",
    },
  });

  fireEvent.click(getByRole("button", { name: "isOpen false" }));
  expect(getByText("collapse content")).toBeInTheDocument();
  await waitFor(() => {
    expect(getByRole("button", { name: "isOpen true" })).toBeInTheDocument();
  });
});

describe("accordion", () => {
  test("renders accordion", () => {
    const { getByRole, getByText } = render(Accordion, {
      global,
      props: {},
    });

    expect(getByText("accordion content")).not.toBeVisible();
    expect(getByText("accordion content 2")).not.toBeVisible();
    expect(getByText("accordion content 3")).not.toBeVisible();
    expect(
      getByRole("button", { name: "Toggle collapse" })
    ).toBeInTheDocument();
    expect(
      getByRole("button", { name: "Toggle collapse 2" })
    ).toBeInTheDocument();
    expect(
      getByRole("button", { name: "Toggle collapse 3" })
    ).toBeInTheDocument();
  });

  test("should uncollapse", async () => {
    const { getByRole, getByText } = render(Accordion, {
      global,
      props: {},
    });

    await fireEvent.click(getByRole("button", { name: "Toggle collapse" }));
    expect(getByText("accordion content")).toBeVisible();
    expect(getByText("accordion content 2")).not.toBeVisible();
    expect(getByText("accordion content 3")).not.toBeVisible();
  });

  test("should collapse", async () => {
    const { getByRole, getByText } = render(Accordion, {
      global,
      props: {},
    });

    await fireEvent.click(getByRole("button", { name: "Toggle collapse" }));
    expect(getByText("accordion content")).toBeVisible();
    expect(getByText("accordion content 2")).not.toBeVisible();
    expect(getByText("accordion content 3")).not.toBeVisible();
    await fireEvent.click(getByRole("button", { name: "Toggle collapse" }));
    expect(getByText("accordion content")).not.toBeVisible();
    expect(getByText("accordion content 2")).not.toBeVisible();
    expect(getByText("accordion content 3")).not.toBeVisible();
  });

  test("should uncollapse and collapse other", async () => {
    const { getByRole, getByText } = render(Accordion, {
      global,
      props: {},
    });

    await fireEvent.click(getByRole("button", { name: "Toggle collapse" }));
    expect(getByText("accordion content")).toBeVisible();
    expect(getByText("accordion content 2")).not.toBeVisible();
    expect(getByText("accordion content 3")).not.toBeVisible();
    await fireEvent.click(getByRole("button", { name: "Toggle collapse 2" }));
    expect(getByText("accordion content")).not.toBeVisible();
    expect(getByText("accordion content 2")).toBeVisible();
    expect(getByText("accordion content 3")).not.toBeVisible();
    await fireEvent.click(getByRole("button", { name: "Toggle collapse 3" }));
    expect(getByText("accordion content")).not.toBeVisible();
    expect(getByText("accordion content 2")).not.toBeVisible();
    expect(getByText("accordion content 3")).toBeVisible();
  });
});
