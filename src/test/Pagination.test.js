import { render, fireEvent } from "@testing-library/vue";
import Pagination from "../components/vPagination.vue";

test("renders buttons", () => {
  const { getByRole } = render(Pagination, {
    props: {},
  });

  getByRole("button", { name: "Previous page" });
  getByRole("button", { name: "Next page" });
});

test("renders buttons", () => {
  const { getByRole } = render(Pagination, {
    props: {
      itemsCount: 80,
      itemsPerPage: 10,
      maxPages: 5,
    },
  });

  getByRole("button", { name: "Page 1" });
  getByRole("button", { name: "Page 8" });
  getByRole("button", { name: "..." });
});
