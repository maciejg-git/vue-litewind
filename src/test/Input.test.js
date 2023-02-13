import { render, fireEvent, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom"
import Input from "../components/vInput.vue";
import ExclamationCircle from "./exclamation-circle"

test("renders component", () => {
  const { getByRole } = render(Input, {
    props: {},
  });

  expect(getByRole("textbox")).toBeInTheDocument();
});

test("updates v-model value", async () => {
  const { getByRole, rerender } = render(Input, {
    props: {},
  });

  expect(getByRole("textbox")).toHaveValue("");

  await rerender({
    modelValue: "a",
  })

  expect(getByRole("textbox")).toHaveValue("a");
});

test("renders label", async () => {
  const { getByText } = render(Input, {
    props: {
      label: "username"
    },
  });

  expect(getByText("username")).toBeInTheDocument();
});

test("renders loader", async () => {
  const { getByTestId } = render(Input, {
    props: {
      useLoader: true,
      isLoading: true,
    },
  });

  expect(getByTestId("spinner")).toBeInTheDocument();
});

test("renders icon (props)", async () => {
  const { container } = render(Input, {
    props: {
      icon: ExclamationCircle,
    },
  });

  expect(container.querySelector("svg")).toBeInTheDocument();
});

test("renders icon (slot)", async () => {
  const { container } = render(Input, {
    props: {},
    slots: {
      icon: ExclamationCircle,
    }
  });

  expect(container.querySelector("svg")).toBeInTheDocument();
});

test("renders clearable input", async () => {
  const { container } = render(Input, {
    props: {
      clearable: true,
    },
  });

  expect(container.querySelector("svg")).toBeInTheDocument();
});

test("emits click:icon", async () => {
  const { getByRole, emitted } = render(Input, {
    props: {
      icon: ExclamationCircle,
    },
  });

  let button = getByRole("button")
  await fireEvent.click(button)

  expect(emitted()).toHaveProperty("click:icon");
});

test("clears input", async () => {
  const { getByRole, emitted } = render(Input, {
    props: {
      clearable: true,
      modelValue: "a",
    },
  });

  let button = getByRole("button")
  await fireEvent.click(button)

  waitFor(() => {
    expect(getByRole("textbox")).toHaveDisplayValue("")
  })
  expect(emitted('update:modelValue')[0][0]).toBe("")
});
