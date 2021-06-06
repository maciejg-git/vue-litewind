<template>
  <h3>Date Picker</h3>
  <p class="text-xl font-light">Date Picker component</p>

  <section>
    <h5>Reference</h5>
    <p></p>
    <v-table
      :items="reference"
      :definition="referenceDefinition"
      style-table="default fixed"
      style-header-cell="default bordered"
      style-cell="default bordered"
    >
      <template #cell:type="{ value }">
        <code v-for="c in value" class="code-word mx-1">
          {{ c }}
        </code>
      </template>
      <template #cell:default="{ value }">
        <code class="text-sm">
          {{ value }}
        </code>
      </template>
      <template #cell:description="{ value }"
        ><span v-html="value"></span
      ></template>
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
  </section>

  <section>
    <h5>v-model</h5>
    <span class="font-bold">Type</span>: <code class="code-word">String</code
    ><code class="code-word">Array</code>
    <p>
      <code>v-model</code> is used to return date after selection. v-model can
      be Array or string depending on selection mode. In range mode
      <code>v-model</code> returns <code>Array</code> of two
      <code>String</code>. In single mode <code>v-model</code> returns
      <code>String</code>. Date is in ISO format
      <code>YYYY-MM-DD</code>
    </p>
    <div class="example">
      <div class="flex">
        <v-card style="width: 320px" class="p-2">
          <v-date-picker
            v-model="exampleModelSingle.date"
            adjecent-months
          ></v-date-picker>
        </v-card>
        <span class="ml-10">
          v-model (single): {{ exampleModelSingle.date }}
        </span>
      </div>
      <div class="flex">
        <v-card style="width: 320px" class="p-2 mt-2">
          <v-date-picker
            v-model="exampleModelRange.date"
            range
            adjecent-months
          ></v-date-picker>
        </v-card>
        <span class="ml-10">
          v-model (range): {{ exampleModelRange.date }}
        </span>
      </div>
    </div>
    <pre>
      <code>
{{`<v-card 
  style="width: 320px" 
  class="p-2"
>
  <v-date-picker 
    v-model="date.date"
  >
  </v-date-picker>
</v-card>`}}
      </code>
    </pre>
  </section>

  <section>
    <h5>Example</h5>
    <p></p>
    <div class="example md:flex">
      <v-card style="width: 320px" class="self-start p-2">
        <v-date-picker
          v-model="example.date"
          :range="example.range"
          :locale="example.locale"
          :euro="example.euro"
          :buttons="!!example.buttons"
          :primaryButtonLabel="example.primaryButtonLabel"
          :secondaryButtonLabel="example.secondaryButtonLabel"
          :adjecent-months="!!example.adjecentMonths"
          :range-hover-highlight="example.rangeHoverHighlight"
          :transition="example.transition"
          @input:formatted="example.formatted = $event"
        ></v-date-picker>
      </v-card>
      <div class="md:ml-10">
        <div class="mb-2">
          <label for="model" class="font-semibold">v-model: </label>
          <input type="text" id="model" v-model="example.date" />
        </div>
        <div class="mb-2">
          <label for="range">range: </label>
          <select id="range" v-model="example.range">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="locale">locale: </label>
          <input type="text" id="locale" v-model="example.locale" />
        </div>
        <div class="mb-2">
          <label for="euro">euro: </label>
          <select id="euro" v-model="example.euro">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="buttons">buttons: </label>
          <select id="buttons" v-model="example.buttons">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="primary-button-label">primary-button-label: </label>
          <input
            type="text"
            id="primary-button-label"
            v-model="example.primaryButtonLabel"
          />
        </div>
        <div class="mb-2">
          <label for="secondary-button-label">secondary-button-label: </label>
          <input
            type="text"
            id="secondary-button-label"
            v-model="example.secondaryButtonLabel"
          />
        </div>
        <div class="mb-2">
          <label for="adjacent-months">adjacent-months: </label>
          <select id="adjacent-months" v-model="example.adjecentMonths">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="range-hover-highlight">range-hover-highlight: </label>
          <select
            id="range-hover-highlight"
            v-model="example.rangeHoverHighlight"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-5">
          <label for="transition">transition: </label>
          <select id="transition" v-model="example.transition">
            <option value="fade">fade</option>
            <option value="slide">slide</option>
            <option value="">empty string (no transition)</option>
          </select>
        </div>
      </div>
    </div>
    <pre>
      <code>
      </code>
    </pre>
  </section>

  <section>
    <h5>Datepicker in dropdown</h5>
    <p></p>
    <div class="example flex">
      <v-dropdown>
        <template #activator>
          <input
            type="text"
            v-model="exampleDropdown.date"
            class="rounded border-gray-300 focus:border-gray-400 focus:ring focus:ring-indigo-200 py-1"
            placeholder="Pick date"
          />
        </template>
        <template #default="{ hide }">
          <v-card class="p-2">
            <v-date-picker
              v-model="exampleDropdown.date"
              width="320px"
              :buttons="exampleDropdown.buttons"
              @state:done="hide"
            ></v-date-picker>
          </v-card>
        </template>
      </v-dropdown>
      <div class="ml-10">
        <div class="mb-2">
          <label for="dropdown-buttons">buttons: </label>
          <select
            id="dropdown-buttons"
            v-model="exampleDropdown.buttons"
            class="rounded border-gray-300 focus:border-gray-400 focus:ring focus:ring-indigo-200 py-1"
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
      </div>
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

import vDatePicker from "../vDatePicker.vue";
import vCard from "../vCard.vue";
import vDropdown from "../vDropdown.vue";

import hljs from "highlight.js";
import dataJSON from "../../MOCK_DATA (1).json";

export default {
  components: {
    vTable,
    vDatePicker,
    vCard,
    vDropdown,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Array", "String"],
        description: "v-model is used to return date after selection",
      },
      {
        prop: "locale",
        type: ["String"],
        default: "en-GB",
        description:
          "Locale only affects names of months and weekdays and does not change any other properties like date format, separators, order of days etc",
      },
      {
        prop: "range",
        type: ["Boolean"],
        default: "false",
        description: "Allows selection of date ranges",
      },
      {
        prop: "euro",
        type: ["Boolean"],
        default: "false",
        description: "Week starts on Monday",
      },
      {
        prop: "disabled",
        type: ["Array"],
        default: "undefined",
        description: "Disables selection of days",
      },
      {
        prop: "width",
        type: ["String"],
        default: "undefined",
        description: "Component width",
      },
      {
        prop: "adjecent-months",
        type: ["Boolean"],
        default: "false",
        description: "Display previous and next month days",
      },
      {
        prop: "range-hover-selection",
        type: ["Boolean"],
        default: "false",
        description:
          "Enables highlighing days in range when hovering over days during selection",
      },
      {
        prop: "buttons",
        type: ["Boolean"],
        default: "false",
        description:
          "Use buttons for accepting selection or canceling input. If buttons props is false model is updated immedietely after click",
      },
      {
        prop: "secondary-button-label",
        type: ["String"],
        default: "OK",
        description: "Secondary (cancel) button label",
      },
      {
        prop: "primary-button-label",
        type: ["String"],
        default: "Cancel",
        description: "Primary (accept) button label",
      },
      {
        prop: "secondary-button-style",
        type: ["String"],
        description: "Secondary button styles",
      },
      {
        prop: "primary-button-style",
        type: ["String"],
        description: "Primary button styles",
      },
      {
        prop: "name",
        type: ["String"],
        default: "datepicker",
        description: "Component name. Useful for setting alternative styles",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade",
        description:
          "Transition when switching months or years. Valid values are 'fade', 'slide' or empty string for no transition",
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
        prop: "style-datepicker",
        description: "Main component wrapper",
      },
      {
        prop: "style-button",
        description: "Next and previous month/year buttons",
      },
      {
        prop: "style-day",
        description: "Single day",
      },
      {
        prop: "style-day-selected",
        description: "Single day selected",
      },
      {
        prop: "style-today",
        description: "Today",
      },
      {
        prop: "style-adjecent-month-day",
        description:
          "Days from adjacent months (enable widh adjacent-months prop)",
      },
      {
        prop: "style-footer",
        description: "Footer with today date",
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

    let date = reactive({
      date: ref(""),
      range: ref(""),
      done: ref(""),
    });

    let exampleModelSingle = reactive({
      date: ref(""),
      range: ref(""),
      done: ref(""),
    });

    let exampleModelRange = reactive({
      date: ref(""),
      range: ref(""),
      done: ref(""),
    });

    let example = reactive({
      date: "",
      range: false,
      locale: "en-GB",
      buttons: true,
      adjecentMonths: true,
      secondaryButtonLabel: "Cancel",
      primaryButtonLabel: "OK",
      rangeHoverHighlight: false,
      transition: "fade",
      euro: true,
      eventFormatted: "",
      eventDone: "",
      eventCancel: "",
    });

    let exampleDropdown = reactive({
      date: "",
      buttons: false,
    });

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      referenceDefinition,
      referenceStyles,
      referenceStylesDefinition,
      date,
      exampleModelSingle,
      exampleModelRange,
      example,
      exampleDropdown,
    };
  },
};
</script>

<style scoped>
h3 {
  @apply text-3xl;
  @apply font-semibold;
}
h4 {
  @apply text-2xl;
  @apply font-semibold;
}
h5 {
  @apply text-xl;
  @apply font-semibold;
}
h6 {
  @apply text-lg;
  @apply font-semibold;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 2em;
}
p {
  margin-top: 1em;
  margin-bottom: 1em;
}
.example {
  margin-top: 2em;
}
.code-word {
  @apply text-sm bg-indigo-200 rounded p-1 mx-1;
}
input[type="checkbox"] {
  transform: scale(1.2);
  @apply focus:ring-2;
  @apply focus:ring-offset-0;
  @apply focus:ring-blue-200;
}
label {
  @apply mr-2;
}
input[type="text"],
select {
  @apply rounded border-gray-300 focus:border-gray-400 focus:ring focus:ring-indigo-200 py-1;
}
</style>
