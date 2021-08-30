<template>
  <h3>Sidepanel</h3>
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
        <div class="space-y-1">
          <code v-for="v in value" class="code-word">
            {{ v }}
          </code>
        </div>
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
      <v-button @click="example.isOpen = !example.isOpen">
        Toggle sidepanel
      </v-button>
      <v-sidepanel
        v-model="example.isOpen"
        :closeButton="example.closeButton"
        :sidebar-left="example.sidebarLeft"
        :width="example.width"
        :no-header="example.noHeader"
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
      <v-tabs name="tabsMaterial" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="model" class="font-semibold">v-model:</label>
            <v-input type="text" id="model" v-model="example.isOpen"></v-input>
          </div>
          <div class="mb-2">
            <label for="close-button">close-button:</label>
            <v-select id="close-button" v-model="example.closeButton">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="sidebar-left">sidebar-left:</label>
            <v-select id="sidebar-left" v-model="example.sidebarLeft">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="width">width:</label>
            <v-input type="text" id="width" v-model="example.width"></v-input>
          </div>
          <div class="mb-2">
            <label for="no-header">no-header:</label>
            <v-select id="no-header" v-model="example.noHeader">
              <option :value="true">true</option>
              <option :value="false">false</option>
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
      <code class="language-html">
&lt;v-sidepanel
  v-model=&quot;example.isOpen&quot;
  :closeButton=&quot;example.closeButton&quot;
  :sidebar-left=&quot;example.sidebarLeft&quot;
  :width=&quot;example.width&quot;
  :no-header=&quot;example.noHeader&quot;
&gt;
  &lt;template #header&gt;
    &lt;span class=&quot;text-xl font-bold&quot;&gt;Sidepanel&lt;/span&gt;
  &lt;/template&gt;
  &lt;div class=&quot;p-5&quot;&gt;
    Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only
    five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with
    the release of Letraset sheets containing Lorem Ipsum passages, and
    more recently with desktop publishing software like Aldus PageMaker
    including versions of Lorem Ipsum.
  &lt;/div&gt;
&lt;/v-sidepanel&gt;
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
        type: ["Boolean"],
        default: "false",
        description:
          "Controls the state of sidepanel. If true, sidepanel is open",
      },
      {
        prop: "close-button",
        type: ["Boolean"],
        default: "true",
        description: "If true shows a close button in top right corner",
      },
      {
        prop: "sidebar-left",
        type: ["Boolean"],
        default: "false",
        description: "If true displays sidepanel on the left",
      },
      {
        prop: "width",
        type: ["String"],
        default: "320px",
        description: "Width of sidepanel",
      },
      {
        prop: "no-header",
        type: ["Boolean"],
        default: "false",
        description: "When true the header slot content and close button is not rendered",
      },
      {
        prop: "name",
        type: ["String"],
        default: "sidepanel",
        description: "Name of the component",
      },
      {
        prop: "theme",
        type: ["String"],
        default: "default",
        description: "Name of the theme to apply to component",
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
      noHeader: false,
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
