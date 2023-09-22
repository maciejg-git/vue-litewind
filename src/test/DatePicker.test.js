import { render, fireEvent, prettyDOM } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Checkbox from "../components/vCheckbox.vue";
import * as styles from "../styles/components";

let global = {
  provide: {
    mods: styles,
  },
};

test("renders component", () => {
  const { getByRole } = render(Checkbox, {
    global,
    props: {},
  });

  expect(getByRole("checkbox")).toBeInTheDocument();
});

test("renders component with label", () => {
  const { getByRole, getByText } = render(Checkbox, {
    global,
    props: {
      label: "username",
    },
  });

  expect(getByRole("checkbox")).toBeInTheDocument();
  expect(getByText("username")).toBeInTheDocument();
});

describe("checked and unchecked", () => {
  test("should be checked (v-model)", () => {
    const { getByRole } = render(Checkbox, {
    global,
      props: {
        modelValue: true,
      },
    });

    expect(getByRole("checkbox", { checked: true })).toBeInTheDocument();
  });

  test("should be unchecked (v-model)", () => {
    const { getByRole } = render(Checkbox, {
    global,
      props: {
        modelValue: false,
      },
    });

    expect(getByRole("checkbox", { checked: false })).toBeInTheDocument();
  });
});

test("clicking label should check", async () => {
  const { getByRole, getByText } = render(Checkbox, {
    global,
    props: {
      label: "username",
      modelValue: false,
    },
  });

  expect(getByText("username")).toBeInTheDocument();
  expect(getByRole("checkbox", { checked: false })).toBeInTheDocument();
  await fireEvent.click(getByText("username"))
  expect(getByRole("checkbox", { checked: true })).toBeInTheDocument();
});
