import { ref, nextTick } from "vue";
import useValidation from "../../components/composition/use-validation";
import useFormValidation from "../../components/composition/use-form-validation";

let defaultRules = ["required"];

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: false,
  optional: false,
  validated: false,
};

describe("returns correct initial values", () => {
  test("status, state and messages", () => {
    let value = ref("");

    let { status, state, messages } = useValidation({
      value,
      rules: defaultRules,
    });

    expect(status.value).toEqual(defaultStatus);
    expect(state.value).toBe("");
    expect(messages.value).toEqual({});
  });

  test("touch, formValidate and reset functions", () => {
    let value = ref("");

    let { touch, formValidate, reset } = useValidation({
      value,
      rules: defaultRules,
    });

    expect(typeof touch).toBe("function");
    expect(typeof formValidate).toBe("function");
    expect(typeof reset).toBe("function");
  });
});

describe("updates", () => {
  test("status on value change", async () => {
    let value = ref("");

    let { status, state, messages } = useValidation({
      value,
      rules: defaultRules,
    });

    value.value = "a";

    await nextTick();
    expect(status.value.dirty).toBe(true);
  });

  test("status on touch", () => {
    let value = ref("");

    let { status, state, messages, touch } = useValidation({
      value,
      rules: defaultRules,
    });

    touch();

    expect(status.value.touched).toBe(true);
  });

  test("status on formValidate", () => {
    let value = ref("");

    let { status, state, messages, formValidate } = useValidation({
      value,
      rules: defaultRules,
    });

    formValidate();

    expect(status.value.validated).toBe(true);
  });
});

describe("should set dirty, touched and optional status", () => {
  test("dirty on dirty inputs", async () => {
    let value = ref("");

    let { status, state, messages } = useValidation({
      value,
      rules: defaultRules,
    });

    value.value = "a";

    await nextTick();
    expect(status.value.dirty).toBe(true);
  });

  test("touched on touched inputs", () => {
    let value = ref("");

    let { status, state, messages, touch } = useValidation({
      value,
      rules: defaultRules,
    });

    touch();

    expect(status.value.touched).toBe(true);
  });

  test("optional on non required and empty imputs", () => {
    let value = ref("");

    let { status, state, messages, touch } = useValidation({
      value,
      rules: [{ minLength: 3 }],
    });

    touch();

    expect(status.value.optional).toBe(true);
  });
});

test("updates messages", () => {
  let value = ref("");

  let { status, state, messages, touch } = useValidation({
    value,
    rules: defaultRules,
  });

  touch();

  expect(messages.value).toHaveProperty("required");
});

test("sets external state", async () => {
  let value = ref("");
  let externalState = ref("");

  let { status, state, messages } = useValidation({
    value,
    rules: defaultRules,
    externalState,
  });

  expect(state.value).toBe("");

  externalState.value = "invalid";

  await nextTick();

  expect(state.value).toBe("invalid");
});

describe("validateOn option", () => {
  test("on blur", async () => {
    let value = ref("");

    let { status, state, messages, touch } = useValidation({
      value,
      rules: defaultRules,
      options: {
        validateOn: "blur",
      },
    });

    value.value = "a";
    await nextTick();
    expect(state.value).toBe("");

    value.value = "";
    await nextTick();
    expect(state.value).toBe("");

    touch();
    await nextTick();
    expect(state.value).toBe("invalid");
  });

  test("immediate", async () => {
    let value = ref("");

    let { status, state, messages, touch } = useValidation({
      value,
      rules: [...defaultRules, { minLength: 3 }],
      options: {
        validateOn: "immediate",
      },
    });

    value.value = "a";
    await nextTick();
    expect(state.value).toBe("invalid");

    value.value = "aaa";
    await nextTick();
    expect(state.value).toBe("valid");
  });

  test("form", () => {
    let value = ref("");

    let form = useFormValidation();

    let { status, state, messages, touch } = useValidation({
      form,
      value,
      rules: defaultRules,
    });

    expect(state.value).toBe("");

    form.validate();

    expect(state.value).toBe("invalid");
  });
});

describe("validateMode", () => {
  test("eager - validate on blur", async () => {
    let value = ref("");

    let { status, state, messages, touch } = useValidation({
      value,
      rules: defaultRules,
      options: {
        validateMode: "eager",
      },
    });

    value.value = "a";
    await nextTick();
    touch();
    expect(state.value).toBe("valid");
  });

  test("eager - validate immediate", async () => {
    let value = ref("");

    let { status, state, messages, touch } = useValidation({
      value,
      rules: defaultRules,
      options: {
        validateOn: "immediate",
        validateMode: "eager",
      },
    });

    value.value = "a";
    await nextTick();
    expect(state.value).toBe("valid");
  });

  test("silent - validate on blur", async () => {
    let value = ref("");

    let { status, state, messages, touch } = useValidation({
      value,
      rules: defaultRules,
      options: {
        validateOn: "blur",
        validateMode: "silent",
      },
    });

    value.value = "a";
    await nextTick();
    touch();
    expect(state.value).toBe("");
  });
});

test("adds each validator property to messages", async () => {
  let value = ref("");

  let { status, state, messages, touch } = useValidation({
    value,
    rules: [...defaultRules, "email", "alphanumeric", { minLength: 5 }],
  });

  touch();

  await nextTick();
  expect(messages.value).toHaveProperty("required");
  expect(messages.value).toHaveProperty("email");
  expect(messages.value).toHaveProperty("alphanumeric");
  expect(messages.value).toHaveProperty("minLength");
});

test("adds each validator property to status", async () => {
  let value = ref("");

  let { status, state, messages, touch } = useValidation({
    value,
    rules: [...defaultRules, "email", "alphanumeric", { minLength: 5 }],
  });

  touch();

  await nextTick();
  expect(status.value).toHaveProperty("required");
  expect(status.value).toHaveProperty("email");
  expect(status.value).toHaveProperty("alphanumeric");
  expect(status.value).toHaveProperty("minLength");
});

describe("onUpdate callback", () => {
  test("is called once initially", () => {
    let value = ref("");

    let onUpdate = vi.fn();

    let { status, state, messages, touch } = useValidation({
      value,
      rules: defaultRules,
      onUpdate,
    });

    expect(onUpdate).toHaveBeenCalled();
  });

  test("is called on update", async () => {
    let value = ref("");

    let onUpdate = vi.fn();

    let { status, state, messages, touch } = useValidation({
      value,
      rules: defaultRules,
      onUpdate,
    });

    value.value = "a";

    await nextTick();

    expect(onUpdate).toHaveBeenCalledTimes(2);
  });

  test("is called on touch", () => {
    let value = ref("");

    let onUpdate = vi.fn();

    let { status, state, messages, touch } = useValidation({
      value,
      rules: defaultRules,
      onUpdate,
    });

    touch();

    expect(onUpdate).toHaveBeenCalledTimes(2);
  });

  test("is called on form validate", () => {
    let value = ref("");

    let onUpdate = vi.fn();

    let { status, state, messages, formValidate } = useValidation({
      value,
      rules: defaultRules,
      onUpdate,
    });

    formValidate();

    expect(onUpdate).toHaveBeenCalledTimes(2);
  });

  test("is called with status, state and messages arguments", () => {
    let value = ref("");

    let onUpdate = vi.fn();

    let { status, state, messages, touch } = useValidation({
      value,
      rules: defaultRules,
      onUpdate,
    });

    touch();

    expect(onUpdate).toHaveBeenCalledWith(status, state, messages);
  });
});

test("reset callback is called on reset", () => {
  let value = ref("");

  let onReset = vi.fn();

  let { status, state, messages, reset } = useValidation({
    value,
    rules: defaultRules,
    onReset,
  });

  reset();

  expect(onReset).toHaveBeenCalled();
});

test("returns correct object for array of inputs", () => {
  let value = ref("");
  let password = ref("");

  let inputs = useValidation([
    {
      value,
      rules: defaultRules,
      name: "username",
    },
    {
      value: password,
      rules: defaultRules,
      name: "password",
    },
  ]);

  expect(inputs).toHaveProperty("username");
  expect(inputs).toHaveProperty("password");
  expect(inputs.username).toHaveProperty("status");
  expect(inputs.password).toHaveProperty("status");
});

test("correctly validates function rules", async () => {
  let value = ref("");

  let { status, state, messages, touch } = useValidation({
    value,
    rules: [{ validator: (v) => v === "a" || "error" }],
  });

  expect(state.value).toBe("");

  value.value = "aa";
  await nextTick();
  touch();
  expect(state.value).toBe("invalid");
  expect(messages.value.validator).toBe("error");

  value.value = "a";
  await nextTick();
  expect(state.value).toBe("valid");
  expect(messages.value.validator).toBe(undefined);
});

test("adds inputs to form (useFormValidation)", () => {
  let value = ref("");
  let password = ref("");

  let form = useFormValidation();

  let inputs = useValidation([
    {
      form,
      value,
      rules: defaultRules,
      name: "username",
    },
    {
      form,
      value: password,
      rules: defaultRules,
      name: "password",
    },
  ]);

  expect(form.inputs[0].name).toBe("username");
  expect(form.inputs[1].name).toBe("password");
  expect(form.inputs[0]).toHaveProperty("status");
  expect(form.inputs[1]).toHaveProperty("status");
});

test("correctly validates form (useFormValidation)", () => {
  let value = ref("");
  let password = ref("");

  let form = useFormValidation();

  let inputs = useValidation([
    {
      form,
      value,
      rules: defaultRules,
      name: "username",
    },
    {
      form,
      value: password,
      rules: defaultRules,
      name: "password",
    },
  ]);

  form.validate();

  expect(inputs.username.state.value).toBe("invalid");
  expect(inputs.password.state.value).toBe("invalid");
});

test("correctly reset validation to inital state (reset function)", async () => {
  let value = ref("");

  let { status, state, messages, reset, touch } = useValidation({
    value,
    rules: defaultRules,
  });

  value.value = "a";
  await nextTick();
  touch();

  reset();

  expect(status.value).toEqual(defaultStatus);
  expect(state.value).toBe("");
  expect(messages.value).toEqual({});
});
