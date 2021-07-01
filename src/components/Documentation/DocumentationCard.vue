<template>
  <h3>Card</h3>
  <p>Card component
    See <a href="datepicker#dropdown" class="link">this example</a> that uses card component as container for datepicker. Or <a href="dropdown#example" class="link">this</a> for example of card as container for dropdown menu.
  </p>

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
      <template #cell:description="{ value }"
        ><span v-html="value"></span
      ></template>
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
      <v-card width="320px" style-card="default shadow-md">
        <img :src="randomPhoto()" alt="">
        <div class="p-2">
          <span class="font-semibold">
            Example card
          </span>
        </div>
        <div class="p-2">
        Card text
        </div>
        <hr>
        <div class="text-sm p-2">
        Card footer
        </div>
      </v-card>
    </div>
    <pre>
      <code>
{{`<v-card width="320px">
  <img src="https://picsum.photos/320/200" alt="">
  <div class="p-2">
    <span class="font-semibold">
      Example card
    </span>
  </div>
</v-card>`}}
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import vTable from "../vTable.vue";
import vCard from "../vCard.vue"
import vButton from "../vButton.vue"

import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export default {
  components: {
    vTable,
    vCard,
    vButton,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "width",
        type: "String",
        default: "undefined",
        description:
          "Width of the card",
      },
      {
        prop: "name",
        type: "String",
        default: "card",
        description:
          "Useful for setting alternative styles from style.js",
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
        prop: "style-card",
        description: "Main card element",
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
        description: "Default slot for card content",
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

    let id = [1015, 1016, 1040, 1043, 1067, 155, 158, 179, 184, 191]

    let randomPhoto = () => `https://picsum.photos/id/${id[(Math.random() * 10).toFixed(0)]}/320/200`

    let example = reactive({

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
      id,
      randomPhoto,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
