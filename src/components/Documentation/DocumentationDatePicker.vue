<template>
  <h3>Date Picker</h3>
  <p class="text-xl font-light">Date Picker component</p>

  <section>
    <h5>Reference</h5>
    <p></p>
    <v-table
      :items="reference"
      :definition="referenceDefinition"
      table="default fixed"
      header-cell="default bordered"
      cell="default bordered"
    >
      <template #cell:type="{ value }"
        ><code v-for="c in value" class="code-word mx-1">{{
          c
        }}</code></template
      >
      <template #cell:default="{ value }"
        ><code class="code-default">{{
          value
        }}</code></template
      >
      <template #cell:description="{ value }"
        ><span v-html="value"></span
      ></template>
    </v-table>
  </section>

  <!-- <section> -->
  <!--   <h5>Reference</h5> -->
  <!--   <p></p> -->
  <!--   <v&#45;table :items="reference" :definition="referenceDefinition" small> -->
  <!--     <template #cell:type="{ value }"> -->
  <!--       <template v&#45;if="Array.isArray(value)"> -->
  <!--         <template v&#45;for="(i, index) in value"> -->
  <!--           <span v&#45;if="index > 0"> or </span> -->
  <!--           <code>{{i}}</code> -->
  <!--         </template> -->
  <!--       </template> -->
  <!--       <template v&#45;else> -->
  <!--         <code>{{ value }}</code> -->
  <!--       </template> -->
  <!--     </template> -->
  <!--     <template #cell:description="{ value }"> -->
  <!--       <span v&#45;html="value"></span> -->
  <!--     </template> -->
  <!--   </v&#45;table> -->
  <!-- </section> -->

  <section>
    <h5>v-model</h5>
    <span class="font-bold">Type</span>: <code class="code-word">String</code><code class="code-word">Array</code>
    <p>
      <code>v-model</code> is used to return date after selection. v-model can
      be Array or string depending on selection mode. In range mode
      <code>v-model</code> returns <code>Array</code> of two
      <code>String</code>. In single day mode <code>v-model</code> returns
      <code>String</code>. Date is in ISO format
      <code>YYYY-MM-DD</code>
    </p>
    <div class="example">
      Single mode
          <div class="flex">
            <v-card style="width: 320px" class="p-2">
              <v-date-picker v-model="date.date" adjecent-months></v-date-picker>
            </v-card>
            <span class="ml-10">
              v-model: {{ date.date }}
            </span>
          </div>
          Range mode
          <div class="flex">
            <v-card style="width: 320px" class="p-2">
              <v-date-picker v-model="date.date" range adjecent-months></v-date-picker>
            </v-card>
            <span class="ml-10">
              v-model: {{ date.date }}
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
    <h5>Buttons</h5>
    <span class="font-bold">Type</span>: <code class="code-word">Boolean</code>
    <p>Use buttons for accepting selection or canceling input. If buttons props is false model is updated immedietely after click.</p>
    <div class="example">
      <v-dropdown>
        <template #activator>
          <input
            type="text"
            v-model="date.done"
            class="form-control"
            placeholder="Pick date"
          />
        </template>
        <template #default="{ hide }">
          <v-card class="p-2">
            <v-date-picker
              v-model="date.done"
              width="320px"
              adjecent-months
              buttons
              @state:done="hide"
            ></v-date-picker>
          </v-card>
        </template>
      </v-dropdown>
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
        description: "v-model is used to return date after selection.",
      },
      {
        prop: "locale",
        type: ["String"],
        default: "en-GB",
        description:
          "Locale only affects names of months and weekdays and does not change any other properties like date format, separators, order of days etc.",
      },
      {
        prop: "range",
        type: ["Boolean"],
        default: "false",
        description: "Allows selection of date ranges.",
      },
      {
        prop: "euro",
        type: ["Boolean"],
        default: "false",
        description: "Week starts on Monday.",
      },
      {
        prop: "disabled",
        type: ["Array"],
        default: "undefined",
        description: "Disables selection of days.",
      },
      {
        prop: "width",
        type: ["String"],
        default: "undefined",
        description: "Component width.",
      },
      {
        prop: "adjecent-months",
        type: ["Boolean"],
        default: "false",
        description: "Display previous and next month days.",
      },
      {
        prop: "range-hover-selection",
        type: ["Boolean"],
        default: "false",
        description:
          "Enables highlighing days in range when hovering over days during selection.",
      },
      {
        prop: "buttons",
        type: ["Boolean"],
        default: "false",
        description:
          "Use buttons for accepting selection or canceling input. If buttons props is false model is updated immedietely after click.",
      },
      {
        prop: "secondary-button-label",
        type: ["String"],
        default: "OK",
        description: "Secondary (cancel) button label.",
      },
      {
        prop: "primary-button-label",
        type: ["String"],
        default: "Cancel",
        description: "Primary (accept) button label.",
      },
      {
        prop: "secondary-button-style",
        type: ["String"],
        description: "Secondary button styles.",
      },
      {
        prop: "primary-button-style",
        type: ["String"],
        description: "Primary button styles.",
      },
      {
        prop: "name",
        type: ["String"],
        default: "datepicker",
        description: "Component name. Useful for setting alternative styles.",
      },
      {
        prop: "transition",
        type: ["String"],
        default: "fade",
        description:
          "Transition when switching months or years. Valid values are 'fade', 'slide' or empty string for no transition.",
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

    let date = reactive({
      date: ref(""),
      range: ref(""),
      done: ref(""),
    });

    onMounted(() => {
      hljs.highlightAll();
    });

    return {
      reference,
      referenceDefinition,
      date,
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
}
.example {
  margin-top: 2em;
}
.code-word {
  @apply text-sm bg-indigo-200 rounded p-1 mx-1;
}
.code-default {
  @apply text-sm;
}
</style>
