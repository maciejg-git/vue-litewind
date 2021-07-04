<template>
  <h3>Popover</h3>
  <p>Popover component is somewhere between dropdowns and tooltips. Controlled via v-model.</p>

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
      <v-popover
        v-model="example.isVisible"
        :placement="example.placement"
        :trigger="example.trigger"
        :delay="+example.delay"
        :no-header="example.noHeader"
        :title="example.title"
        :transition="example.transition"
        :click-outside-close="example.clickOutsideClose"
        @update:modelValue="
          example.events.unshift({ ev: 'update:modelValue', data: $event })
        "
      >
        <template #activator><v-button>Show popover</v-button></template>
        This is popover.
      </v-popover>
      <v-popover
        v-model="example.isVisible2"
        :placement="example.placement"
        :trigger="example.trigger"
        :delay="+example.delay"
        :no-header="example.noHeader"
        :title="example.title"
        :transition="example.transition"
        :click-outside-close="example.clickOutsideClose"
        @update:modelValue="
          example.events.unshift({ ev: 'update:modelValue', data: $event })
        "
      >
        <template #activator><v-button>Show popover</v-button></template>
        <label for="">Login</label>
        <input type="text" />
        <label for="">Password</label>
        <input type="text" />
      </v-popover>
      <v-tabs theme="material" class="mt-5">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="model" class="font-semibold">v-model:</label>
            <input type="text" id="model" v-model="example.isVisible" />
          </div>
          <div class="mb-2">
            <label for="placement">placement:</label>
            <select id="placement" v-model="example.placement">
              <option value="auto">auto</option>
              <option value="auto-start">auto-start</option>
              <option value="auto-end">auto-end</option>
              <option value="top">top</option>
              <option value="top-start">top-start</option>
              <option value="top-end">top-end</option>
              <option value="bottom">bottom</option>
              <option value="bottom-start">bottom-start</option>
              <option value="bottom-end">bottom-end</option>
              <option value="right">right</option>
              <option value="right-start">right-start</option>
              <option value="right-end">right-end</option>
              <option value="left">left</option>
              <option value="left-start">left-start</option>
              <option value="left-end">left-end</option>
            </select>
          </div>
          <div class="mb-2">
            <label for="trigger">trigger:</label>
            <select id="trigger" v-model="example.trigger">
              <option value="click">click</option>
              <option value="focus">focus</option>
              <option value="hover">hover</option>
            </select>
          </div>
          <div class="mb-2">
            <label for="delay">delay</label>
            <input type="text" id="delay" v-model="example.delay" />
          </div>
          <div class="mb-2">
            <label for="no-header">no-header:</label>
            <select id="no-header" v-model="example.noHeader">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </select>
          </div>
          <div class="mb-2">
            <label for="title">title</label>
            <input type="text" id="title" v-model="example.title" />
          </div>
          <div class="mb-2">
            <label for="transition">transition:</label>
            <select id="transition" v-model="example.transition">
              <option value="fade">fade</option>
            </select>
          </div>
          <div class="mb-2">
            <label for="click-outside-close">click-outside-close:</label>
            <select
              id="click-outside-close"
              v-model="example.clickOutsideClose"
            >
              <option :value="true">true</option>
              <option :value="false">false</option>
            </select>
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
        default: "undefined",
        description: "Set to true to show popover. False hides it",
      },
      {
        prop: "placement",
        type: "String",
        default: "auto",
        description:
          "Initial placement of popover. Valid values are same as for Popperjs",
      },
      {
        prop: "trigger",
        type: "String",
        default: "click",
        description:
          "Type of trigger that show or hides popover. Valid triggers are 'click', 'hover' and 'focus'",
      },
      {
        prop: "delay",
        type: "Number",
        default: "50",
        description: "Delay before showing and hiding poporver",
      },
      {
        prop: "no-header",
        type: "Boolean",
        default: "false",
        description: "Disabled popover header",
      },
      {
        prop: "title",
        type: "String",
        default: "undefined",
        description: "Title displayed in popover header",
      },
      {
        prop: "transition",
        type: "String",
        default: "fade",
        description: "Animation when showing or hiding popover",
      },
      {
        prop: "click-outside-close",
        type: "Boolean",
        default: "false",
        description: "If true clicking outside of popover closes it",
      },
      {
        prop: "target-id",
        type: "String",
        default: "undefined",
        description: "Id of element that controls popover",
      },
      {
        prop: "name",
        type: "String",
        default: "popover",
        description: "",
      },
      {
        prop: "theme",
        type: "String",
        default: "default",
        description: "Theme of popover",
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
        prop: "style-popover",
        description: "Main popover element",
      },
      {
        prop: "style-content",
        description: "Content of popover",
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

    let referenceSlots = ref([
      {
        slot: "activator",
        description: "Slot for element that activates popover",
      },
      {
        slot: "default",
        description: "Slot for popover content",
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

    let example = reactive({
      isVisible: false,
      isVisible2: false,
      placement: "auto",
      trigger: "click",
      delay: 50,
      noHeader: false,
      title: "Popover title",
      transition: "fade",
      clickOutsideClose: false,
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
      referenceSlots,
      referenceSlotsDefinition,
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
