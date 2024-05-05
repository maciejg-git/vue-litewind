___

#### v-model {#ExampleDatepickerModel}

`v-model` is used to return date after selection. v-model can be an `Array` or a `String` depending on the selection mode. In the range mode `v-model` returns an `Array` of two `Strings`. In the single mode `v-model` returns a `String`. For both modes date is in the `YYYY-MM-DD` format.

<example name="ExampleDatepickerModel"></example>

#### Example - props and events {#ExampleDatepicker}

<example name="ExampleDatepicker"></example>

#### Example - datepicker in dropdown {#ExampleDatepickerDropdown}

<example name="ExampleDatepickerDropdown"></example>

#### Example - datepicker slots {#ExampleDatepickerSlot}

`Day` slot can be used to modify styles of selected days or to add extra elements to them. In the following example `v-badge` components are added to mark certain days.

<example name="ExampleDatepickerSlot"></example>
