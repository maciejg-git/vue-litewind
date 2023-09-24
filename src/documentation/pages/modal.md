___

#### Notes {#ModalNotes}

###### Modal activation

To control modal visibility you can use <code class="code-text">v-model</code> or <code class="code-text">v-trigger</code> component

###### Teleport

Open modal is by default appended to the body element

___

#### Example - simple modal {#ExampleModalSimple}

<div class="example">
  <example name="ExampleModalSimple"></example>
</div>

<h4 id="ExampleModal">Example - props</h4>
<div class="example">
  <example name="ExampleModal"></example>
</div>

#### Example - modal slot {#ExampleModalSlots}

You can use `modal` slot to replace all default content for complete customization.

<div class="example">
  <example name="ExampleModalSlots"></example>
</div>

#### Example - open by id {#ExampleModalTrigger}

You can also control state of the modal by using `v-trigger` component. The `for` prop of the `v-trigger` should be the same as `id` of the modal. `v-trigger` can be anywhere in application.

<div class="example">
  <example name="ExampleModalTrigger"></example>
</div>

#### Example - backdrop {#ExampleModalBackdrop}

To configure colors, intensity and others properties of modals backdrop use backdrop prop. See [backdrop](/documentation/backdrop) documentation for possible options.

<div class="example">
  <example name="ExampleModalBackdrop"></example>
</div>
