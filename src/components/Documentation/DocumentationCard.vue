<template>
  <h3>Card</h3>
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
    <div class="example">
      <v-card width="320px" style-card="default shadow-md hoverable">
        <img :src="randomPhoto()" alt="" />
        <header class="pt-3 px-3">
          <span class="font-semibold">Example card</span>
        </header>
        <header class="py-1 px-3">
          <span class="text-gray-500 text-sm">Subtitle</span>
        </header>
        <div class="p-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
        <hr />
        <div class="text-sm px-3 py-2">Card footer</div>
      </v-card>

      <v-card width="720px" style-card="default shadow-md hoverable" style="height: 320px" class="flex my-10">
        <img :src="randomPhotoHorizontal()" alt="" />
        <div class="flex flex-col">
        <header class="pt-4 px-3">
          <span class="font-semibold">Example card</span>
        </header>
        <header class="py-1 px-3">
          <span class="text-gray-500 text-sm">Subtitle</span>
        </header>
          <div class="p-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </div>
          <hr class="w-10/12 mx-auto">
          <v-button style-button="default small" class="ml-auto mt-auto m-4">Details</v-button>
        </div>
      </v-card>
    </div>
    <pre>
      <code>
{{`<v-card width="320px" style-card="default shadow-md">
  <img :src="randomPhoto()" alt="" />
  <header class="p-3">
    <span class="font-semibold">Example card</span>
  </header>
  <div class="p-3">
    Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book.
  </div>
  <hr />
  <div class="text-sm px-3 py-2">Card footer</div>
</v-card>

<v-card width="720px" style-card="default shadow-md" style="height: 320px" class="flex my-10">
  <img :src="randomPhotoHorizontal()" alt="" />
  <div class="flex flex-col">
    <header class="p-4">
      <span class="font-semibold">Horizontal card</span>
    </header>
    <div class="p-4">
      Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book.
    </div>
    <hr class="w-10/12 mx-auto">
    <v-button style-button="default small" class="ml-auto mt-auto m-4">Details</v-button>
  </div>
</v-card>`}}
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
        prop: "width",
        type: "String",
        default: "undefined",
        description: "Width of the card",
      },
      {
        prop: "name",
        type: "String",
        default: "card",
        description: "Useful for setting alternative styles from style.js",
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

    let id = [1015, 1016, 1040, 1043, 1067, 155, 158, 179, 184, 191];

    let randomPhoto = () =>
      `https://picsum.photos/id/${id[(Math.random() * 9).toFixed(0)]}/320/200`;

    let randomPhotoHorizontal = () =>
      `https://picsum.photos/id/${id[(Math.random() * 9).toFixed(0)]}/320/300`;

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
      id,
      randomPhoto,
      randomPhotoHorizontal,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
