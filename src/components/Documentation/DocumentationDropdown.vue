<template>
  <h3>Dropdown</h3>
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

    <h6>Events</h6>
    <p></p>
    <v-table
      :items="referenceEvents"
      :definition="referenceEventsDefinition"
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

    <h6>Components</h6>
    <p></p>
    <v-table
      :items="referenceComponents"
      :definition="referenceComponentsDefinition"
      style-table="fixed"
      style-header-cell="bordered"
      style-cell="bordered"
    >
      <template #cell:description="{ value }">
        <span v-html="value"></span>
      </template>
    </v-table>
  </section>

  <section id="example">
    <h4>Example</h4>
    <div class="example">
      <v-dropdown
        :placement="example.placement"
        :offset-x="+example.offsetX"
        :offset-y="+example.offsetY"
        :no-flip="example.noFlip"
        :auto-close-menu="example.autoCloseMenu"
        :transition="example.transition"
          trigger="hover"
        @state:opened="
          example.events.unshift({ ev: 'state:opened', data: $event })
        "
        @state:closed="
          example.events.unshift({ ev: 'state:closed', data: $event })
        "
      >
        <template #activator>
          <v-button>
            Dropdown menu
            <v-chevron style-chevron="right" />
          </v-button>
        </template>
        <v-card width="320px" style-card="shadow" class="flex flex-col">
          <v-dropdown-menu-item tag="button">
            Menu item
          </v-dropdown-menu-item>
          <v-dropdown-menu-item tag="button">
            <template #icon><icon icon="keyboard"></icon></template>
            Second menu item
          </v-dropdown-menu-item>
          <v-dropdown-header>Menu header</v-dropdown-header>
          <v-dropdown-menu-item active tag="button">
            Active menu item
          </v-dropdown-menu-item>
          <v-dropdown-menu-item tag="button">
            <template #icon><icon icon="keyboard"></icon></template>
            Another menu item
          </v-dropdown-menu-item>
          <v-divider></v-divider>
          <v-dropdown-menu-item disabled tag="button">
            <template #icon><icon icon="keyboard"></icon></template>
            Disabled menu item
          </v-dropdown-menu-item>
          <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
        </v-card>
      </v-dropdown>

      <v-dropdown
        :placement="example.placement"
        :offset-x="+example.offsetX"
        :offset-y="+example.offsetY"
        :no-flip="example.noFlip"
        :auto-close-menu="example.autoCloseMenu"
        :transition="example.transition"
        name="dropdown-relaxed"
        @state:opened="
          example.events.unshift({ ev: 'state:opened', data: $event })
        "
        @state:closed="
          example.events.unshift({ ev: 'state:closed', data: $event })
        "
        class="ml-2"
      >
        <template #activator>
          <v-button>
            Dropdown menu (alternate style)
            <v-chevron style-chevron="right" />
          </v-button>
        </template>
        <v-card width="320px" style-card="shadow" class="flex flex-col py-1">
          <v-dropdown-menu-item tag="button">
            Menu item
          </v-dropdown-menu-item>
          <v-dropdown-menu-item tag="button">Second menu item</v-dropdown-menu-item>
          <v-dropdown-header>Menu header</v-dropdown-header>
          <v-dropdown-menu-item active tag="button">
            Active menu item
          </v-dropdown-menu-item>
          <v-dropdown-menu-item tag="button">
            Another menu item
          </v-dropdown-menu-item>
          <v-divider class="w-11/12 mx-auto"></v-divider>
          <v-dropdown-menu-item disabled tag="button">
            Disabled menu item
          </v-dropdown-menu-item>
          <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
        </v-card>
      </v-dropdown>

      <v-dropdown
        :placement="example.placement"
        :offset-x="+example.offsetX"
        :offset-y="+example.offsetY"
        :no-flip="example.noFlip"
        :auto-close-menu="example.autoCloseMenu"
        :transition="example.transition"
        @state:opened="
          example.events.unshift({ ev: 'state:opened', data: $event })
        "
        @state:closed="
          example.events.unshift({ ev: 'state:closed', data: $event })
        "
        class="ml-2"
      >
        <template #activator>
          <v-button>
            Dropdown datepicker
            <v-chevron style-chevron="right" />
          </v-button>
        </template>
        <template #default="{ hide }">
          <v-card width="320px" style-card="shadow" class="p-2">
            <v-date-picker
              v-model="example.date"
              adjacent-months
              @state:done="hide"
            ></v-date-picker>
          </v-card>
        </template>
      </v-dropdown>

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
            <label for="offsetX">offsetX:</label>
            <v-input
              type="text"
              id="offsetX"
              v-model="example.offsetX"
            ></v-input>
          </div>
          <div class="mb-2">
            <label for="offsetY">offsetY:</label>
            <v-input
              type="text"
              id="offsetY"
              v-model="example.offsetY"
            ></v-input>
          </div>
          <div class="mb-2">
            <label for="no-flip">no-flip:</label>
            <v-select id="no-flip" v-model="example.noFlip">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="auto-close-menu">auto-close-menu:</label>
            <v-select id="auto-close-menu" v-model="example.autoCloseMenu">
              <option :value="true">true</option>
              <option :value="false">false</option>
            </v-select>
          </div>
          <div class="mb-2">
            <label for="transition">transition:</label>
            <v-select id="transition" v-model="example.transition">
              <option value="fade">fade</option>
              <option value="">empty string</option>
            </v-select>
          </div>
        </v-tab>
        <v-tab name="Events">
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
&lt;v-dropdown
  :placement=&quot;example.placement&quot;
  :offset-x=&quot;+example.offsetX&quot;
  :offset-y=&quot;+example.offsetY&quot;
  :no-flip=&quot;example.noFlip&quot;
  :auto-close-menu=&quot;example.autoCloseMenu&quot;
  :transition=&quot;example.transition&quot;
  @state:opened=&quot;
    example.events.unshift({ ev: 'state:opened', data: $event })
  &quot;
  @state:closed=&quot;
    example.events.unshift({ ev: 'state:closed', data: $event })
  &quot;
&gt;
  &lt;template #activator&gt;
    &lt;v-button&gt;Dropdown menu&lt;/v-button&gt;
  &lt;/template&gt;
  &lt;v-card width=&quot;320px&quot; style-card=&quot;shadow&quot;&gt;
    &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;Menu item&lt;/v-dropdown-menu-item&gt;
    &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;Menu item 2&lt;/v-dropdown-menu-item&gt;
    &lt;v-dropdown-header&gt;Menu header&lt;/v-dropdown-header&gt;
    &lt;v-dropdown-menu-item active tag=&quot;button&quot;&gt;Menu item 3&lt;/v-dropdown-menu-item&gt;
    &lt;v-dropdown-menu-item disabled tag=&quot;button&quot;&gt;Menu item 4&lt;/v-dropdown-menu-item&gt;
    &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;Menu item 5&lt;/v-dropdown-menu-item&gt;
  &lt;/v-card&gt;
&lt;/v-dropdown&gt;

&lt;v-dropdown
  :placement=&quot;example.placement&quot;
  :offset-x=&quot;+example.offsetX&quot;
  :offset-y=&quot;+example.offsetY&quot;
  :no-flip=&quot;example.noFlip&quot;
  :auto-close-menu=&quot;example.autoCloseMenu&quot;
  :transition=&quot;example.transition&quot;
  @state:opened=&quot;
    example.events.unshift({ ev: 'state:opened', data: $event })
  &quot;
  @state:closed=&quot;
    example.events.unshift({ ev: 'state:closed', data: $event })
  &quot;
  class=&quot;ml-2&quot;
&gt;
  &lt;template #activator&gt;
    &lt;v-button&gt;Dropdown datepicker&lt;/v-button&gt;
  &lt;/template&gt;
  &lt;template #default=&quot;{ hide }&quot;&gt;
    &lt;v-card width=&quot;320px&quot; style-card=&quot;shadow&quot; class=&quot;p-2&quot;&gt;
      &lt;v-date-picker
        v-model=&quot;example.date&quot;
        adjacent-months
        @state:done=&quot;hide&quot;
      &gt;&lt;/v-date-picker&gt;
    &lt;/v-card&gt;
  &lt;/template&gt;
&lt;/v-dropdown&gt;
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
        default: "bottom-start",
        description:
          "Initial placement of dropdown content. See valid values in <a href='https://popper.js.org/docs/v2/constructors/' class='link'>Popperjs documentation</a>",
      },
      {
        prop: "offsetX",
        type: ["Number"],
        default: "0",
        description:
          "Offset of dropdown relative to activator element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
      },
      {
        prop: "offsetY",
        type: ["Number"],
        default: "0",
        description:
          "Offset of dropdown relative to activator element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
      },
      {
        prop: "no-flip",
        type: ["Boolean"],
        default: "false",
        description:
          "Allows fliping dropdown to opposite placement if outside of current view",
      },
      {
        prop: "auto-close-menu",
        type: ["Boolean"],
        default: "false",
        description:
          "If true clicking any dropdown menu item automatically closes dropdown",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade",
        description:
          "By default showing or hiding dropdown uses fading animation. Set this prop to empty string to disable animation",
      },
      {
        prop: "name",
        type: ["String"],
        default: "dropdown",
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
        prop: "style-menu-item",
        description: "Style of menu item",
      },
      {
        prop: "style-menu-item-header",
        description: "Style of menu header",
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
        event: "state:opened",
        description: "Emitted after dropdown is opened",
      },
      {
        event: "state:closed",
        description: "Emitted after dropdown is closed",
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
        slot: "activator",
        description: "Slot for button or link that activates dropdown",
      },
      {
        slot: "default",
        description:
          "Slot for dropdown content. <p class='mt-4'>Slot props: <code class='code-word'>hide()</code></p>",
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
        component: "v-dropdown-menu-item",
        description: "Single menu item",
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
      placement: "bottom-start",
      offsetX: "0",
      offsetY: "5",
      noFlip: false,
      autoCloseMenu: false,
      transition: "fade",
      date: "",
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
