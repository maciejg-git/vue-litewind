<template>
  <h3>Alert</h3>
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
      <div class="relative">
        <v-alert
          v-model="example.isOpen"
          :dismissable="example.dismissable"
          :auto-dismiss-delay="example.autoDismissDelay"
          :style-alert="example.style"
          class="my-2"
        >
          Alert
        </v-alert>
      </div>
      <div class="flex justify-between items-center">
        <div class="mt-5">
          <label for="style">Alert variant:</label>
          <v-select id="style" v-model="example.style">
            <option value="default">default</option>
            <option value="default info">info</option>
            <option value="default danger">danger</option>
            <option value="default success">success</option>
            <option value="default light">light</option>
          </v-select>
        </div>
        <v-button :disabled="example.isOpen" @click="example.isOpen = true">
          Show alert
        </v-button>
      </div>
      <v-tabs theme="material" class="mt-5">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="model" class="font-semibold">v-model:</label>
            <v-input type="text" id="model" v-model="example.isOpen"></v-input>
          </div>
          <div class="mb-2">
            <label for="dismissable">dismissable:</label>
            <v-select id="dismissable" v-model="example.dismissable">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="auto-dismiss-delay">auto-dismiss-delay:</label>
            <v-input
              type="text"
              id="auto-dismiss-delay"
              v-model="example.autoDismissDelay"
            ></v-input>
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
        type: ["Boolean"],
        default: "false",
        description: "If true alert is visible",
      },
      {
        prop: "dismiss-delay",
        type: ["Number"],
        default: "0",
        description:
          "Delay after which alert is closed (<code class='code-word'>v-model</code> is set to <code>false</code>)",
      },
      {
        prop: "name",
        type: ["Array"],
        default: "undefined",
        description: "Name of the component",
      },
      {
        prop: "theme",
        type: ["Array"],
        default: "undefined",
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
        prop: "style-alert",
        description: "Main alert element",
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
        slot: "default",
        description: "Default slot for alert content",
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
      isOpen: true,
      dismissable: true,
      autoDismissDelay: 0,
      style: "default",
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
