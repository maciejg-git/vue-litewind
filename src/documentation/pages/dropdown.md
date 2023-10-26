___

#### Notes {#DropdownNotes}

###### Dropdown activation

To control dropdown visibility you can use `reference` slot (recommended method) or `v-trigger` component. To control it programatically you can add optional `v-model` or call exposed `show()` and `hide()` functions.

###### Menu content 

Dropdown menu allows for any type of content inside. To make it flexible it does not have own default container, you can use `v-card` with variants or utility classes to organize content.

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

<example name="ExampleDropdownCustomContent"></example>

#### Example - open by id {#ExampleDropdownTrigger}

You can also control state of the dropdown menu by using `v-trigger` component. The `for` prop of the `v-trigger` should be the same as `id` of the dropdown. The advantage of this method is that `v-triggers` can be put anywhere in application. Read more about v-trigger here.

<example name="ExampleDropdownTrigger"></example>

#### Example - context dropdown {#ExampleDropdownContext}

To make context menu use `v-dropdown-context`. This component exposes `showContextDropdown($event, { contextData })` function that controls visibility state of menu and sets context data. First argument, mouse `event`, allows computing position of menu. Second argument defines data that is provided in `default` slot of dropdown component.

<example name="ExampleDropdownContext"></example>
