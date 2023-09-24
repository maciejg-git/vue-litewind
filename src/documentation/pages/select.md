___

#### Notes {#SelectNotes}

Autocomplete

Select allows autocomplete functionality to search for options. Enable autocomplete mode with `autocomplete` prop or use `v-autocomplete` component. In autocomplete mode `no-filter`, `no-pagination` and `is-loading` props can be used when requesting data from API.

---

#### Example - simple select {#ExampleSelectSimple}

<div class="example">
  <example name="ExampleSelectSimple"></example>
</div>

#### Example - simple select (multiple) {#ExampleSelectMultivalue}

<div class="example">
  <example name="ExampleSelectMultivalue"></example>
</div>

#### Example - autocomplete {#ExampleAutocomplete}

This example uses `no-filter` prop and simple mock of API request. It does not perform local autocompletion, instead `items` prop is replaced or updated with new set of items after input event.

<div class="example">
  <example name="ExampleAutocomplete"></example>
</div>

#### Example - autocomplete (multiple with chips) {#ExampleAutocompleteMultivalue}

Example of multi value autocomplete that uses `v-chip` components to display selected values.

<div class="example">
  <example name="ExampleAutocompleteMultivalue"></example>
</div>

#### Example - autocomplete (Wikipedia API) {#ExampleAutocompleteAPIWiki}

<div class="example">
  <example name="ExampleAutocompleteAPIWiki"></example>
</div>

#### Example - autocomplete (customized menu) {#ExampleAutocompleteSlot}

To customize menu items use `item` slot.

<div class="example">
  <example name="ExampleAutocompleteSlot"></example>
</div>

#### Example - select (max multiple limit) {#ExampleSelectMultipleMax}

`max-multiple` prop sets the max number of selected items shown in the input. In the following example `max-multiple` slot is used to show the number of remaining hidden items.

<div class="example">
  <example name="ExampleSelectMultipleMax"></example>
</div>
