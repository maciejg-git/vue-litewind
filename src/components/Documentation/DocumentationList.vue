<template>
  <h3>List</h3>
  <p>List component</p>

  <section>
    <h5>Example</h5>
    <p></p>
    <div class="example">
      <v-list width="320px">
        <v-list-item>List item</v-list-item>
        <v-list-item>List item 2</v-list-item>
        <v-list-item>List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <!-- <section> -->
  <!--   <h5>Reference</h5> -->
  <!--   <p></p> -->
  <!--   <v&#45;table :items="reference" :definition="referenceDefinition" small> -->
  <!--     <template #cell:type="{ value }" -->
  <!--       ><code>{{ value }}</code></template -->
  <!--     > -->
  <!--     <template #cell:description="{ value, item }"> -->
  <!--       <span v&#45;html="value"></span> -->
  <!--     </template> -->
  <!--   </v&#45;table> -->
  <!-- </section> -->

  <!-- <section> -->
  <!--   <h5>Reference v&#45;list&#45;item</h5> -->
  <!--   <p></p> -->
  <!--   <v&#45;table :items="referenceListItem" :definition="referenceDefinition" small> -->
  <!--     <template #cell:type="{ value }" -->
  <!--       ><code>{{ value }}</code></template -->
  <!--     > -->
  <!--     <template #cell:description="{ value, item }"> -->
  <!--       <span v&#45;html="value"></span> -->
  <!--     </template> -->
  <!--   </v&#45;table> -->
  <!-- </section> -->

  <section>
    <h5>Color-list</h5>
    <span class="fw-bold">Type</span>: <code>String</code>
    <p>Defines color for every item on the list.</p>
    <div class="example">
      <v-list width="320px" color-list="secondary">
        <v-list-item>List item</v-list-item>
        <v-list-item>List item 2</v-list-item>
        <v-list-item>List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>Actionable-list</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Sets whole list as actionable.</p>
    <div class="example">
      <v-list width="320px" actionable-list>
        <v-list-item>List item</v-list-item>
        <v-list-item>List item 2</v-list-item>
        <v-list-item>List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>Class-list</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Apply classes to every list item.</p>
    <div class="example">
      <v-list width="320px" class-list="fw-bold p-3">
        <v-list-item>List item</v-list-item>
        <v-list-item>List item 2</v-list-item>
        <v-list-item>List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>Horizontal</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Renders horizontal list.</p>
    <div class="example">
      <v-list width="520px" horizontal>
        <v-list-item>List item</v-list-item>
        <v-list-item>List item 2</v-list-item>
        <v-list-item>List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>Flush</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Removes outer borders.</p>
    <div class="example">
      <v-list width="320px" flush>
        <v-list-item>List item</v-list-item>
        <v-list-item>List item 2</v-list-item>
        <v-list-item>List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>Width</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Sets width of list.</p>
    <div class="example">
      <v-list width="520px">
        <v-list-item>List item</v-list-item>
        <v-list-item>List item 2</v-list-item>
        <v-list-item>List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>Small</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Renders more compact list. Reduces padding.</p>
    <div class="example">
      <v-list width="320px" small>
        <v-list-item>List item</v-list-item>
        <v-list-item>List item 2</v-list-item>
        <v-list-item>List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>Square</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Renders square borders.</p>
    <div class="example">
      <v-list width="320px" square>
        <v-list-item>List item</v-list-item>
        <v-list-item>List item 2</v-list-item>
        <v-list-item>List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>v-list-item: actionable</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Sets single list item as actionable</p>
    <div class="example">
      <v-list width="320px">
        <v-list-item>List item</v-list-item>
        <v-list-item>List item 2</v-list-item>
        <v-list-item actionable>List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>v-list-item: active</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Sets single list item as active.</p>
    <div class="example">
      <v-list width="320px">
        <v-list-item>List item</v-list-item>
        <v-list-item>List item 2</v-list-item>
        <v-list-item active>List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>v-list-item: color</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Sets color of single list item.</p>
    <div class="example">
      <v-list width="320px">
        <v-list-item>List item</v-list-item>
        <v-list-item color="secondary">List item 2</v-list-item>
        <v-list-item color="warning">List item 3</v-list-item>
        <v-list-item>List item 4</v-list-item>
      </v-list>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import vTable from "../vTable.vue";

import vList from "../vList.vue"
import vListItem from "../vListItem.vue"

import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export default {
  components: {
    vTable,
    vList,
    vListItem,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "color-list",
        type: "String",
        description: "",
      },
      {
        prop: "actionable-list",
        type: "Boolean",
        description:
          "",
      },
      {
        prop: "class-list",
        type: "String",
        description: "",
      },
      {
        prop: "horizontal",
        type: "Boolean",
        description: "",
      },
      {
        prop: "flush",
        type: "Boolean",
        description: "",
      },
      {
        prop: "width",
        type: "String",
        description: "",
      },
      {
        prop: "small",
        type: "Boolean",
        description: "",
      },
      {
        prop: "square",
        type: "Boolean",
        description: "",
      },
    ]);

    let referenceListItem = ref([
      {
        prop: "actionable",
        type: "Boolean",
        description: "",
      },
      {
        prop: "color",
        type: "String",
        description: "",
      },
      {
        prop: "active",
        type: "Boolean",
        description: "",
      },
    ])

    let referenceDefinition = ref([
      {
        key: "prop",
        sortable: true,
      },
      {
        key: "type",
        sortable: true,
      },
      {
        key: "description",
      },
    ]);

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      referenceListItem,
      referenceDefinition,
    };
  },
};
</script>

<style scoped>
h1, h2, h3, h4, h5, h6 {
  margin-top: 2em;
}
p {
  margin-top: 1em;
}
.example {
  margin-top: 2em;
}
</style>
