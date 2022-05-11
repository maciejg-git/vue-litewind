<template>
  <h3>Date Picker</h3>
  <p></p>

  <section>
    <h5>Reference</h5>
    <p></p>
    <table-reference :items="reference"></table-reference>

    <h6>Styling props</h6>
    <p></p>
    <table-reference-basic :items="styles"></table-reference-basic>

    <h6>Events</h6>
    <p></p>
    <table-reference-basic :items="events"></table-reference-basic>
  </section>

  <section>
    <h4>v-model</h4>
    <span class="font-bold">Type</span>
    :
    <code class="code-word">String</code>
    <code class="code-word">Array</code>
    <p>
      v-model is used to return date after selection. v-model can be
      <code>Array</code>
      or
      <code>String</code>
      depending on selection mode. In range mode v-model returns
      <code>Array</code>
      of two
      <code>String</code>
      . In single mode v-model returns
      <code>String</code>
      . Date is in
      <code>YYYY-MM-DD</code>
      format.
    </p>
    <div class="example">
      <example-datepicker-model></example-datepicker-model>
    </div>
    <v-code :code="exampleDatepickerModelCode" template language="html"></v-code>
    <v-code :code="exampleDatepickerModelCode" script language="js"></v-code>
  </section>
  <section>
    <h4>Example</h4>
    <p></p>
    <div class="example lg:flex">
      <example-datepicker></example-datepicker>
    </div>
    <v-code :code="exampleDatepickerCode" template language="html"></v-code>
    <v-code :code="exampleDatepickerCode" script language="js"></v-code>
  </section>

  <section>
    <h4 id="dropdown">Datepicker in dropdown</h4>
    <p></p>
    <div class="example md:flex">
      <example-datepicker-dropdown></example-datepicker-dropdown>
    </div>
    <v-code :code="exampleDatepickerDropdownCode" template language="html"></v-code>
    <v-code :code="exampleDatepickerDropdownCode" script language="js"></v-code>
  </section>
</template>

<script>
import { ref, reactive } from "vue";
import ExampleDatepicker from "./examples/ExampleDatepicker.vue"
import ExampleDatepickerModel from "./examples/ExampleDatepickerModel.vue"
import ExampleDatepickerDropdown from "./examples/ExampleDatepickerDropdown.vue"
import exampleDatepickerCode from "./examples/ExampleDatepicker.vue?raw"
import exampleDatepickerModelCode from "./examples/ExampleDatepickerModel.vue?raw"
import exampleDatepickerDropdownCode from "./examples/ExampleDatepickerDropdown.vue?raw"
import { styleProps } from "./shared-props"

export default {
  components: {
    ExampleDatepicker,
    ExampleDatepickerModel,
    ExampleDatepickerDropdown,
  },
  setup() {
    let reference = ref([
      {
        prop: "v-model",
        type: ["Array", "String"],
        description:
          "v-model is used to return date after selection. Date is in YYYY-MM-DD format",
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
          "This prop is only used to display names of months and weekdays and to format date emitted by input:formatted event. It does not modify format of v-model date which is always YYYY-MM-DD",
      },
      {
        prop: "format",
        type: ["Object"],
        default: "",
        description:
          "Format of date emmited by <code class='code-word'>input:formatted</code> event. Read about how to use this object <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat' class='link'>here</a> (options paremeter)",
      },
      {
        prop: "monday-first-weekday",
        type: ["Boolean"],
        default: "false",
        description: "Week starts on Monday",
      },
      // {
      //   prop: "disabled",
      //   type: ["Array"],
      //   default: "undefined",
      //   description: "Disables selection of days",
      // },
      {
        prop: "width",
        type: ["String"],
        default: "undefined",
        description: "Component width",
      },
      {
        prop: "adjacent-months",
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
          "Adds 'accept' and 'cancel' buttons. If this prop is false then v-model is updated immedietely after clicking on the day. If it is true then v-model is updated after clicking 'accept' button",
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
        prop: "transition",
        type: ["String"],
        default: "fade",
        description:
          "Transition when switching months or years. Valid values are 'fade', 'slide' or empty string for no transition",
      },
      ...styleProps("datepicker"),
    ]);

    let styles = ref([
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
        prop: "style-adjacent-month-day",
        description:
          "Days from adjacent months",
      },
      {
        prop: "style-footer",
        description: "Footer with today date",
      },
    ]);

    let events = ref([
      {
        prop: "update:formatted",
        description:
          "Emmited after selecting date along with update:modelValue. Date is in formatted using locale and format prop",
      },
      {
        prop: "state:done",
        description:
          "Emmited after selecting date (and clicking primary button if buttons props is set to true)",
      },
      {
        prop: "input:cancel",
        description: "Emmited after clicking secondary button",
      },
    ]);

    return {
      reference,
      styles,
      events,
      exampleDatepickerCode,
      exampleDatepickerModelCode,
      exampleDatepickerDropdownCode,
    };
  },
};
</script>

<style scoped>
</style>
