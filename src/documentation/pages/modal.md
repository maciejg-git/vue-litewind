___

#### Notes {#ModalNotes}

###### Modal activation

To control modal visibility you can use <code class="code-text">v-model</code> or <code class="code-text">v-trigger</code> component

###### Teleport

Open modal is by default appended to the body element

___

#### Example - simple modal {#ExampleModalSimple}

<example name="ExampleModalSimple"></example>

#### Example - props {#ExampleModal}

<example name="ExampleModal"></example>

#### Example - modal slot {#ExampleModalSlots}

Following example uses `modal` slot to replace all default content for complete customization.

<example name="ExampleModalSlots"></example>

#### Example - open by id {#ExampleModalTrigger}

You can also control state of the modal by using `v-trigger` component. The `for` prop of the `v-trigger` should be the same as `id` of the modal. `v-trigger` can be anywhere in application.

<example name="ExampleModalTrigger"></example>

#### Example - backdrop {#ExampleModalBackdrop}

To configure colors, intensity and others properties of modals backdrop use backdrop prop. See [backdrop](/documentation/backdrop) documentation for possible options.

<example name="ExampleModalBackdrop"></example>
