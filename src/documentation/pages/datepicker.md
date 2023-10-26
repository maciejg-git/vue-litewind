___

#### v-model {#ExampleDatepickerModel}

v-model is used to return date after selection. v-model can be `Array` or `String` depending on selection mode. In range mode v-model returns `Array` of two `Strings`. In single mode v-model returns `String`. For both modes date is in `YYYY-MM-DD` format.

<example name="ExampleDatepickerModel"></example>

#### Example - props and events {#ExampleDatepicker}

<example name="ExampleDatepicker"></example>

#### Example - datepicker in dropdown {#ExampleDatepickerDropdown}

<example name="ExampleDatepickerDropdown"></example>

#### Example - datepicker slots {#ExampleDatepickerSlot}

`Day` slot can be used to modify styles of selected days or to add extra elements to them. In the following example `v-badge` components are used to mark certain days.

<example name="ExampleDatepickerSlot"></example>
