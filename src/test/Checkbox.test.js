import { render, fireEvent, prettyDOM } from "@testing-library/vue";
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import Checkbox from "../components/vCheckbox.vue";
import * as styles from "../styles/components";

let global = {
  provide: {
    mods: styles,
  },
};

let modelValue = "";
let updateModel = {
  "onUpdate:modelValue": (ev) => (modelValue = ev),
};

test("renders component", () => {
  const { getByRole, getByText } = render(Checkbox, {
    global,
    props: {},
  });

  expect(getByRole("checkbox")).toBeInTheDocument()
});

test("checkbox is unchecked by default", () => {
  const { getByRole, getByText } = render(Checkbox, {
    global,
    props: {},
  });

  expect(getByRole("checkbox")).not.toBeChecked()
});

test("updates checkbox v-model", () => {
  const { getByRole, getByText } = render(Checkbox, {
    global,
    props: {
      modelValue: true,
    },
  });

  expect(getByRole("checkbox")).toBeChecked()
});

test("renders label", async () => {
  const { getByText } = render(Checkbox, {
    global,
    props: {
      label: "username"
    },
  });

  expect(getByText("username")).toBeInTheDocument();
});

test("clicking label checks", async () => {
  const { getByText, getByRole, rerender } = render(Checkbox, {
    global,
    props: {
      label: "username",
      ...updateModel,
    },
  });

  await userEvent.click(getByText("username"));

  await rerender({
    label: "username",
    modelValue,
  })

  expect(getByRole("checkbox")).toBeChecked()
});
