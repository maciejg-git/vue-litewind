<template>
  <h3>Popover</h3>
  <p></p>

  <section>
    <h4>Reference</h4>
    <p></p>
    <v-table
      :items="reference"
      :definition="referenceDefinition"
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
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
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
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
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
    >
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example">
      <div>
        <v-popover
          :placement="example.placement"
          :trigger="example.trigger"
          :no-header="example.noHeader"
          :title="example.title"
          :transition="example.transition"
          :click-outside-close="example.clickOutsideClose"
          @update:modelValue="
            example.events.unshift({ ev: 'update:modelValue', data: $event })
          "
        >
          <template #activator>
            <v-button>Show popover</v-button>
          </template>
          This is popover.
        </v-popover>
      </div>
      <div class="mt-4">
        <v-popover
          :placement="example.placement"
          :trigger="example.trigger"
          :no-header="example.noHeader"
          title="Login"
          :transition="example.transition"
          :click-outside-close="example.clickOutsideClose"
          @update:modelValue="
            example.events.unshift({ ev: 'update:modelValue', data: $event })
          "
        >
          <template #activator>
            <v-button>Show popover</v-button>
          </template>
          <div class="grid grid-cols-3 gap-2 my-2">
            <label for="">Login</label>
            <v-input type="text" class="col-span-2"></v-input>
            <label for="">Password</label>
            <v-input type="text" class="col-span-2"></v-input>
          </div>
        </v-popover>
      </div>
      <div class="mt-4">
        <v-popover
          :placement="example.placement"
          :trigger="example.trigger"
          :no-header="example.noHeader"
          title="Header"
          :transition="example.transition"
          :click-outside-close="example.clickOutsideClose"
          name="popover-plain"
          @update:modelValue="
            example.events.unshift({ ev: 'update:modelValue', data: $event })
          "
        >
          <template #activator>
            <v-button>Show popover (tooltip)</v-button>
          </template>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </v-popover>
      </div>
      <v-tabs name="tabs-material" class="mt-10">
        <v-tab name="Props">
          <div class="mb-2 mt-5">
            <label for="placement">placement:</label>
            <v-select id="placement" v-model="example.placement">
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
            </v-select>
          </div>
          <div class="mb-2">
            <label for="trigger">trigger:</label>
            <v-select id="trigger" v-model="example.trigger">
              <option value="click">click</option>
              <option value="focus">focus</option>
              <option value="hover">hover</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="no-header">no-header:</label>
            <v-select id="no-header" v-model="example.noHeader">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="title">title</label>
            <v-input type="text" id="title" v-model="example.title"></v-input>
          </div>
          <div class="mb-2">
            <label for="transition">transition:</label>
            <v-select id="transition" v-model="example.transition">
              <option value="fade">fade</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="click-outside-close">click-outside-close:</label>
            <v-select
              id="click-outside-close"
              v-model="example.clickOutsideClose"
            >
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
&lt;v-popover
  :placement=&quot;example.placement&quot;
  :trigger=&quot;example.trigger&quot;
  :no-header=&quot;example.noHeader&quot;
  :title=&quot;example.title&quot;
  :transition=&quot;example.transition&quot;
  :click-outside-close=&quot;example.clickOutsideClose&quot;
  @update:modelValue=&quot;
    example.events.unshift({ ev: 'update:modelValue', data: $event })
  &quot;
&gt;
  &lt;template #activator&gt;
    &lt;v-button&gt;Show popover&lt;/v-button&gt;
  &lt;/template&gt;
  This is popover.
&lt;/v-popover&gt;

&lt;v-popover
  :placement=&quot;example.placement&quot;
  :trigger=&quot;example.trigger&quot;
  :no-header=&quot;example.noHeader&quot;
  title=&quot;Login&quot;
  :transition=&quot;example.transition&quot;
  :click-outside-close=&quot;example.clickOutsideClose&quot;
  @update:modelValue=&quot;
    example.events.unshift({ ev: 'update:modelValue', data: $event })
  &quot;
&gt;
  &lt;template #activator&gt;
    &lt;v-button&gt;Show popover&lt;/v-button&gt;
  &lt;/template&gt;
  &lt;div class=&quot;grid grid-cols-3 gap-2 my-2&quot;&gt;
    &lt;label for=&quot;&quot;&gt;Login&lt;/label&gt;
    &lt;v-input type=&quot;text&quot; class=&quot;col-span-2&quot;&gt;&lt;/v-input&gt;
    &lt;label for=&quot;&quot;&gt;Password&lt;/label&gt;
    &lt;v-input type=&quot;text&quot; class=&quot;col-span-2&quot;&gt;&lt;/v-input&gt;
  &lt;/div&gt;
&lt;/v-popover&gt;
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
        prop: "placement",
        type: ["String"],
        default: "auto",
        description:
          "Initial placement of popover. Valid values are same as for <a href='https://popper.js.org/docs/v2/constructors/' class='link'>Popperjs</a>",
      },
      {
        prop: "trigger",
        type: ["String"],
        default: "click",
        description:
          "Type of trigger that show or hides popover. Valid triggers are 'click', 'hover' and 'focus'",
      },
      {
        prop: "no-header",
        type: ["Boolean"],
        default: "false",
        description: "Disabled popover header",
      },
      {
        prop: "title",
        type: ["String"],
        default: "undefined",
        description: "Title displayed in popover header",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade",
        description: "Animation when showing or hiding popover",
      },
      {
        prop: "click-outside-close",
        type: ["Boolean"],
        default: "false",
        description: "If true clicking outside of popover closes it",
      },
      {
        prop: "target-id",
        type: ["String"],
        default: "undefined",
        description: "Id of element that controls popover",
      },
      {
        prop: "name",
        type: ["String"],
        default: "popover",
        description: "Name of the component",
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
      placement: "right",
      trigger: "click",
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
