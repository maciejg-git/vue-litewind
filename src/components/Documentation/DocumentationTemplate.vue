<template>
  <h3>Table</h3>
  <p class="text-xl font-light">Table component</p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <v-table
      :items="reference"
      :definition="referenceDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:type="{ value }">
        <code class="code-word mx-1">
          {{ value }}
        </code>
      </template>
      <template #cell:default="{ value }">
        <code class="text-sm">{{ value }}</code>
      </template>
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>

    <h6>Styling props</h6>
    <p></p>
    <v-table
      :items="referenceStyles"
      :definition="referenceStylesDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:description="{ value }"
        ><span v-html="value"></span
      ></template>
    </v-table>
  </section>

  <section>
    <h5>Definition</h5>
    <span class="font-bold">Type</span>: <code class="code-word">Array</code>
    <p></p>
    <pre>
      <code>
    </code>
  </pre>
  </section>

  <section>
    <h5>Example</h5>
    <div class="example">
      <div class="mt-5">
        <div class="mb-2">
          <label for="locale">locale: </label>
          <input type="text" id="locale" v-model="example.locale" />
        </div>
        <div class="mb-2">
          <label for="busy">busy: </label>
          <select id="busy" v-model="example.busy">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
      </div>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export default {
  components: {
  },
  setup(props) {
    let reference = ref([
      {
        prop: "items",
        type: "Array",
        default: "undefined",
        description:
          "Data to display in table. Each element of Array is an Object. Single Object is one record (row) of data.",
      },
    ]);

    let referenceStyles = ref([
      {
        prop: "style-table",
        description: "Main table element",
      },
    ]);

    let referenceDefinition = ref([
      {
        key: "prop",
        sortable: true,
        class: () => "whitespace-nowrap",
      },
      {
        key: "type",
        sortable: true,
      },
      {
        key: "default",
        class: () => "whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let referenceStylesDefinition = ref([
      {
        key: "prop",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let example = reactive({

    });

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      referenceDefinition,
      referenceStyles,
      referenceStylesDefinition,
      example,
    };
  },
};
</script>

<style scoped>
h3 {
  @apply text-3xl;
  @apply font-semibold;
}
h4 {
  @apply text-2xl;
  @apply font-semibold;
}
h5 {
  @apply text-xl;
  @apply font-semibold;
}
h6 {
  @apply text-lg;
  @apply font-semibold;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 2em;
}
p {
  margin-top: 1em;
  margin-bottom: 1em;
}
.nowrap {
  white-space: nowrap;
}
.example {
  margin-top: 2em;
}
.code-word {
  @apply text-sm bg-indigo-200 rounded p-1;
}
label {
  @apply mr-2;
}
input[type="text"],
select {
  @apply rounded border-gray-300 focus:border-gray-400 focus:ring focus:ring-indigo-200 py-1;
}
</style>
