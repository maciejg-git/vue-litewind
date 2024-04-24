___

#### Notes {#TriggerNotes}

This component does not create any elements and is used to trigger some actions on other components, for example opening dropdowns, modals or sidepanels by their `id`. Note that components have build in methods of interacting (slots, `v-models` etc) so this component is never required and is just and alternative. Elements that trigger those actions should be placed in`v-trigger` component default slot. See examples of the usage in the [dropdown](/documentation/dropdown#ExampleDropdownTrigger), [modal](/documentation/modal#ExampleModalTrigger) or [sidepanel](/documentation/sidepanel#ExampleSidepanelTrigger) documentation.
