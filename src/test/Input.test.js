import { render, fireEvent, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Input from "../components/vInput.vue";
import ExclamationCircle from "./icons/exclamation-circle";

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
  });

  expect(getByRole("textbox")).toHaveValue("a");
});

test("renders label", async () => {
  const { getByText } = render(Input, {
    props: {
      label: "username",
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
    },
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

  let button = getByRole("button");
  await fireEvent.click(button);

  expect(emitted()).toHaveProperty("click:icon");
});

describe("clears input", () => {
  test("clear button click", async () => {
    const { getByRole, emitted } = render(Input, {
      props: {
        clearable: true,
        modelValue: "a",
      },
    });

    let button = getByRole("button");
    await fireEvent.click(button);

    expect(emitted("update:modelValue")[0][0]).toBe("");
  });

  test("emits clear event (custom-clearable prop)", async () => {
    const { getByRole, emitted } = render(Input, {
      props: {
        customClearable: true,
        modelValue: "a",
      },
    });

    let button = getByRole("button");
    await fireEvent.click(button);

    expect(emitted("click:clear-button")).not.toBe(undefined);
  });
});

describe("focus", () => {
  test("clicking label focuses input (generated id)", async () => {
    const { getByText, getByRole } = render(Input, {
      props: {
        label: "username",
      },
    });

    expect(getByRole("textbox")).not.toHaveFocus();
    await fireEvent.click(getByText("username"));
    expect(getByRole("textbox")).toHaveFocus();
  });

  test("clicking clear button should not focus input", async () => {
    const { getByRole, emitted } = render(Input, {
      props: {
        clearable: true,
        modelValue: "a",
      },
    });

    expect(getByRole("textbox")).not.toHaveFocus();
    let button = getByRole("button");
    await fireEvent.click(button);
    expect(getByRole("textbox")).not.toHaveFocus();
  });
});
