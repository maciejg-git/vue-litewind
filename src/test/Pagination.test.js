import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom"
import Pagination from "../components/vPagination.vue";

test("renders buttons", () => {
  const { getByRole } = render(Pagination, {
    props: {},
  });

  expect(getByRole("button", { name: "Previous page" })).toBeInTheDocument();
  expect(getByRole("button", { name: "Next page" })).toBeInTheDocument();
});

test("renders page number buttons", () => {
  const { getByRole } = render(Pagination, {
    props: {
      itemsCount: 40,
      itemsPerPage: 10,
      maxPages: 100,
    },
  });

  expect(getByRole("button", { name: "Page 1" })).toBeInTheDocument();
  expect(getByRole("button", { name: "Page 2" })).toBeInTheDocument();
  expect(getByRole("button", { name: "Page 3" })).toBeInTheDocument();
  expect(getByRole("button", { name: "Page 4" })).toBeInTheDocument();
});

test("renders correct page number buttons", () => {
  const { getByRole, queryByRole, getByText } = render(Pagination, {
    props: {
      itemsCount: 40,
      itemsPerPage: 5,
      maxPages: 5,
    },
  });

    expect(getByRole("button", { name: "Page 1" })).toBeInTheDocument();
    expect(getByRole("button", { name: "Page 2" })).toBeInTheDocument();
    expect(getByRole("button", { name: "Page 3" })).toBeInTheDocument();
    expect(getByRole("button", { name: "Page 8" })).toBeInTheDocument();
    expect(getByText("...")).toBeInTheDocument();
    expect(queryByRole("button", { name: "Page 4" })).not.toBeInTheDocument();
    expect(queryByRole("button", { name: "Page 5" })).not.toBeInTheDocument();
    expect(queryByRole("button", { name: "Page 6" })).not.toBeInTheDocument();
    expect(queryByRole("button", { name: "Page 7" })).not.toBeInTheDocument();
});
