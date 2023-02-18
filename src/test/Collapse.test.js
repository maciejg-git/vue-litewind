import { render, fireEvent, prettyDOM, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Collapse from "../components/vCollapse.vue";

let slots = {
  default: "<div>collapse content</div>",
};

describe("renders component", () => {
  test("v-model", () => {
    const { getByRole, getByText } = render(Collapse, {
      props: {
        modelValue: true,
      },
      slots,
    });

    expect(getByText("collapse content")).toBeInTheDocument();
  });

  test("reference slot", () => {
    const { getByRole, getByText } = render(Collapse, {
      props: {},
      slots: {
        ...slots,
        reference: "<button v-on='onTrigger'>trigger</button>",
      },
    });

    fireEvent.click(getByRole("button", { name: "trigger" }));
    expect(getByText("collapse content")).toBeInTheDocument();
  });
});

test("updates isOpen slot prop", async () => {
  const { getByRole, getByText } = render(Collapse, {
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
