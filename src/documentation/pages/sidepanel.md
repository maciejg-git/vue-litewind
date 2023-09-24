___

#### Notes {#SidepanelNotes}

###### Sidepanel activation

To control sidepanel visibility you can use `v-model` or `v-trigger` component.

---

#### Example - props {#ExampleSidepanel}

<div class="example">
  <example name="ExampleSidepanel"></example>
</div>

#### Example - open by id {#ExampleSidepanelTrigger}

You can also control state of the sidepanel menu by using `v-trigger` component. The `for` prop of the `v-trigger` should be the same as `id` of the sidepanel. The advantage of this method is that `v-triggers` can be put anywhere in application. Read more about v-trigger here.

<div class="example">
  <example name="ExampleSidepanelTrigger"></example>
</div>
