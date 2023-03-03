import { render, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
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

// click next prev
// click page
// no more than max pages
// at least 3 pages

test("should make first page active by default", async () => {
  const { getByRole } = render(Pagination, {
    props: {
      itemsCount: 40,
      itemsPerPage: 5,
      maxPages: 5,
    },
  });

  expect(
    getByRole("button", { name: "Page 1", current: true })
  ).toBeInTheDocument();
});

test("should use v-model to mage page active", async () => {
  const { getByRole } = render(Pagination, {
    props: {
      itemsCount: 40,
      itemsPerPage: 5,
      maxPages: 5,
      modelValue: 2,
    },
  });

  expect(
    getByRole("button", { name: "Page 2", current: true })
  ).toBeInTheDocument();
});

describe("max pages", () => {
  test("should not render more than max-pages pages", async () => {
    const { queryAllByRole, getByText } = render(Pagination, {
      props: {
        itemsCount: 40,
        itemsPerPage: 5,
        maxPages: 5,
      },
    });

    expect(queryAllByRole("button", { name: /Page/ })).toHaveLength(5);
  });

  test("should not render less than 3 pages", async () => {
    const { queryAllByRole } = render(Pagination, {
      props: {
        itemsCount: 40,
        itemsPerPage: 5,
        maxPages: 1,
      },
    });

    expect(queryAllByRole("button", { name: /Page/ })).toHaveLength(3);
  });
});

describe("next and previous buttons", () => {
  test("click next should change page to next", async () => {
    const { getByRole } = render(Pagination, {
      props: {
        itemsCount: 40,
        itemsPerPage: 5,
        maxPages: 5,
      },
    });

    expect(
      getByRole("button", { name: "Page 1", current: true })
    ).toBeInTheDocument();
    await fireEvent.click(getByRole("button", { name: "Next page" }));
    expect(
      getByRole("button", { name: "Page 2", current: true })
    ).toBeInTheDocument();
  });

  test("click previous should change page to previous", async () => {
    const { getByRole } = render(Pagination, {
      props: {
        itemsCount: 40,
        itemsPerPage: 5,
        maxPages: 5,
        modelValue: 2,
      },
    });

    expect(
      getByRole("button", { name: "Page 2", current: true })
    ).toBeInTheDocument();
    await fireEvent.click(getByRole("button", { name: "Previous page" }));
    expect(
      getByRole("button", { name: "Page 1", current: true })
    ).toBeInTheDocument();
  });

  test("previous should be disabled with first page active", async () => {
    const { getByRole } = render(Pagination, {
      props: {
        itemsCount: 40,
        itemsPerPage: 5,
        maxPages: 5,
        modelValue: 1,
      },
    });

    expect(
      getByRole("button", { name: "Previous page" })
    ).toHaveAttribute('aria-disabled', 'true');
    expect(
      getByRole("button", { name: "Previous page" })
    ).toHaveClass('pointer-events-none');
  });

  test("next should be disabled with last page active", async () => {
    const { getByRole } = render(Pagination, {
      props: {
        itemsCount: 40,
        itemsPerPage: 5,
        maxPages: 5,
        modelValue: 8,
      },
    });

    expect(
      getByRole("button", { name: "Next page" })
    ).toHaveAttribute('aria-disabled', 'true');
    expect(
      getByRole("button", { name: "Next page" })
    ).toHaveClass('pointer-events-none');
  });
});

test("click page should change to that page", async () => {
  const { getByRole } = render(Pagination, {
    props: {
      itemsCount: 40,
      itemsPerPage: 5,
      maxPages: 5,
    },
  });

  expect(
    getByRole("button", { name: "Page 1", current: true })
  ).toBeInTheDocument();
  await fireEvent.click(getByRole("button", { name: "Page 3" }));
  expect(
    getByRole("button", { name: "Page 3", current: true })
  ).toBeInTheDocument();
});
