import { render, fireEvent, prettyDOM } from "@testing-library/vue";
import "@testing-library/jest-dom"
import Dropdown from "../components/vDropdown.vue";
import DropdownMenuItem from "../components/vDropdownMenuItem.vue"
import DropdownHeader from "../components/vDropdownHeader.vue"

let menu = 
  `<div>
    <v-dropdown-menu-item>menu item</v-dropdown-menu-item>
    <v-dropdown-menu-item>menu item2</v-dropdown-menu-item>
    <v-dropdown-menu-item>menu item3</v-dropdown-menu-item>
  </div>`

let stubs = {
  "v-dropdown-menu-item": DropdownMenuItem,
  "v-dropdown-header": DropdownHeader,
}

let global = {
  stubs,
}

let slots = {
  reference: "<button :ref='reference' v-on='onTrigger'></button>",
  default: menu,
}

test("renders component", async () => {
  const { getByRole, getByText } = render(Dropdown, {
    props: {},
    slots,
    global,
  });

  let button = getByRole("button")
  await fireEvent.click(button)
  expect(getByText("menu item")).toBeInTheDocument()
  expect(getByText("menu item2")).toBeInTheDocument()
  expect(getByText("menu item3")).toBeInTheDocument()
});

test("opens menu (v-model)", async () => {
  const { getByRole, getByText } = render(Dropdown, {
    props: {
      modelValue: true,
    },
    slots,
    global,
  });

  expect(getByText("menu item")).toBeInTheDocument()
  expect(getByText("menu item2")).toBeInTheDocument()
  expect(getByText("menu item3")).toBeInTheDocument()
});
