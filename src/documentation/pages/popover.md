___

#### Notes {#PopoverNotes}

###### Popover activation

To control popover visibility you can use `reference` slot (recommended method) or `v-trigger` component. To control it programatically you can add optional `v-model` or call exposed `show()` and `hide()` functions.

###### Popover content

Popover allows for any type of content inside. To make it flexible it does not have own default container, you can use `v-card` with variants or utility classes to organize content.

###### Teleport

Open popover is by default appended to the body element.

---

#### Example - props {#ExamplePopover}

<div class="example">
  <example name="ExamplePopover"></example>
</div>

#### Example - open by id {#ExamplePopoverTrigger}

You can also control state of the popover by using `v-trigger` component. The for prop of the `v-trigger` should be the same as `id` of the popover. The advantage of this method over reference slot is that `v-triggers` can be put anywhere in application.

<div class="example">
  <example name="ExamplePopoverTrigger"></example>
</div>
