<template>
  <h3>Table</h3>
  <p>Table component</p>

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
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <div class="flex flex-col items-center">
        <v-button @click="example.isOpen = !example.isOpen">
          Toggle sidepanel
        </v-button>
        <v-sidepanel
          v-model="example.isOpen"
          :closeButton="example.closeButton"
          :closeButtonLight="example.closeButtonLight"
          :sidebar-left="example.sidebarLeft"
          :width="example.width"
        >
          <template #header>
            <span class="text-xl font-bold">Sidepanel</span>
          </template>
          <div class="p-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with
            the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum.
          </div>
        </v-sidepanel>
      </div>
      <v-tabs theme="material" class="mt-5">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="model" class="font-semibold">v-model:</label>
            <input type="text" id="model" v-model="example.isOpen" />
          </div>
          <div class="mb-2">
            <label for="close-button">close-button:</label>
            <select id="close-button" v-model="example.closeButton">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </select>
          </div>
          <div class="mb-2">
            <label for="sidebar-left">sidebar-left:</label>
            <select id="sidebar-left" v-model="example.sidebarLeft">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </select>
          </div>
          <div class="mb-2">
            <label for="width">width:</label>
            <input type="text" id="width" v-model="example.width" />
          </div>
        </v-tab>
        <v-tab>
          <template #name>
            Events
            <v-badge style-badge="secondary tiny">
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
        type: "Boolean",
        default: "false",
        description: "",
      },
      {
        prop: "close-button",
        type: "Boolean",
        default: "true",
        description: "",
      },
      {
        prop: "sidebar-left",
        type: "Boolean",
        default: "false",
        description: "",
      },
      {
        prop: "width",
        type: "String",
        default: "320px",
        description: "",
      },
      {
        prop: "name",
        type: "String",
        default: "sidepanel",
        description: "",
      },
      {
        prop: "theme",
        type: "String",
        default: "default",
        description: "",
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
        prop: "style-sidepanel",
        description: "Main sidepanel element",
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
        slot: "header",
        description: "Slot for header content",
      },
      {
        slot: "default",
        description: "Slot for sidepanel content",
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
      isOpen: false,
      closeButton: true,
      sidebarLeft: false,
      width: "320px",
      events: [],
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
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
