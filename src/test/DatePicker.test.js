import { render, fireEvent } from "@testing-library/vue";
import DatePicker from "../components/vDatePicker.vue";

let date = new Date()

let today = date.toDateString().split(" ")
let todayTest = `${date[1]} ${date[3]}`

date = new Date()

let nextMonth = new Date(date.setMonth(date.getMonth() + 1)).toDateString().split(" ")
let nextMonthTest = `${nextMonth[1]} ${nextMonth[3]}`

date = new Date()

let prevMonth = new Date(date.setMonth(date.getMonth() - 1)).toDateString().split(" ")
let prevMonthTest = `${prevMonth[1]} ${prevMonth[3]}`

test("renders component", () => {
  const { getByRole, getByText } = render(DatePicker, {
    props: {},
  });

  getByRole("button", { name: "Previous year" });
  getByRole("button", { name: "Next year" });
  getByRole("button", { name: "Previous month" });
  getByRole("button", { name: "Next month" });
  getByRole("button", { name: "1" });
  getByText("Mon")
  getByText("Tue")
});

test("previous month", async () => {
  const { getByRole, findByText } = render(DatePicker, {
    props: {},
  });

  const button = getByRole("button", { name: "Previous month" });
  await fireEvent.click(button);
  await findByText(prevMonthTest);
});

test("previous month", async () => {
  const { getByRole, findByText } = render(DatePicker, {
    props: {},
  });

  const button = getByRole("button", { name: "Next month" });
  await fireEvent.click(button);
  await findByText(nextMonthTest);
});

test("next year", async () => {
  const { getByRole } = render(DatePicker, {
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
