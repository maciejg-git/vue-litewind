import { render, fireEvent } from "@testing-library/vue";
import DatePicker from "../components/vDatePicker.vue";

let date = new Date().toDateString().split(" ")
let dateTest = `${date[1]} ${date[3]}`

test("renders component", () => {
  const { getByRole } = render(DatePicker, {
    props: {},
  });

  getByRole("button", { name: "Previous year" });
});

test("previous month", async () => {
  const { getByRole, getByText, findByText } = render(DatePicker, {
    props: {},
  });

  const button = getByRole("button", { name: "Previous month" });
  getByText(dateTest);
  await fireEvent.click(button);
  // await findByText("Mar 2022");
});

test("next year", async () => {
  const { getByRole, getByText, findByText } = render(DatePicker, {
    props: {},
  });

  const button = getByRole("button", { name: "Next year" });
  await fireEvent.click(button);
  // await findByText("Apr 2023");
});

test("renders buttons", async () => {
  const { getByRole } = render(DatePicker, {
    props: {
      buttons: true,
    },
  });

  getByRole("button", { name: "OK" });
  getByRole("button", { name: "Cancel" });
});

test("renders localized names", async () => {
  const { getByText } = render(DatePicker, {
    props: {
      locale: "pl-PL",
    },
  });

  getByText("pon.")
  getByText("wt.")
});
