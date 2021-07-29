<template>
  <h3>Radio</h3>
  <p></p>

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
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>

    <h6>Events</h6>
    <p></p>
    <v-table
      :items="referenceEvents"
      :definition="referenceEventsDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>

    <!-- <h6>Slots</h6> -->
    <!-- <p></p> -->
    <!-- <v-table -->
    <!--   :items="referenceSlots" -->
    <!--   :definition="referenceSlotsDefinition" -->
    <!--   style-table="default fixed" -->
    <!--   style-header-cell="default bordered" -->
    <!--   style-cell="default bordered" -->
    <!-- > -->
    <!--   <template #cell:description="{ value }"> -->
    <!--     <span v-html="value"></span> -->
    <!--   </template> -->
    <!-- </v-table> -->
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <div class="flex items-center">
        <v-radio v-model="example.model" :state="example.state" value="option"></v-radio>
        <label for="" class="ml-3">option</label>
      </div>
      <div class="flex items-center">
        <v-radio v-model="example.model" :state="example.state" value="option 2"></v-radio>
        <label for="" class="ml-3">option 2</label>
      </div>
      <div class="flex items-center">
        <v-radio v-model="example.model" :state="example.state" value="option 3"></v-radio>
        <label for="" class="ml-3">option 3</label>
      </div>
      <v-tabs theme="material" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="model" class="font-semibold">v-model:</label>
            <v-input type="text" id="model" v-model="example.model"></v-input>
          </div>
          <div class="mb-2">
            <label for="state">state:</label>
            <v-select id="state" v-model="example.state">
              <option value="">normal (empty string)</option>
              <option value="valid">valid</option>
              <option value="invalid">invalid</option>
            </v-select>
          </div>
        </v-tab>
        <v-tab>
          <template #name>
            Events
            <v-badge style-badge="secondary tiny" class="ml-2">
              {{ example.events.length }}
            </v-badge>
          </template>
          <div class="overflow-y-auto max-h-48 mt-5 w-full">
            <div class="px-2 pb-2">
              <template v-for="ev in example.events">
                <div class="py-1">
                  <code class="code-word">{{ ev.ev }}</code>
                  {{ ev.data }}
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
import hljs from "highlight.js";

export default {
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: "String",
        default: "undefined",
        description: "input v-model",
      },
      {
        prop: "state",
        type: "String",
        default: "empty string",
        description:
          "State of input validity. Supported values are 'valid', 'invalid' or 'empty string' for default state",
      },
      {
        prop: "name",
        type: "String",
        default: "input",
        description: "",
      },
      {
        prop: "theme",
        type: "String",
        default: "default",
        description: "Theme to use",
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
        prop: "style-radio",
        description: "Main input element",
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
        event: "update:modelValue",
        description: "Update v-model",
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
        slot: "helper",
        description: "Slot for helper text displayed below input element",
      },
      {
        slot: "invalid",
        description: "Slot for message if state is 'invalid'",
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
        component: "-",
        description: "This component does not provide any child components.",
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
      model: true,
      state: "",
      events: [],
    });

    let languages = ref([
      "english",
      "swedish",
      "korean",
      "german",
      "icelandic",
      "japanese",
    ]);

    let languagesModel = ref([]);

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
      languages,
      languagesModel,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
