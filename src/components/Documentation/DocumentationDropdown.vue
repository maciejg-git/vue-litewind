<template>
  <h3>Dropdown</h3>
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
        @state:opened="
          example.events.unshift({ ev: 'state:opened', data: $event })
        "
        @state:closed="
          example.events.unshift({ ev: 'state:closed', data: $event })
        "
      >
        <template #activator>
          <v-button>Dropdown menu</v-button>
        </template>
        <v-card width="320px" style-card="default shadow">
          <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
          <v-dropdown-menu-item tag="button">Menu item 2</v-dropdown-menu-item>
          <v-dropdown-header>Menu header</v-dropdown-header>
          <v-dropdown-menu-item tag="button">Menu item 3</v-dropdown-menu-item>
          <v-dropdown-menu-item tag="button">Menu item 4</v-dropdown-menu-item>
          <v-dropdown-menu-item tag="button">Menu item 5</v-dropdown-menu-item>
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
      >
        <template #activator>
          <v-button>Dropdown datepicker</v-button>
        </template>
        <template #default="{ hide }">
          <v-card width="320px" style-card="default shadow" class="p-2">
            <v-date-picker
              v-model="example.date"
              adjecent-months
              @state:done="hide"
            ></v-date-picker>
          </v-card>
        </template>
      </v-dropdown>
      <v-tabs theme="material" class="mt-10">
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
      <code>
{{`<v-dropdown
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
>
  <template #activator>
    <v-button>Dropdown menu</v-button>
  </template>
  <v-card width="320px">
    <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
    <v-dropdown-menu-item tag="button">Menu item 2</v-dropdown-menu-item>
    <v-dropdown-header>Menu header</v-dropdown-header>
    <v-dropdown-menu-item tag="button">Menu item 3</v-dropdown-menu-item>
    <v-dropdown-menu-item tag="button">Menu item 4</v-dropdown-menu-item>
    <v-dropdown-menu-item tag="button">Menu item 5</v-dropdown-menu-item>
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
>
  <template #activator>
    <v-button>Dropdown datepicker</v-button>
  </template>
  <template #default="{ hide }">
    <v-card width="320px" class="p-2">
      <v-date-picker
        v-model="example.date"
        adjecent-months
        @state:done="hide"
      ></v-date-picker>
    </v-card>
  </template>
</v-dropdown>`}}
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
        type: "String",
        default: "bottom-start",
        description:
          "Initial placement of dropdown content. Valid values are the same as for <a href='https://popper.js.org/docs/v2/' class='link'>Popperjs</a>",
      },
      {
        prop: "offsetX",
        type: "Number",
        default: "0",
        description:
          "Offset of dropdown relative to activator element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
      },
      {
        prop: "offsetY",
        type: "Number",
        default: "0",
        description:
          "Offset of dropdown relative to activator element. See how to use this offset <a href='https://popper.js.org/docs/v2/modifiers/offset/' class='link'>here</a>",
      },
      {
        prop: "no-flip",
        type: "Boolean",
        default: "false",
        description:
          "Allows fliping to another placement if dropdown content is outside of screen bounds",
      },
      {
        prop: "auto-close-menu",
        type: "Boolean",
        default: "false",
        description:
          "If true clicking any dropdown menu item automatically closes dropdown. This props does only work for clicking on v-dropdown-item",
      },
      {
        prop: "transition",
        type: "String",
        default: "fade",
        description: "Valid values are 'fade' or empty string (no animation)",
      },
      {
        prop: "name",
        type: "String",
        default: "dropdown",
        description: "Useful for setting alternative styles from styles.js",
      },
      {
        prop: "theme",
        type: "String",
        default: "default",
        description: "Theme of the component",
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
        prop: "style-menu-item-active",
        description: "Style of active menu item",
      },
      {
        prop: "style-menu-item-disabled",
        description: "Style of disabled menu item",
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
      offsetY: "0",
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
