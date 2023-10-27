___

#### Notes {#PopoverNotes}

###### Popover activation

To control popover visibility and placement you can use:

- element in the `reference` slot of the `v-popover` (recommended method)
- element in the `v-trigger` component. See the [usage and example](#ExamplePopoverTrigger).

To control it programatically you can add optional `v-model` or call exposed `show()` and `hide()` functions.

###### Popover content

`v-popover` does not have own default container for content. You can use `v-card` or any other element for that purpose. This makes dropdown menu flexible and allows for any type of content inside. 

###### Teleport

Open popover is by default appended to the body element.

---

#### Example - props {#ExamplePopover}

<example name="ExamplePopover"></example>

#### Example - open by id {#ExamplePopoverTrigger}

You can also control state of the popover by using `v-trigger` component. The for prop of the `v-trigger` should be the same as `id` of the popover. The advantage of this method over reference slot is that `v-triggers` can be put anywhere in application.

<example name="ExamplePopoverTrigger"></example>
