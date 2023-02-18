import { render, fireEvent, prettyDOM } from "@testing-library/vue";
import "@testing-library/jest-dom"
import Table from "../components/vTable.vue";

let data = [
  { id: 1, name: "name", city: "city" },
  { id: 2, name: "name2", city: "city2" },
  { id: 3, name: "name3", city: "city3" },
  { id: 4, name: "name4", city: "city4" },
  { id: 5, name: "name5", city: "city5" },
]

let props = {
  items: data,
  primaryKey: "id",
}

let definition = [
  {
    key: "id",
  },
  {
    key: "name",
  },
  {
    key: "city",
  },
]

afterEach(() => {
  definition = [
    {
      key: "id",
    },
    {
      key: "name",
    },
    {
      key: "city",
    },
  ]
})

test("renders component", () => {
  const { getByRole } = render(Table, {
    props: {
      ...props,
    },
  });

  expect(getByRole("table")).toMatchInlineSnapshot(`
    <table
      class="table"
      data-v-0d7422a8=""
    >
      <!--v-if-->
      <thead
        class="table__header-row"
        data-v-0d7422a8=""
      >
        <tr
          data-v-0d7422a8=""
        >
          
          
          <th
            class="table__header-cell"
            data-v-0d7422a8=""
          >
            <div
              class="flex items-center"
              data-v-0d7422a8=""
            >
              Id 
              <!--v-if-->
            </div>
          </th>
          
          
          <th
            class="table__header-cell"
            data-v-0d7422a8=""
          >
            <div
              class="flex items-center"
              data-v-0d7422a8=""
            >
              Name 
              <!--v-if-->
            </div>
          </th>
          
          
          <th
            class="table__header-cell"
            data-v-0d7422a8=""
          >
            <div
              class="flex items-center"
              data-v-0d7422a8=""
            >
              City 
              <!--v-if-->
            </div>
          </th>
          
          
        </tr>
      </thead>
      <tbody
        data-v-0d7422a8=""
      >
        
        
        <tr
          class="table__row"
          data-v-0d7422a8=""
        >
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            1
            
          </td>
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            name
            
          </td>
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            city
            
          </td>
          
          
        </tr>
        <!--v-if-->
        
        
        <tr
          class="table__row"
          data-v-0d7422a8=""
        >
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            2
            
          </td>
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            name2
            
          </td>
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            city2
            
          </td>
          
          
        </tr>
        <!--v-if-->
        
        
        <tr
          class="table__row"
          data-v-0d7422a8=""
        >
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            3
            
          </td>
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            name3
            
          </td>
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            city3
            
          </td>
          
          
        </tr>
        <!--v-if-->
        
        
        <tr
          class="table__row"
          data-v-0d7422a8=""
        >
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            4
            
          </td>
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            name4
            
          </td>
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            city4
            
          </td>
          
          
        </tr>
        <!--v-if-->
        
        
        <tr
          class="table__row"
          data-v-0d7422a8=""
        >
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            5
            
          </td>
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            name5
            
          </td>
          
          
          <td
            class="table__cell"
            data-v-0d7422a8=""
          >
            
            city5
            
          </td>
          
          
        </tr>
        <!--v-if-->
        
        
      </tbody>
    </table>
  `);
});

test("renders component with definition prop", () => {
  const { getByRole, getByText, getAllByRole } = render(Table, {
    props: {
      ...props,
      definition,
    },
  });

  expect(getAllByRole("row")).toHaveLength(6);
  expect(getAllByRole("cell")).toHaveLength(15);
  expect(getByRole("cell", { name: "name" })).toBeInTheDocument();
});

test("reorders columns based on definition", () => {
  definition.splice(2, 0, definition.splice(1, 1)[0])

  const { getAllByRole } = render(Table, {
    props: {
      ...props,
      definition,
    },
  });

  let headers = getAllByRole("columnheader")

  expect(headers).toHaveLength(3)
  expect(headers[0]).toHaveTextContent("Id")
  expect(headers[1]).toHaveTextContent("City")
  expect(headers[2]).toHaveTextContent("Name")
});

test("correctly names column headers from definition", () => {
  definition[0].label = "label"
  definition[1].label = "label2"
  definition[2].label = "label3"

  const { getAllByRole } = render(Table, {
    props: {
      ...props,
      definition,
    },
  });

  let headers = getAllByRole("columnheader")

  expect(headers).toHaveLength(3)
  expect(headers[0]).toHaveTextContent("label")
  expect(headers[1]).toHaveTextContent("label2")
  expect(headers[2]).toHaveTextContent("label3")
});

test("correctly adds new columns not defined in items", () => {
  definition[3] = {
    key: "edit"
  }

  const { getAllByRole } = render(Table, {
    props: {
      ...props,
      definition,
    },
  });

  let headers = getAllByRole("columnheader")

  expect(headers).toHaveLength(4)
  expect(headers[0]).toHaveTextContent("Id")
  expect(headers[1]).toHaveTextContent("Name")
  expect(headers[2]).toHaveTextContent("City")
  expect(headers[3]).toHaveTextContent("Edit")
});
