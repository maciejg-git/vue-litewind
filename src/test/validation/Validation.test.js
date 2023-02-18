import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Input from "../../components/vInput.vue";

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: false,
  optional: false,
  validated: false,
};

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

describe("should emit", () => {
  test("default status, state and messages initially", async () => {
    const { getByRole, getByTestId, emitted } = render(Input, {
      props: {
        rules: {
          required: true,
        },
      },
    });

    expect(emitted("update:status")[0][0]).toEqual(defaultStatus);
    expect(emitted("update:state")[0][0]).toMatch("");
    expect(emitted("update:messages")[0][0]).toEqual({});
  });

  test("status, state and messages on touch", async () => {
    const { getByRole, getByTestId, emitted } = render(Input, {
      props: {
        rules: {
          required: true,
        },
      },
    });

    let textbox = getByRole("textbox");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(emitted("update:status")[1][0]).toEqual({
      touched: true,
      validated: false,
      dirty: false,
      required: false,
      valid: false,
      optional: false,
    });
    expect(emitted("update:state")[1][0]).toMatch("invalid");
    expect(emitted("update:messages")[1][0]).toEqual({
      required: "This field is required",
    });
  });
});

describe("should update status properties", () => {
  test("touch property on touch", async () => {
    const { getByRole, getByTestId, emitted } = render(Input, {
      props: {
        rules: {
          required: true,
        },
      },
    });

    let textbox = getByRole("textbox");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(emitted("update:status")[1][0]).toMatchObject({
      touched: true,
    });
  });

  test("dirty property on first input", async () => {
    const { getByRole, getByTestId, emitted, rerender } = render(Input, {
      props: {
        rules: {
          required: true,
        },
        ...updateModel,
      },
    });

    let textbox = getByRole("textbox");

    await fireEvent.update(textbox, "item");

    await rerender({
      rules: {
        required: true,
      },
      modelValue,
    });

    await fireEvent.blur(textbox);

    expect(emitted("update:status")[1][0]).toMatchObject({
      dirty: true,
    });
  });

  test("optional property on not required inputs", async () => {
    const { getByRole, getByTestId, emitted } = render(Input, {
      props: {
        rules: {},
      },
    });

    let textbox = getByRole("textbox");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(emitted("update:status")[1][0]).toMatchObject({
      optional: true,
    });
  });

  test("valid property on valid inputs", async () => {
    const { getByRole, getByTestId, emitted, rerender } = render(Input, {
      props: {
        rules: {
          required: true,
          minLength: 3,
        },
        ...updateModel,
      },
    });

    let textbox = getByRole("textbox");

    await fireEvent.update(textbox, "item");

    await rerender({
      rules: {
        required: true,
      },
      modelValue,
    });

    await fireEvent.blur(textbox);

    expect(emitted("update:status")[1][0]).toMatchObject({
      valid: true,
    });
  });
});

describe("state prop of input should override validation state", () => {
  test("'valid' state prop", async () => {
    const { getByRole, getByTestId } = render(Input, {
      props: {
        rules: {
          required: true,
        },
        state: "valid",
      },
    });

    let textbox = getByRole("textbox");
    let wrapper = getByTestId("wrapper");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(wrapper.className).toMatch(/-valid/);
  });

  test("'invalid' state prop", async () => {
    const { getByRole, getByTestId } = render(Input, {
      props: {
        rules: {},
        state: "invalid",
      },
    });

    let textbox = getByRole("textbox");
    let wrapper = getByTestId("wrapper");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(wrapper.className).toMatch(/-invalid/);
  });

  test("'' (default) state prop", async () => {
    const { getByRole, getByTestId } = render(Input, {
      props: {
        rules: {},
        state: "",
      },
    });

    let textbox = getByRole("textbox");
    let wrapper = getByTestId("wrapper");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(wrapper.className).not.toMatch(/-invalid/);
    expect(wrapper.className).not.toMatch(/-valid/);
  });
});

// test status validated
