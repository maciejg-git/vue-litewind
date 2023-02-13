import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Input from "../components/vInput.vue";

let modelValue = "";
let updateModel = {
  "onUpdate:modelValue": (ev) => (modelValue = ev),
};

describe("input is required", () => {
  test("invalid", async () => {
    const { getByRole, getByTestId, queryByText } = render(Input, {
      props: {
        rules: {
          required: true,
        },
      },
    });

    let textbox = getByRole("textbox");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(getByTestId("error-messages")).toBeInTheDocument();
    expect(queryByText("This field is required")).toBeInTheDocument();
  });

  test("valid", async () => {
    const { getByRole, getByTestId, queryByTestId } = render(Input, {
      props: {
        rules: {
          required: true,
        },
        modelValue: "a",
      },
    });

    let textbox = getByRole("textbox");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(queryByTestId("error-messages")).not.toBeInTheDocument();
  });
});

describe("adds valid or invalid classes", () => {
  test("invalid", async () => {
    const { getByRole, getByTestId, queryByText } = render(Input, {
      props: {
        rules: {
          required: true,
        },
      },
    });

    let textbox = getByRole("textbox");
    let wrapper = getByTestId("wrapper");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(wrapper.className).toMatch(/-invalid/);
  });

  test("valid", async () => {
    const { getByRole, getByTestId, queryByText } = render(Input, {
      props: {
        rules: {
          required: true,
        },
        validateMode: "eager",
        modelValue: "a",
      },
    });

    let textbox = getByRole("textbox");
    let wrapper = getByTestId("wrapper");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(wrapper.className).toMatch(/-valid/);
  });
});

describe("validate on", () => {
  test("blur (validation-on prop)", async () => {
    const { getByRole, getByTestId } = render(Input, {
      props: {
        rules: {
          required: true,
        },
        validateOn: "blur",
      },
    });

    let textbox = getByRole("textbox");
    let wrapper = getByTestId("wrapper");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(wrapper.className).toMatch(/-invalid/);
  });

  test("immediately (validation-on prop)", async () => {
    const { getByRole, getByTestId, rerender } = render(Input, {
      props: {
        rules: {
          required: true,
          minLength: 3,
        },
        validateOn: "immediate",
      },
    });

    await rerender({
      rules: {
        required: true,
        minLength: 3,
      },
      validateOn: "immediate",
      modelValue: "a",
    });

    let wrapper = getByTestId("wrapper");
    expect(wrapper.className).toMatch(/-invalid/);
  });
});

test("should always update state when validity changes (validation-mode prop)", async () => {
  const { getByRole, getByTestId, rerender } = render(Input, {
    props: {
      rules: {
        required: true,
        minLength: 3,
      },
      validateMode: "eager",
      ...updateModel,
    },
  });

  let textbox = getByRole("textbox");
  let wrapper = getByTestId("wrapper");
  await fireEvent.update(textbox, "item");
  await rerender({
    rules: {
      required: true,
      minLength: 3,
    },
    validateMode: "eager",
    modelValue,
  });
  await fireEvent.blur(textbox);
  expect(wrapper.className).toMatch(/-valid/);
});
