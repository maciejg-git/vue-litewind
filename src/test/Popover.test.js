import { render, fireEvent, prettyDOM, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import Popover from "../components/vPopover.vue";
import * as styles from "../styles/components";

let global = {
  stubs: {},
  provide: {
    mods: styles,
  },
}

let slots = {
  reference: "<button :ref='reference' v-on='onTrigger'>trigger</button>",
  default: "popover content",
}

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  window.ResizeObserver = ResizeObserver;
})

test("renders component", async () => {
  const { getByRole, getByText } = render(Popover, {
    props: {},
    slots,
    global,
  });

  expect(getByRole("button", { name: "trigger" })).toBeInTheDocument()
});

test("render opened (v-model)", async () => {
  const { getByText } = render(Popover, {
    props: {
      modelValue: true,
    },
    slots,
    global,
  });

  expect(getByText("popover content")).toBeInTheDocument()
});

describe('should open on', () => {
  test("click", async () => {
    const { getByRole, getByText } = render(Popover, {
      props: {
        trigger: "click",
      },
      slots,
      global,
    });

    await userEvent.click(getByRole("button"))
  expect(getByText("popover content")).toBeInTheDocument()
  });

  test("focus (click)", async () => {
    const { getByRole, getByText, queryByText } = render(Popover, {
      props: {
        trigger: "focus",
      },
      slots,
      global,
    });

    await userEvent.click(getByRole("button"))
  expect(getByText("popover content")).toBeInTheDocument()
  });

  test("focus (tab)", async () => {
    const { getByText, queryByText } = render(Popover, {
      props: {
        trigger: "focus",
      },
      slots,
      global,
    });

    await userEvent.tab()
  expect(getByText("popover content")).toBeInTheDocument()
  });

  test("hover", async () => {
    const { getByRole, getByText, queryByText } = render(Popover, {
      props: {
        trigger: "hover",
      },
      slots,
      global,
    });

    await userEvent.hover(getByRole("button"))
  expect(getByText("popover content")).toBeInTheDocument()
  });
})

describe('should close on', () => {
  test("click outside", async () => {
    const { getByRole, getByText, queryByText } = render(Popover, {
      props: {
        trigger: "click",
      },
      slots,
      global,
    });

    await userEvent.click(getByRole("button"))
    expect(getByText("popover content")).toBeInTheDocument()
    await userEvent.click(document.body)
    await waitFor(() => {
      expect(queryByText("popover content")).not.toBeInTheDocument()
    })
  });

  test("blur (focus trigger)", async () => {
    const { getByRole, getByText, queryByText } = render(Popover, {
      props: {
        trigger: "focus",
      },
      slots,
      global,
    });

    await userEvent.click(getByRole("button"))
    expect(getByText("popover content")).toBeInTheDocument()
    await userEvent.click(document.body)
    expect(queryByText("popover content")).not.toBeInTheDocument()
  });

  test("unhover (hover trigger)", async () => {
    const { getByRole, getByText, queryByText } = render(Popover, {
      props: {
        trigger: "hover",
      },
      slots,
      global,
    });

    await userEvent.hover(getByRole("button"))
    expect(getByText("popover content")).toBeInTheDocument()
    await userEvent.unhover(getByRole("button"))
    await waitFor(() => {
      expect(queryByText("popover content")).not.toBeInTheDocument()
    })
  });
})
