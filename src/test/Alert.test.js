import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import Alert from "../components/vAlert.vue";
import * as styles from "../styles/components";

let global = {
  provide: {
    mods: styles,
  },
};

test("renders component (v-model undefined)", () => {
  const { getByRole } = render(Alert, {
    global,
    props: {},
  });

  getByRole("alert");
});

test("renders component (v-model true)", () => {
  const { getByRole } = render(Alert, {
    global,
    props: {},
  });

  expect(getByRole("alert")).toBeInTheDocument();
});

test("does not render component (v-model false)", () => {
  const { getByRole, queryByRole } = render(Alert, {
    global,
    props: {
      modelValue: false,
    },
  });

  expect(queryByRole("alert")).not.toBeInTheDocument();
});
