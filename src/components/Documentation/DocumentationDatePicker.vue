<template>
  <h3>Date Picker</h3>
  <p></p>

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
  </section>

  <section>
    <h4>v-model</h4>
    <span class="font-bold">Type</span>
    :
    <code class="code-word">String</code>
    <code class="code-word">Array</code>
    <p>
      <code>v-model</code>
      is used to return date after selection. v-model can be Array or string
      depending on selection mode. In range mode
      <code>v-model</code>
      returns
      <code>Array</code>
      of two
      <code>String</code>
      . In single mode
      <code>v-model</code>
      returns
      <code>String</code>
      . Date is in ISO format
      <code>YYYY-MM-DD</code>
    </p>
    <div class="example">
      <div class="flex">
        <v-card style="width: 320px" class="p-2">
          <v-date-picker
            v-model="exampleModel.single"
            adjecent-months
          ></v-date-picker>
        </v-card>
        <span class="ml-10">v-model (single): {{ exampleModel.single }}</span>
      </div>
      <div class="flex">
        <v-card style="width: 320px" class="p-2 mt-2">
          <v-date-picker
            v-model="exampleModel.range"
            range
            adjecent-months
          ></v-date-picker>
        </v-card>
        <span class="ml-10">v-model (range): {{ exampleModel.range }}</span>
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
    <h4>Example</h4>
    <p></p>
    <div class="example lg:flex">
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
          @update:modelValue="
            example.events.unshift({ ev: 'update:modelValue', data: $event })
          "
          @input:formatted="
            example.events.unshift({ ev: 'input:formatted', data: $event })
          "
          @state:done="
            example.events.unshift({ ev: 'state:done', data: $event })
          "
          @state:cancel="
            example.events.unshift({ ev: 'state:cancel', data: $event })
          "
        />
      </v-card>
      <div class="flex-grow mt-4 lg:ml-14 lg:mt-0">
        <v-tabs theme="material">
          <v-tab name="Props">
            <div class="mb-2 mt-5">
              <label for="model" class="font-semibold">v-model:</label>
              <v-input type="text" id="model" v-model="example.date">
              </v-input>
            </div>
            <div class="mb-2">
              <label for="range">range:</label>
              <v-select id="range" v-model="example.range">
                <option :value="true">true</option>
                <option :value="false">false</option>
              </v-select>
            </div>
            <div class="mb-2">
              <label for="locale">locale:</label>
              <v-input type="text" id="locale" v-model="example.locale">
              </v-input>
            </div>
            <div class="mb-2">
              <label for="euro">euro:</label>
              <v-select id="euro" v-model="example.euro">
                <option :value="true">true</option>
                <option :value="false">false</option>
              </v-select>
            </div>
            <div class="mb-2">
              <label for="buttons">buttons:</label>
              <v-select id="buttons" v-model="example.buttons">
                <option :value="true">true</option>
                <option :value="false">false</option>
              </v-select>
            </div>
            <div class="mb-2">
              <label for="primary-button-label">primary-button-label:</label>
              <v-input
                type="text"
                id="primary-button-label"
                v-model="example.primaryButtonLabel"
              >
              </v-input>
            </div>
            <div class="mb-2">
              <label for="secondary-button-label">
                secondary-button-label:
              </label>
              <v-input
                type="text"
                id="secondary-button-label"
                v-model="example.secondaryButtonLabel"
              >
              </v-input>
            </div>
            <div class="mb-2">
              <label for="adjacent-months">adjacent-months:</label>
              <v-select id="adjacent-months" v-model="example.adjecentMonths">
                <option :value="true">true</option>
                <option :value="false">false</option>
              </v-select>
            </div>
            <div class="mb-2">
              <label for="range-hover-highlight">range-hover-highlight:</label>
              <v-select
                id="range-hover-highlight"
                v-model="example.rangeHoverHighlight"
              >
                <option :value="true">true</option>
                <option :value="false">false</option>
              </v-select>
            </div>
            <div class="mb-5">
              <label for="transition">transition:</label>
              <v-select id="transition" v-model="example.transition">
                <option value="fade">fade</option>
                <option value="slide">slide</option>
                <option value="">empty string (no transition)</option>
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
    </div>
    <pre>
      <code class="language-html">
{{`<v-card style="width: 320px" class="self-start p-2">
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
    @input:formatted="example.events.push({ev: 'input:formatted', data: $event})"
    @state:done="example.events.push({ev: 'state:done', data: $event})"
    @state:cancel="example.events.push({ev: 'state:cancel', data: $event})"
    />
</v-card>`}}
      </code>
    </pre>
  </section>

  <section>
    <h4 id="dropdown">Datepicker in dropdown</h4>
    <p></p>
    <div class="example md:flex">
      <v-dropdown>
        <template #activator>
          <input
            type="text"
            v-model="exampleDropdown.date"
            placeholder="Pick date"
          />
        </template>
        <template #default="{ hide }">
          <v-card style-card="default shadow" class="p-2">
            <v-date-picker
              v-model="exampleDropdown.date"
              width="305px"
              :buttons="exampleDropdown.buttons"
              adjecentMonths
              @state:done="hide"
            ></v-date-picker>
          </v-card>
        </template>
      </v-dropdown>
      <div class="mt-4 lg:ml-10 lg:mt-0">
        <div class="mb-2">
          <label for="dropdown-buttons">buttons:</label>
          <select
            id="dropdown-buttons"
            v-model="exampleDropdown.buttons"
            class="
              rounded
              border-gray-300
              focus:border-gray-400 focus:ring focus:ring-indigo-200
              py-1
            "
          >
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
      </div>
    </div>
    <pre>
      <code class="language-html">
{{`<v-dropdown>
  <template #activator>
    <input
      type="text"
      v-model="exampleDropdown.date"
      placeholder="Pick date"
      />
  </template>
  <template #default="{ hide }">
    <v-card class="p-2">
      <v-date-picker
        v-model="exampleDropdown.date"
        width="305px"
        :buttons="exampleDropdown.buttons"
        @state:done="hide"
        />
    </v-card>
  </template>
</v-dropdown>`}}
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, watch, onMounted } from "vue";
import hljs from "highlight.js";

export default {
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Array", "String"],
        description:
          "v-model is used to return date after selection. Date is formatted as ISO",
      },
      {
        prop: "range",
        type: ["Boolean"],
        default: "false",
        description: "Allows selection of date ranges",
      },
      {
        prop: "locale",
        type: ["String"],
        default: "en-GB",
        description:
          "This prop is only used to display names of months and weekdays and to format date emitted by input:formatted event. It does not modify v-model date which is always ISO",
      },
      {
        prop: "format",
        type: ["Object"],
        default: "",
        description:
          "Format of date emmited by <code>input:formatted</code> event. Read about how to use this object <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat' class='link'>here</a> (options paremeter)",
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
        description:
          "Display days from previous and next month. Those days are unselectable",
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
        description:
          "Useful only for setting alternative styles from styles.js",
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

    let referenceEvents = ref([
      {
        event: "update:modelValue",
        description: "Update v-model",
      },
      {
        event: "input:formatted",
        description:
          "Emmited after selecting date along with update:modelValue. Date is in formatted using locale and format prop",
      },
      {
        event: "state:done",
        description:
          "Emmited after selecting date (and clicking primary button if buttons props is set to true)",
      },
      {
        event: "state:cancel",
        description: "Emmited after clicking secondary button",
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
        slot: "-",
        description: "This component does not provide any slots.",
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

    let exampleModel = reactive({
      single: ref(""),
      range: ref(""),
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
      formattedEmitted: false,
      doneEmitted: false,
      cancelEmitted: false,
      events: [],
      formatted: "",
      done: false,
      cancel: false,
    });

    // watch([() => example.formatted, () => example.done, () => example.cancel],
    //   () => {
    //     formatted = null;
    // })

    // handleFormatted(ev) {
    //   example.formatted = ev;
    //   example.formattedEmitted = true;
    // }

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
      referenceEvents,
      referenceEventsDefinition,
      referenceSlots,
      referenceSlotsDefinition,
      exampleModel,
      example,
      exampleDropdown,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
