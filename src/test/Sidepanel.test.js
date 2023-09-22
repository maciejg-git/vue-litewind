import { render, fireEvent, prettyDOM } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Sidepanel from "../components/vSidepanel.vue";
import * as styles from "../styles/components";

let global = {
  provide: {
    mods: styles,
  },
};

test("renders component (hidden)", () => {
  const { getByRole, getByText } = render(Sidepanel, {
    global,
    props: {},
  });

  expect(getByRole("complementary", { hidden: true })).toBeInTheDocument();
});

test("renders component (open)", () => {
  const { getByRole, getByText } = render(Sidepanel, {
    global,
    props: {
      modelValue: true,
    },
  });

  expect(getByRole("complementary")).toBeInTheDocument();
});

describe("close button", () => {
  test("renders close button by default", () => {
    const { getByRole, container } = render(Sidepanel, {
      global,
      props: {
        modelValue: true,
      },
    });

    expect(getByRole("complementary")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("should not render close button (show-close-button prop)", () => {
    const { getByRole, container } = render(Sidepanel, {
      global,
      props: {
        modelValue: true,
        showCloseButton: false,
      },
    });

    expect(getByRole("complementary")).toBeInTheDocument();
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });
});

describe("header", () => {
  test("renders header slot", () => {
    const { getByRole, getByText, container } = render(Sidepanel, {
      global,
      props: {
        modelValue: true,
      },
      slots: {
        header: "<h2>header</h2>",
      },
    });

    expect(getByRole("complementary")).toBeInTheDocument();
    expect(getByRole("heading")).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("should not render header slot (no-header prop)", () => {
    const { getByRole, getByText, container, queryByRole } = render(Sidepanel, {
      global,
      props: {
        modelValue: true,
        noHeader: true,
      },
      slots: {
        header: "<h2>header</h2>",
      },
    });

    expect(getByRole("complementary")).toBeInTheDocument();
    expect(queryByRole("heading")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });
});

describe("left or right sidepanel", () => {
  test("renders sidepanel on the right", () => {
    const { getByRole, getByText } = render(Sidepanel, {
      global,
      props: {
        modelValue: true,
      },
    });

    expect(getByRole("complementary")).toHaveClass("right-0");
  });

  test("renders sidepanel on the left", () => {
    const { getByRole, getByText } = render(Sidepanel, {
      global,
      props: {
        modelValue: true,
        sidebarLeft: true,
      },
    });

    expect(getByRole("complementary")).toHaveClass("left-0");
  });
});

test("close button should close sidepanel", async () => {
  const { getByRole, getByText, queryByRole } = render(Sidepanel, {
    global,
    props: {
      modelValue: true,
    },
  });

  expect(getByRole("complementary")).toBeInTheDocument();
  let button = getByRole("button", { name: "Close" });
  await fireEvent.click(button);
  expect(queryByRole("complementary")).not.toBeInTheDocument();
});
