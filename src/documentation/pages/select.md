___

#### Notes {#SelectNotes}

Autocomplete

Select allows autocomplete functionality to search for options. Enable autocomplete mode with `autocomplete` prop or use `v-autocomplete` component. In autocomplete mode `no-filter`, `no-pagination` and `is-loading` props can be used when requesting data from API.

---

#### Example - simple select {#ExampleSelectSimple}

<example name="ExampleSelectSimple"></example>

#### Example - simple select (multiple) {#ExampleSelectMultivalue}

<example name="ExampleSelectMultivalue"></example>

#### Example - autocomplete {#ExampleAutocomplete}

This example uses `no-filter` prop and simple mock of API request. It does not perform local autocompletion, instead `items` prop is replaced or updated with new set of items after input event.

<example name="ExampleAutocomplete"></example>

#### Example - autocomplete (multiple with chips) {#ExampleAutocompleteMultivalue}

Example of multi value autocomplete that uses `v-chip` components to display selected values.

<example name="ExampleAutocompleteMultivalue"></example>

#### Example - autocomplete (Wikipedia API) {#ExampleAutocompleteAPIWiki}

<example name="ExampleAutocompleteAPIWiki"></example>

#### Example - autocomplete (customized menu) {#ExampleAutocompleteSlot}

To customize menu items use `item` slot.

<example name="ExampleAutocompleteSlot"></example>

#### Example - select (max multiple limit) {#ExampleSelectMultipleMax}

`max-multiple` prop sets the max number of selected items shown in the input. In the following example `max-multiple` slot is used to show the number of remaining hidden items.

<example name="ExampleSelectMultipleMax"></example>
