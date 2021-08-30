<template>
  <h3>Navbar</h3>
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
    <div class="example relative">
      <v-card style="height: 300px">
        <v-navbar class="py-2 px-4">
          <div class="flex items-center">
            <span class="font-bold text-lg">Brand</span>
            <ul class="flex flex-row gap-x-7 ml-7">
              <li>Home</li>
              <li>About</li>
              <li>
                <v-dropdown :offset-y="10">
                  <template #activator>
                    <v-button style-button="link">Dropdown</v-button>
                  </template>
                  <v-card width="320px" style-card="default shadow">
                    <v-dropdown-menu-item tag="button">
                      Menu item
                    </v-dropdown-menu-item>
                    <v-dropdown-menu-item tag="button">
                      Menu item 2
                    </v-dropdown-menu-item>
                    <v-dropdown-header>Menu header</v-dropdown-header>
                    <v-dropdown-menu-item tag="button">
                      Menu item 3
                    </v-dropdown-menu-item>
                    <v-dropdown-menu-item tag="button">
                      Menu item 4
                    </v-dropdown-menu-item>
                    <v-dropdown-menu-item tag="button">
                      Menu item 5
                    </v-dropdown-menu-item>
                  </v-card>
                </v-dropdown>
              </li>
            </ul>
            <v-input class="ml-auto mr-4"></v-input>
            <v-button style-button="default outline">Search</v-button>
          </div>
        </v-navbar>
      </v-card>
    </div>
    <pre>
      <code class="language-html">
&lt;v-navbar class=&quot;py-2 px-4&quot;&gt;
  &lt;div class=&quot;flex items-center&quot;&gt;
    &lt;span class=&quot;font-bold text-lg&quot;&gt;Brand&lt;/span&gt;
    &lt;ul class=&quot;flex flex-row gap-x-7 ml-7&quot;&gt;
      &lt;li&gt;Home&lt;/li&gt;
      &lt;li&gt;About&lt;/li&gt;
      &lt;li&gt;
        &lt;v-dropdown :offset-y=&quot;10&quot;&gt;
          &lt;template #activator&gt;
            &lt;v-button style-button=&quot;link&quot;&gt;Dropdown&lt;/v-button&gt;
          &lt;/template&gt;
          &lt;v-card width=&quot;320px&quot; style-card=&quot;default shadow&quot;&gt;
            &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;
              Menu item
            &lt;/v-dropdown-menu-item&gt;
            &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;
              Menu item 2
            &lt;/v-dropdown-menu-item&gt;
            &lt;v-dropdown-header&gt;Menu header&lt;/v-dropdown-header&gt;
            &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;
              Menu item 3
            &lt;/v-dropdown-menu-item&gt;
            &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;
              Menu item 4
            &lt;/v-dropdown-menu-item&gt;
            &lt;v-dropdown-menu-item tag=&quot;button&quot;&gt;
              Menu item 5
            &lt;/v-dropdown-menu-item&gt;
          &lt;/v-card&gt;
        &lt;/v-dropdown&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;v-input class=&quot;ml-auto mr-4&quot;&gt;&lt;/v-input&gt;
    &lt;v-button style-button=&quot;default outline&quot;&gt;Search&lt;/v-button&gt;
  &lt;/div&gt;
&lt;/v-navbar&gt;
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
        prop: "fixed",
        type: "Boolean",
        default: "false",
        description: "If true navbar position is set to fixed. If both <code>fixed</code> and <code>sticky</code> are false then navbar is positioned as relative",
      },
      {
        prop: "sticky",
        type: "Boolean",
        default: "false",
        description:
          "If true navbar position is set to sticky. If both <code>fixed</code> and <code>sticky</code> are false then navbar is positioned as relative",
      },
      {
        prop: "bottom",
        type: "Boolean",
        default: "false",
        description:
          "Places navbar on the bottom. <span class='font-semibold'>Note</span>: fixed must be also set to true",
      },
      {
        prop: "name",
        type: "String",
        default: "navbar",
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
        prop: "style-navbar",
        description: "Main navbar element",
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
        description: "Slot for navbar content",
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

    let example = reactive({});

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
