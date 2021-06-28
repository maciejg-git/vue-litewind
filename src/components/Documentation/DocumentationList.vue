<template>
  <h3>List</h3>
  <p>List component</p>

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

    <h6>Slots</h6>
    <p></p>
    <v-table
      :items="referenceSlots"
      :definition="referenceSlotsDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>

    <h6>Components</h6>
    <p></p>
    <v-table
      :items="referenceComponents"
      :definition="referenceComponentsDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>
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
            <input type="checkbox" v-model="example.active1" />
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
            <input type="checkbox" v-model="example.active2" />
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
            <input type="checkbox" v-model="example.active3" />
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
            <input type="checkbox" v-model="example.active4" />
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
            <input type="checkbox" v-model="example.active5" />
            <label for="" class="ml-2">toggle active</label>
          </div>
        </v-list-item>
      </v-list>
      <div class="mt-5">
        <label for="style">List style: </label>
        <select id="style" v-model="example.name">
          <option value="list">bootstrap</option>
          <option value="listMaterial">material</option>
        </select>
      </div>
      <v-tabs name="tabsMaterial" class="mt-5">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="tag">tag: </label>
            <select id="tag" v-model="example.tag">
              <option value="div">div</option>
              <option value="a">a</option>
              <option value="button">button</option>
            </select>
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
      <code>
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import vTable from "../vTable.vue";
import vList from "../vList.vue";
import vListItem from "../vListItem.vue";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import dataJSON from "../../MOCK_DATA (1).json";

export default {
  components: {
    vTable,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "width",
        type: "String",
        default: "undefined",
        description: "Component width",
      },
      {
        prop: "name",
        type: "String",
        default: "list",
        description: "Useful for setting alternative styles from styles.js",
      },
      {
        prop: "tag",
        type: "String",
        default: "div",
        description: "Defines tag to use in list item child component",
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

    let referenceStyles = ref([
      {
        prop: "style-list",
        description: "Main list element",
      },
      {
        prop: "style-item",
        description: "List item style",
      },
      {
        prop: "style-item-active",
        description: "Active list item style",
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

    let referenceEvents = ref([
      {
        event: "-",
        description: "This component does not emit any events",
      },
    ]);

    let referenceEventsDefinition = ref([
      {
        key: "event",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let referenceSlots = ref([
      {
        slot: "default",
        description: "Slot for v-list-item components",
      },
    ]);

    let referenceSlotsDefinition = ref([
      {
        key: "slot",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
      },
    ]);

    let referenceComponents = ref([
      {
        component: "v-list-item",
        description: "List item component",
      },
    ]);

    let referenceComponentsDefinition = ref([
      {
        key: "component",
        class: () => "w-1 whitespace-nowrap",
      },
      {
        key: "description",
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
      referenceDefinition,
      referenceStyles,
      referenceStylesDefinition,
      referenceEvents,
      referenceEventsDefinition,
      referenceSlots,
      referenceSlotsDefinition,
      referenceComponents,
      referenceComponentsDefinition,
      example,
      dataJSON,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
