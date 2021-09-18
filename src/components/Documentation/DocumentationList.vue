<template>
  <h3>List</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Slots</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Components</h6>
    <p></p>
    <table-reference-basic :items="components"></table-reference-basic>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <v-list width="500px" :tag="example.tag" :name="example.name">
        <v-list-item :active="example.active1">
          <div class="font-semibold">
            {{ dataJSON[0].first_name }} {{ dataJSON[0].last_name }}
          </div>
          <div class="text-gray-400">
            {{ dataJSON[0].email }}
          </div>
          <div>
            <v-checkbox type="checkbox" v-model="example.active1" />
            <label for="" class="ml-2">toggle active</label>
          </div>
        </v-list-item>
        <v-list-item :active="example.active2">
          <div class="font-semibold">
            {{ dataJSON[1].first_name }} {{ dataJSON[1].last_name }}
          </div>
          <div class="text-gray-400">
            {{ dataJSON[1].email }}
          </div>
          <div>
            <v-checkbox type="checkbox" v-model="example.active2" />
            <label for="" class="ml-2">toggle active</label>
          </div>
        </v-list-item>
        <v-list-item :active="example.active3">
          <div class="font-semibold">
            {{ dataJSON[2].first_name }} {{ dataJSON[2].last_name }}
          </div>
          <div class="text-gray-400">
            {{ dataJSON[2].email }}
          </div>
          <div>
            <v-checkbox type="checkbox" v-model="example.active3" />
            <label for="" class="ml-2">toggle active</label>
          </div>
        </v-list-item>
        <v-list-item :active="example.active4">
          <div class="font-semibold">
            {{ dataJSON[3].first_name }} {{ dataJSON[3].last_name }}
          </div>
          <div class="text-gray-400">
            {{ dataJSON[3].email }}
          </div>
          <div>
            <v-checkbox type="checkbox" v-model="example.active4" />
            <label for="" class="ml-2">toggle active</label>
          </div>
        </v-list-item>
        <v-list-item :active="example.active5">
          <div class="font-semibold">
            {{ dataJSON[4].first_name }} {{ dataJSON[4].last_name }}
          </div>
          <div class="text-gray-400">
            {{ dataJSON[4].email }}
          </div>
          <div>
            <v-checkbox type="checkbox" v-model="example.active5" />
            <label for="" class="ml-2">toggle active</label>
          </div>
        </v-list-item>
      </v-list>
      <div class="mt-5">
        <label for="style">List style: </label>
        <v-select id="style" v-model="example.name">
          <option value="list">bootstrap</option>
          <option value="listMaterial">material</option>
        </v-select>
      </div>
      <v-tabs name="tabs-material" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="tag">tag: </label>
            <v-select id="tag" v-model="example.tag">
              <option value="div">div</option>
              <option value="a">a</option>
              <option value="button">button</option>
            </v-select>
          </div>
        </v-tab>
        <v-tab name="Events">
          <div class="overflow-y-auto max-h-48 mt-5 w-full">
            <div class="px-2 pb-2">
              <div class="py-1">This component does not emit any events</div>
              <template v-for="ev in example.events">
                <div class="py-1">
                  <code class="code-word">{{ ev.ev }}</code> {{ ev.data }}
                </div>
              </template>
            </div>
          </div>
        </v-tab>
      </v-tabs>
    </div>
    <pre>
      <code v-pre class="language-html">
&lt;v-list width=&quot;500px&quot; :tag=&quot;example.tag&quot; :name=&quot;example.name&quot;&gt;
  &lt;v-list-item :active=&quot;example.active1&quot;&gt;
    &lt;div class=&quot;font-semibold&quot;&gt;
      &#123;&#123; dataJSON[0].first_name  &#125;&#125; &#123;&#123; dataJSON[0].last_name &#125;&#125; 
    &lt;/div&gt;
    &lt;div class=&quot;text-gray-400&quot;&gt;
      &#123;&#123; dataJSON[0].email &#125;&#125;
    &lt;/div&gt;
    &lt;div&gt;
      &lt;input type=&quot;checkbox&quot; v-model=&quot;example.active1&quot; /&gt;
      &lt;label for=&quot;&quot; class=&quot;ml-2&quot;&gt;toggle active&lt;/label&gt;
    &lt;/div&gt;
  &lt;/v-list-item&gt;
&lt;/v-list&gt;
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import hljs from "highlight.js";
import dataJSON from "../../data.json";

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "width",
        type: ["String"],
        default: "undefined",
        description: "Component width",
      },
      {
        prop: "tag",
        type: ["String"],
        default: "div",
        description: "Defines tag to use in list item child component (for example 'div', 'a' or 'button')",
      },
      {
        prop: "name",
        type: ["String"],
        default: "list",
        description: "Name of the component",
      },
    ]);

    let styles = ref([
      {
        prop: "style-list",
        description: "Main list element",
      },
      {
        prop: "style-item",
        description: "List item style",
      },
    ]);

    let slots = ref([
      {
        prop: "default",
        description: "Slot for v-list-item components",
      },
    ]);

    let components = ref([
      {
        prop: "v-list-item",
        description: "List item component",
      },
    ]);

    let example = reactive({
      tag: "div",
      active1: false,
      active2: false,
      active3: false,
      active4: false,
      active5: false,
      name: "list",
    });

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      styles,
      slots,
      components,
      example,
      dataJSON,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
