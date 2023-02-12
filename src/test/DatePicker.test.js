import { render, fireEvent, prettyDOM } from "@testing-library/vue";
import "@testing-library/jest-dom"
import DatePicker from "../components/vDatePicker.vue";

let pad = (d) => (d < 10 ? "0" + d : d);

let date = new Date()
date.setHours(0, 0, 0, 0)

let today = date.toDateString().split(" ")
let todayTest = `${date[1]} ${date[3]}`
let todayArray = [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())]

let exampleDate = [todayArray[0], todayArray[1], "01"].join("-")
let exampleDateFrom = [todayArray[0], todayArray[1], "01"].join("-")
let exampleDateTo = [todayArray[0], todayArray[1], "18"].join("-")

date = new Date()

let nextMonth = new Date(date.setMonth(date.getMonth() + 1)).toDateString().split(" ")
let nextMonthTest = `${nextMonth[1]} ${nextMonth[3]}`

date = new Date()

let prevMonth = new Date(date.setMonth(date.getMonth() - 1)).toDateString().split(" ")
let prevMonthTest = `${prevMonth[1]} ${prevMonth[3]}`

date = new Date()

let nextYear = new Date(date.setFullYear(date.getFullYear() + 1)).toDateString().split(" ")
let nextYearTest = `${nextYear[1]} ${nextYear[3]}`

date = new Date()

let prevYear = new Date(date.setFullYear(date.getFullYear() - 1)).toDateString().split(" ")
let prevYearTest = `${prevYear[1]} ${prevYear[3]}`

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

test("next month", async () => {
  const { getByRole, findByText } = render(DatePicker, {
    props: {},
  });

  const button = getByRole("button", { name: "Next month" });
  await fireEvent.click(button);
  await findByText(nextMonthTest);
});

test("previous year", async () => {
  const { getByRole, findByText } = render(DatePicker, {
    props: {},
  });

  const button = getByRole("button", { name: "Previous year" });
  await fireEvent.click(button);
  await findByText(prevYearTest);
});

test("next year", async () => {
  const { getByRole, findByText } = render(DatePicker, {
    props: {},
  });

  const button = getByRole("button", { name: "Next year" });
  await fireEvent.click(button);
  await findByText(nextYearTest);
});

test("renders buttons (buttons prop)", async () => {
  const { getByRole } = render(DatePicker, {
    props: {
      buttons: true,
    },
  });

  getByRole("button", { name: "OK" });
  getByRole("button", { name: "Cancel" });
});

test("renders buttons (primary-button-label, secondary-button-label props)", async () => {
  const { getByRole } = render(DatePicker, {
    props: {
      buttons: true,
      primaryButtonLabel: "primary button",
      secondaryButtonLabel: "secondary button",
    },
  });

  getByRole("button", { name: "primary button" });
  getByRole("button", { name: "secondary button" });
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

test("week starts on monday (monday-first-weekday prop)", async () => {
  const { getAllByTestId, rerender } = render(DatePicker, {
    props: {
      mondayFirstWeekday: false,
    },
  });

  let week = getAllByTestId("weekday")
  expect(week[0]).toHaveTextContent("Sun")

  await rerender({
    mondayFirstWeekday: true,
  })

  week = getAllByTestId("weekday")
  expect(week[0]).toHaveTextContent("Mon")
});

test("today is rendered", async () => {
  const { getByTestId } = render(DatePicker, {
    props: {},
  });

  expect(getByTestId("today")).toBeInTheDocument()
});

test("update v-model after selecting date (single mode)", async () => {
  const { getByRole, emitted } = render(DatePicker, {
    props: {},
  });
  
  fireEvent.click(getByRole("button", { name: "1" }))

  expect(emitted()).toHaveProperty("update:modelValue")
  let modelValue = emitted('update:modelValue')
  expect(modelValue[0][0]).toMatch(exampleDate)
});

test("update v-model prop (single mode)", async () => {
  const { getByRole, getByText, emitted } = render(DatePicker, {
    props: {
      modelValue: exampleDate,
    },
  });
  
  expect(getByRole("button", { name: "1" }).className).toMatch(/selected/)
});

test("update v-model after selecting date (range mode)", async () => {
  const { getByRole, emitted } = render(DatePicker, {
    props: {
      range: true,
    },
  });
  
  fireEvent.click(getByRole("button", { name: "1" }))
  fireEvent.click(getByRole("button", { name: "18" }))

  expect(emitted()).toHaveProperty("update:modelValue")
  let modelValue = emitted('update:modelValue')
  expect(Array.isArray(modelValue[0][0])).toBe(true)
  expect(modelValue[0][0][0]).toMatch(exampleDateFrom)
  expect(modelValue[0][0][1]).toMatch(exampleDateTo)
});

test("update v-model prop (range mode mode)", async () => {
  const { getByRole } = render(DatePicker, {
    props: {
      modelValue: [exampleDateFrom, exampleDateTo],
      range: true,
    },
  });
  
  Array(18).fill().map((v,i)=> i + 1).forEach((day) => {
    expect(getByRole("button", { name: day }).className).toMatch(/selected/)
  })
});
