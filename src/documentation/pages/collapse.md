___

#### Notes {#CollapseNotes}

###### Collapse activation

You can activate collapse in two ways: by using `reference` slot or `v-model`. Slot is recommened as it takes minimal set up and can be done in template alone. `v-model` can still be used to programatically toggle collapse.

###### Accordion

You can wrap group of `v-collapse` components with `v-accordion` to create accordion. See example below.

---

#### Example {#ExampleCollapse}

<example name="ExampleCollapse"></example>

#### Example - accordion {#ExampleCollapseAccordion}

Turn collapse components to accordion by wrapping them with `v-accordion` component. In accordion mode opening one collapse will close every other opened collapse.

<example name="ExampleCollapseAccordion"></example>
