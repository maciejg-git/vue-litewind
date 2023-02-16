import { render, fireEvent, prettyDOM, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
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
  const { getByText } = render(Dropdown, {
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

describe('should open on', () => {
  test("click", async () => {
    const { getByRole, getByText } = render(Dropdown, {
      props: {
        trigger: "click",
      },
      slots,
      global,
    });

    let button = getByRole("button")
    await fireEvent.click(button)
    expect(getByText("menu item")).toBeInTheDocument()
  });

  test("focus (click)", async () => {
    const { getByRole, getByText, queryByText } = render(Dropdown, {
      props: {
        trigger: "focus",
      },
      slots,
      global,
    });

    let button = getByRole("button")
    await userEvent.click(button)
    expect(getByText("menu item")).toBeInTheDocument()
    await userEvent.click(document.body)
    expect(queryByText("menu item")).not.toBeInTheDocument()
  });

  test("focus (tab)", async () => {
    const { getByText, queryByText } = render(Dropdown, {
      props: {
        trigger: "focus",
      },
      slots,
      global,
    });

    await userEvent.tab()
    expect(getByText("menu item")).toBeInTheDocument()
    await userEvent.click(document.body)
    expect(queryByText("menu item")).not.toBeInTheDocument()
  });

  test("hover", async () => {
    const { getByRole, getByText, queryByText } = render(Dropdown, {
      props: {
        trigger: "hover",
      },
      slots,
      global,
    });

    let button = getByRole("button")
    await userEvent.hover(button)
    expect(getByText("menu item")).toBeInTheDocument()
    await userEvent.unhover(button)
    await waitFor(() => {
      expect(queryByText("menu item")).not.toBeInTheDocument()
    })
  });
})
