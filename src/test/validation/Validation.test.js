import { render, fireEvent, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Input from "../../components/vInput.vue";
import FormValidation from "../components/FormValidation.vue";
import CheckboxGroupValidation from "../components/CheckboxGroupValidation.vue";
import * as styles from "../../styles/components";

let global = {
  provide: {
    mods: styles,
  },
};

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
      global,
      props: {
        rules: ["required"],
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
      global,
      props: {
        rules: ["required"],
        modelValue: "a",
      },
    });

    let textbox = getByRole("textbox");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(queryByTestId("error-messages")).not.toBeInTheDocument();
  });
});

describe.skip("adds valid or invalid classes", () => {
  test("invalid", async () => {
    const { getByRole, getByTestId, queryByText } = render(Input, {
      global,
      props: {
        rules: ["required"],
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
      global,
      props: {
        rules: ["required"],
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

describe.skip("validate on", () => {
  test("blur (validation-on prop)", async () => {
    const { getByRole, getByTestId } = render(Input, {
      global,
      props: {
        rules: ["required"],
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
      global,
      props: {
        rules: ["required", { minLength: 3 }],
        validateOn: "immediate",
      },
    });

    await rerender({
      rules: ["required", { minLength: 3 }],
      validateOn: "immediate",
      modelValue: "a",
    });

    let wrapper = getByTestId("wrapper");
    expect(wrapper.className).toMatch(/-invalid/);
  });
});

test.skip("should always update state when validity changes (validation-mode prop)", async () => {
  const { getByRole, getByTestId, rerender } = render(Input, {
    global,
    props: {
      rules: ["required", { minLength: 3 }],
      validateMode: "eager",
      ...updateModel,
    },
  });

  let textbox = getByRole("textbox");
  let wrapper = getByTestId("wrapper");
  await fireEvent.update(textbox, "item");
  await rerender({
    rules: ["required", { minLength: 3 }],
    validateMode: "eager",
    modelValue,
  });
  await fireEvent.blur(textbox);
  expect(wrapper.className).toMatch(/-valid/);
});

describe("should emit", () => {
  test("default status, state and messages initially", async () => {
    const { getByRole, getByTestId, emitted } = render(Input, {
      global,
      props: {
        rules: ["required"],
      },
    });

    expect(emitted("validation:status")[0][0]).toEqual(defaultStatus);
    expect(emitted("validation:state")[0][0]).toMatch("");
    expect(emitted("validation:messages")[0][0]).toEqual({});
  });

  test("status, state and messages on touch", async () => {
    const { getByRole, getByTestId, emitted } = render(Input, {
      global,
      props: {
        rules: ["required"],
      },
    });

    let textbox = getByRole("textbox");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(emitted("validation:status")[1][0]).toEqual({
      touched: true,
      validated: false,
      dirty: false,
      required: false,
      valid: false,
      optional: false,
    });
    expect(emitted("validation:state")[1][0]).toMatch("invalid");
    expect(emitted("validation:messages")[1][0]).toEqual({
      required: "This field is required",
    });
  });
});

describe("should update status properties", () => {
  test("touch property on touch", async () => {
    const { getByRole, getByTestId, emitted } = render(Input, {
      global,
      props: {
        rules: ["required"],
      },
    });

    let textbox = getByRole("textbox");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(emitted("validation:status")[1][0]).toMatchObject({
      touched: true,
    });
  });

  test("dirty property on first input", async () => {
    const { getByRole, getByTestId, emitted, rerender } = render(Input, {
      global,
      props: {
        rules: ["required"],
        ...updateModel,
      },
    });

    let textbox = getByRole("textbox");

    await fireEvent.update(textbox, "item");

    await rerender({
      rules: ["required"],
      modelValue,
    });

    await fireEvent.blur(textbox);

    expect(emitted("validation:status")[1][0]).toMatchObject({
      dirty: true,
    });
  });

  test("optional property on not required inputs", async () => {
    const { getByRole, getByTestId, emitted } = render(Input, {
      global,
      props: {
        rules: [],
      },
    });

    let textbox = getByRole("textbox");
    await fireEvent.click(textbox);
    await fireEvent.blur(textbox);
    expect(emitted("validation:status")[1][0]).toMatchObject({
      optional: true,
    });
  });

  test("valid property on valid inputs", async () => {
    const { getByRole, getByTestId, emitted, rerender } = render(Input, {
      global,
      props: {
        rules: ["required", { minLength: 3 }],
        ...updateModel,
      },
    });

    let textbox = getByRole("textbox");

    await fireEvent.update(textbox, "item");

    await rerender({
      rules: ["required"],
      modelValue,
    });

    await fireEvent.blur(textbox);

    expect(emitted("validation:status")[1][0]).toMatchObject({
      valid: true,
    });
  });
});

describe.skip("state prop of input should override validation state", () => {
  test("'valid' state prop", async () => {
    const { getByRole, getByTestId } = render(Input, {
      global,
      props: {
        rules: ["required"],
        validationState: "valid",
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
      global,
      props: {
        rules: [],
        validationState: "invalid",
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
      global,
      props: {
        rules: [],
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

test("form is correctly validated (v-form exposed validate)", async () => {
  const { getByRole, queryAllByText } = render(FormValidation, {
    global,
    props: {},
  });

  let button = getByRole("button", { name: "validate" });

  await fireEvent.click(button);

  await waitFor(() => {
    expect(queryAllByText("This field is required")).toHaveLength(3);
  });
});

test("form is correctly reset (v-form exposed reset)", async () => {
  const { getByRole, getByLabelText, queryByText } = render(FormValidation, {
    global,
    props: {},
  });

  let button = getByRole("button", { name: "validate" });
  let resetButton = getByRole("button", { name: "reset" });
  let username = getByLabelText("username");
  let password = getByLabelText("password");

  await fireEvent.update(username, "username");
  await fireEvent.update(password, "password");

  await fireEvent.click(button);

  expect(username).toHaveDisplayValue("username");
  expect(password).toHaveDisplayValue("password");

  await waitFor(() => {
    expect(queryByText("This field is required")).toBeInTheDocument();
  });

  await fireEvent.click(resetButton);

  expect(username).toHaveDisplayValue("");
  expect(password).toHaveDisplayValue("");

  await waitFor(() => {
    expect(queryByText("This field is required")).not.toBeInTheDocument();
  });
});

test.skip("checkbox group is correctly validated (v-checkbox-group exposed validate)", async () => {
  const { getByRole, queryAllByText, queryAllByRole } = render(
    CheckboxGroupValidation,
    {
      global,
      props: {},
    }
  );

  let button = getByRole("button", { name: "validate" });

  await fireEvent.click(button);

  await waitFor(() => {
    queryAllByRole("checkbox").forEach((input) => {
      expect(input).toHaveClass("checkbox--invalid-state");
    });
  });
});

// test status validated
