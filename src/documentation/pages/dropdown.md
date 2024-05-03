___

#### Notes {#DropdownNotes}

###### Dropdown activation

To control dropdown visibility and placement you can use:

- element in the `reference` slot of the `v-dropdown` (recommended method)
- element in the `v-trigger` component. See the [usage and example](#ExampleDropdownTrigger).

To control it programatically you can add optional `v-model` or call exposed `show()` and `hide()` functions.

###### Teleport

Open dropdown is by default appended to the body element.

###### Context menus

You can set up context menus with the `v-dropdown-context` component that does not require activating element. See the [example](#ExampleDropdownContext) below.

---

#### Example - simple dropdown {#ExampleDropdownSimple}

<example name="ExampleDropdownSimple"></example>

#### Example - props {#ExampleDropdown}

<example name="ExampleDropdown"></example>

#### Example - alternative styles {#ExampleDropdownStyles}

Dropdown comes with some default alternative styles.

<example name="ExampleDropdownStyles"></example>

#### Example - custom content {#ExampleDropdownCustomContent}

Dropdowns are not limited to simple dropdown menus. See the below example for more advanced dropdown that uses input to filter menu items.

<example name="ExampleDropdownCustomContent"></example>

#### Example - open by id {#ExampleDropdownTrigger}

You can also control state of the dropdown menu by using `v-trigger` component. The `for` prop of the `v-trigger` should be the same as `id` of the dropdown. The advantage of this method is that `v-triggers` can be put anywhere in application. Read more about [v-trigger](/documentation/trigger) here.

<example name="ExampleDropdownTrigger"></example>

#### Example - context dropdown {#ExampleDropdownContext}

To make context menu use `v-dropdown-context`. This component exposes `showContextDropdown($event, { contextData })` function that controls visibility state of the menu and sets context data. The first argument, mouse `event`, allows computing position of the menu. The second argument defines data that is provided in the `default` slot of the dropdown component.

<example name="ExampleDropdownContext"></example>
