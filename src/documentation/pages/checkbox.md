___

#### Notes {#CheckboxNotes}

##### Simple checkbox

`v-checkbox-simple` is a lighter, simpler checkbox variant that can be used in lists, tables etc. Simple checkbox only has `mod-checkbox` and `base` prop. It does not allow `v-model` but `:checked` prop and `@changed` event can be used instead.

---

#### Example - props {#ExampleCheckbox}

<div class="example">
  <example name="ExampleCheckbox"></example>
</div>

#### Example - checkbox group {#ExampleCheckboxGroup}

Checkboxes can be optionally wrapped with `v-checkbox-group` to create group with single `v-model`. Group allows more validation options.

<div class="example">
  <example name="ExampleCheckboxGroup"></example>
</div>
