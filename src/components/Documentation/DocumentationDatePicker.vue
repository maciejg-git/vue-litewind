<template>
  <h3>Date Picker</h3>
  <p>Date Picker component</p>

  <section>
    <h5>Example</h5>
    <p></p>
    <div class="example">
      <v-card style="width: 320px" class="p-2">
        <v-date-picker v-model="date.date"></v-date-picker>
      </v-card>
    </div>
    <pre>
      <code>
{{`<v-card 
  style="width: 320px"
  class="p-2"
>
  <v-date-picker 
    v-model="date"
  >
  </v-date-picker>
</v-card>`}}
      </code>
    </pre>
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
    <span class="fw-bold">Type</span>: <code>String</code> or <code>Array</code>
    <p><code>v-model</code> is used to return date after selection. There are two selection modes: date range (<code>range</code> prop set) or single day. In range mode <code>v-model</code> will return <code>Array</code> of two <code>String</code>. In single day mode <code>v-model</code> returns <code>String</code>. Date format is always <code>m-d-yyyy</code> (without trailing zero for single digits).</p>
    <div class="example">
      <div class="row">
      <div class="col-auto">
        <v-card style="width: 320px" class="p-2">
          <v-date-picker v-model="date.date"></v-date-picker>
        </v-card>
      </div>
      <div class="col">
        v-model: {{ date.date }}
      </div>
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
    <h5>Locale</h5>
    <span class="fw-bold">Type</span>: <code>String</code>
    <p>Note: locale only affects names of months and weekdays and does not change any other properties like date format, separators, order of days etc.<br><span class='fw-bold'>Default</span>: 'en-GB'</p>
    <div class="example">
      <v-card style="width: 320px" class="p-2 d-inline-block me-2">
        <v-date-picker v-model="date.date" locale="es-ES"></v-date-picker>
      </v-card>
      <v-card style="width: 320px" class="p-2 d-inline-block">
        <v-date-picker v-model="date.date" locale="sv-SE"></v-date-picker>
      </v-card>
    </div>
    <pre>
      <code>
{{`<v-card style="width: 320px" class="p-2 d-inline-block me-2">
  <v-date-picker v-model="date" locale="es-ES"></v-date-picker>
</v-card>
<v-card style="width: 320px" class="p-2 d-inline-block">
  <v-date-picker v-model="date" locale="sv-SE"></v-date-picker>
</v-card>`}}
      </code>
    </pre>
  </section>

  <section>
    <h5>Range</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Range prop allows selection range</p>
    <div class="example">
      <div class="row">
      <div class="col-auto">
        <v-card style="width: 320px" class="p-2">
          <v-date-picker v-model="date.range" range></v-date-picker>
        </v-card>
      </div>
      <div class="col">
        v-model: {{ date.range }}
      </div>
      </div>
    </div>
    <pre>
      <code>
{{`<v-card 
  style="width: 320px" 
  class="p-2"
>
  <v-date-picker 
    v-model="date.range" 
    range
  >
  </v-date-picker>
</v-card>`}}
      </code>
    </pre>
  </section>

  <section>
    <h5>Euro</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>With euro prop set week starts on Monday.</p>
    <div class="example">
      <v-card style="width: 320px" class="p-2">
        <v-date-picker v-model="date.date" euro></v-date-picker>
      </v-card>
    </div>
    <pre>
      <code>

      </code>
    </pre>
  </section>

  <section>
    <h5>Disabled</h5>
    <span class="fw-bold">Type</span>: <code>Array</code> of <code>Numbers</code>
    <p>Disables selection of specified days. Prop is an <code>Array</code> of <code>Numbers</code> where <code>Number</code> is an index of weekday starting from 0 (Sunday) or 0 (Monday) with euro prop set.</p>
    <div class="example">
      <v-card style="width: 320px" class="p-2">
        <v-date-picker v-model="date.date" :disabled="[0, 6]"></v-date-picker>
      </v-card>
    </div>
    <pre>
      <code>

      </code>
    </pre>
  </section>

  <section>
    <h5>Mark-sat-sun</h5>
    <span class="fw-bold">Type</span>: <code>Boolean</code>
    <p>Adds some bold styling to Saturdays and Sundays.</p>
    <div class="example">
      <v-card style="width: 320px" class="p-2">
        <v-date-picker v-model="date.date" mark-sat-sun></v-date-picker>
      </v-card>
    </div>
    <pre>
      <code>

      </code>
    </pre>
  </section>

  <section>
    <h5>State:done (event)</h5>
    <span class="fw-bold">Type</span>: <code>String</code>
    <p>Event <code>state:done</code> is emmited after selection is complete.</p>
    <div class="example">
      <v-dropdown>
        <template #activator>
          <input type="text" v-model="date.done" class="form-control" placeholder="Pick date">
        </template>
        <template #default="{ hide }">
          <v-card class="p-2">
            <v-date-picker v-model="date.done" width="320px" @state:done="hide"></v-date-picker>
          </v-card>
        </template>
      </v-dropdown>
    </div>
    <pre>
      <code>
{{`<v-dropdown>
  <template #activator>
    <input 
      type="text" 
      v-model="date.done" 
      class="form-control"
    >
  </template>
  <template #default="{ hide }">
    <v-date-picker 
      v-model="date.done" 
      width="320px">
      @state:done="hide" 
    </v-date-picker>
  </template>
</v-dropdown>`}}
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import vTable from "../vTable.vue";

import vDatePicker from "../vDatePicker.vue"
import vCard from "../vCard.vue"
import vDropdown from "../vDropdown.vue"

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
        type: "String",
        description:
          "",
      },
      {
        prop: "range",
        type: "Boolean",
        description: "Allows selection of date ranges.",
      },
      {
        prop: "euro",
        type: "Boolean",
        description: "Week starts on Monday.",
      },
      {
        prop: "disabled",
        type: "Array",
        description: "Disables selection of days.",
      },
      {
        prop: "mark-sat-sun",
        type: "Boolean",
        description: "Adds bold style to Saturdays and Sundays.",
      },
      {
        prop: "width",
        type: "String",
        description: "Component width.",
      },
      {
        prop: "selection-mode-text",
        type: "Boolean",
        description: "",
      },
    ]);

    let referenceDefinition = ref([
      {
        key: "prop",
        sortable: true,
      },
      {
        key: "type",
        sortable: true,
      },
      {
        key: "description",
      },
    ]);

    let date = reactive({
      date: ref(""),
      range: ref(""),
      done: ref(""),
    })

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
h5 {
  @apply text-xl;
  @apply font-semibold;
}
h3 {
  @apply text-3xl;
  @apply font-semibold;
}
h1, h2, h3, h4, h5, h6 {
  margin-top: 2em;
}
p {
  margin-top: 1em;
}
.example {
  margin-top: 2em;
}
</style>
