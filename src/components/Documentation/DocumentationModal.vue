<template>
  <h3>Modal</h3>
  <p class="text-xl font-light">
    Modal dialog component. Has two standard buttons for most applications or
    provide own in footer slow.
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

    <h6>Events</h6>
    <p></p>
    <v-table
      :items="referenceEvents"
      :definition="referenceEventsDefinition"
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
      <template #cell:description="{ value }"
        ><span v-html="value"></span
      ></template>
    </v-table>
  </section>

  <section>
    <h4>Example</h4>
    <div class="example md:flex">
      <v-card class="flex flex-col w-1/2 py-10">
        <vButton
          @click="example.isVisible = !example.isVisible"
          class="mx-auto self-center"
          >Show modal</vButton
        >
        <vButton
          @click="example.isVisibleLong = !example.isVisibleLong"
          class="mx-auto self-center"
          >Show long scrollable modal</vButton
        >
      </v-card>
      <div class="md:ml-14">
        <div class="mb-2">
          <label for="busy">position: </label>
          <select id="busy" v-model="example.position">
            <option value="top">top</option>
            <option value="center">center</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="busy">size: </label>
          <select id="busy" v-model="example.size">
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="busy">transition: </label>
          <select id="busy" v-model="example.transition">
            <option value="fade">fade</option>
            <option value="fade-slide">fade-slide</option>
            <option value="fade-scale">fade-scale</option>
          </select>
        </div>
      </div>
    </div>
    <vModal
      v-model="example.isVisible"
      :title="example.title"
      :no-primary-button="!!example.noPrimaryButton"
      :no-secondary-button="!!example.noSecondaryButton"
      :primary-button-label="example.primaryButtonLabel"
      :secondary-button-label="example.secondaryButtonLabel"
      :primary-button-close="!!example.primaryButtonClose"
      :secondary-button-close="!!example.secondaryButtonClose"
      :no-close-button="!!example.noCloseButton"
      :static-backdrop="!!example.staticBackdrop"
      :position="example.position"
      :size="example.size"
      :transition="example.transition"
    >
      <div>
        <div class="mb-2">
          <label for="locale">title: </label>
          <input type="text" id="locale" v-model="example.title" />
        </div>
        <div class="mb-2">
          <label for="busy">no-primary-button: </label>
          <select id="busy" v-model="example.noPrimaryButton">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="busy">no-secondary-button: </label>
          <select id="busy" v-model="example.noSecondaryButton">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="busy">primary-button-label: </label>
          <input type="text" id="locale" v-model="example.primaryButtonLabel" />
        </div>
        <div class="mb-2">
          <label for="busy">secondary-button-label: </label>
          <input
            type="text"
            id="locale"
            v-model="example.secondaryButtonLabel"
          />
        </div>
        <div class="mb-2">
          <label for="busy">primary-button-close: </label>
          <select id="busy" v-model="example.primaryButtonClose">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="busy">secondary-button-close: </label>
          <select id="busy" v-model="example.secondaryButtonClose">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="busy">no-close-button: </label>
          <select id="busy" v-model="example.noCloseButton">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="busy">static-backdrop: </label>
          <select id="busy" v-model="example.staticBackdrop">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="busy">position: </label>
          <select id="busy" v-model="example.position">
            <option value="top">top</option>
            <option value="center">center</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="busy">size: </label>
          <select id="busy" v-model="example.size">
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
          </select>
        </div>
        <div class="mb-2">
          <label for="busy">transition: </label>
          <select id="busy" v-model="example.transition">
            <option value="fade">fade</option>
            <option value="fade-slide">fade-slide</option>
            <option value="fade-scale">fade-scale</option>
          </select>
        </div>
      </div>
    </vModal>
    <vModal
      v-model="example.isVisibleLong"
      :title="example.title"
      :no-primary-button="!!example.noPrimaryButton"
      :no-secondary-button="!!example.noSecondaryButton"
      :primary-button-label="example.primaryButtonLabel"
      :secondary-button-label="example.secondaryButtonLabel"
      :primary-button-close="!!example.primaryButtonClose"
      :secondary-button-close="!!example.secondaryButtonClose"
      :no-close-button="!!example.noCloseButton"
      :static-backdrop="!!example.staticBackdrop"
      :position="example.position"
      :size="example.size"
      :transition="example.transition"
    >
      Early in the month of October, 1815, about an hour before sunset, a man
      who was travelling on foot entered the little town of D—— The few
      inhabitants who were at their windows or on their thresholds at the moment
      stared at this traveller with a sort of uneasiness. It was difficult to
      encounter a wayfarer of more wretched appearance. He was a man of medium
      stature, thickset and robust, in the prime of life. He might have been
      forty-six or forty-eight years old. A cap with a drooping leather visor
      partly concealed his face, burned and tanned by sun and wind, and dripping
      with perspiration. His shirt of coarse yellow linen, fastened at the neck
      by a small silver anchor, permitted a view of his hairy breast: he had a
      cravat twisted into a string; trousers of blue drilling, worn and
      threadbare, white on one knee and torn on the other; an old gray, tattered
      blouse, patched on one of the elbows with a bit of green cloth sewed on
      with twine; a tightly packed soldier knapsack, well buckled and perfectly
      new, on his back; an enormous, knotty stick in his hand; iron-shod shoes
      on his stockingless feet; a shaved head and a long beard.
      <br />

      The sweat, the heat, the journey on foot, the dust, added I know not what
      sordid quality to this dilapidated whole. His hair was closely cut, yet
      bristling, for it had begun to grow a little, and did not seem to have
      been cut for some time.
      <br />

      No one knew him. He was evidently only a chance passer-by. Whence came he?
      From the south; from the seashore, perhaps, for he made his entrance into
      D—— by the same street which, seven months previously, had witnessed the
      passage of the Emperor Napoleon on his way from Cannes to Paris. This man
      must have been walking all day. He seemed very much fatigued. Some women
      of the ancient market town which is situated below the city had seen him
      pause beneath the trees of the boulevard Gassendi, and drink at the
      fountain which stands at the end of the promenade. He must have been very
      thirsty: for the children who followed him saw him stop again for a drink,
      two hundred paces further on, at the fountain in the market-place.
      <br />

      On arriving at the corner of the Rue Poichevert, he turned to the left,
      and directed his steps toward the town-hall. He entered, then came out a
      quarter of an hour later. A gendarme was seated near the door, on the
      stone bench which General Drouot had mounted on the 4th of March to read
      to the frightened throng of the inhabitants of D—— the proclamation of the
      Gulf Juan. The man pulled off his cap and humbly saluted the gendarme.
      <br />

      The gendarme, without replying to his salute, stared attentively at him,
      followed him for a while with his eyes, and then entered the town-hall.
      <br />

      There then existed at D—— a fine inn at the sign of the Cross of Colbas.
      This inn had for a landlord a certain Jacquin Labarre, a man of
      consideration in the town on account of his relationship to another
      Labarre, who kept the inn of the Three Dauphins in Grenoble, and had
      served in the Guides. At the time of the Emperor’s landing, many rumors
      had circulated throughout the country with regard to this inn of the Three
      Dauphins. It was said that General Bertrand, disguised as a carter, had
      made frequent trips thither in the month of January, and that he had
      distributed crosses of honor to the soldiers and handfuls of gold to the
      citizens. The truth is, that when the Emperor entered Grenoble he had
      refused to install himself at the hotel of the prefecture; he had thanked
      the mayor, saying, “I am going to the house of a brave man of my
      acquaintance”; and he had betaken himself to the Three Dauphins. This
      glory of the Labarre of the Three Dauphins was reflected upon the Labarre
      of the Cross of Colbas, at a distance of five and twenty leagues. It was
      said of him in the town, “That is the cousin of the man of Grenoble.”
      <br />

      The man bent his steps towards this inn, which was the best in the
      country-side. He entered the kitchen, which opened on a level with the
      street. All the stoves were lighted; a huge fire blazed gayly in the
      fireplace. The host, who was also the chief cook, was going from one
      stew-pan to another, very busily superintending an excellent dinner
      designed for the wagoners, whose loud talking, conversation, and laughter
      were audible from an adjoining apartment. Any one who has travelled knows
      that there is no one who indulges in better cheer than wagoners. A fat
      marmot, flanked by white partridges and heather-cocks, was turning on a
      long spit before the fire; on the stove, two huge carps from Lake Lauzet
      and a trout from Lake Alloz were cooking.
    </vModal>
    <pre>
      <code>
      </code>
    </pre>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import vModal from "../vModal.vue";
import vButton from "../vButton.vue";

import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export default {
  components: {
    vModal,
    vButton,
  },
  setup(props) {
    let reference = ref([
      {
        prop: "v-model",
        type: "Boolean",
        default: "false",
        description: "Set v-model to true to show modal or false to hide it",
      },
      {
        prop: "title",
        type: "String",
        default: "false",
        description: "Title displayed in modal header",
      },
      {
        prop: "no-primary-button",
        type: "Boolean",
        default: "false",
        description: "Disables primary (OK) button",
      },
      {
        prop: "no-secondary-button",
        type: "Boolean",
        default: "false",
        description: "Disables secondary (Cancel) button",
      },
      {
        prop: "primary-button-style",
        type: "String",
        default: "primary noMargin",
        description: "Style of primary button",
      },
      {
        prop: "secondary-button-style",
        type: "String",
        default: "secondary noMargin",
        description: "Style of secondary button",
      },
      {
        prop: "primary-button-label",
        type: "String",
        default: "OK",
        description: "Label of primary button",
      },
      {
        prop: "secondary-button-label",
        type: "String",
        default: "Cancel",
        description: "Label of secondary button",
      },
      {
        prop: "primary-button-close",
        type: "Boolean",
        default: "false",
        description:
          "If true clicking primary button emits <code>input:secondaryButtonClick</code> event and closes modal. If false modal is not closed after emitting event",
      },
      {
        prop: "secondary-button-close",
        type: "Boolean",
        default: "false",
        description:
          "If true clicking primary button emits <code>input:primaryButtonClick</code> event and closes modal. If false modal is not closed after emitting event",
      },
      {
        prop: "no-close-button",
        type: "Boolean",
        default: "false",
        description: "Disables 'X' button in modal header",
      },
      {
        prop: "static-backdrop",
        type: "Boolean",
        default: "false",
        description:
          "If true modal dialog cannot be closed by clicking outside of it",
      },
      {
        prop: "position",
        type: "String",
        default: "top",
        description: "Modal position. Valid values are: 'top', 'center'",
      },
      {
        prop: "size",
        type: "String",
        default: "md",
        description: "Modal size. Valid values are: 'sm', 'md', 'lg', 'xl'",
      },
      {
        prop: "transition",
        type: "String",
        default: "fade-slide",
        description:
          "Sets animation effect when showing or hiding modal. Valid values are: 'fade', 'fade-slide', 'fade-scale'",
      },
      {
        prop: "name",
        type: "String",
        default: "modal",
        description: "Name of modal. Useful for setting alternative style",
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
        prop: "style-modal",
        description: "Style of modal window",
      },
      {
        prop: "style-header",
        description: "Style of modal header",
      },
      {
        prop: "style-content",
        description: "Content part of modal window",
      },
      {
        prop: "style-backdrop",
        description: "Style of backdrop. Useful mainly for setting tint and opactity for modal background",
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
        event: "input:primaryButtonClick",
        description: "Emmited after clicking primary button",
      },
      {
        event: "input:secondaryButtonClick",
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
        slot: "default",
        description: "Modal content",
      },
      {
        slot: "footer",
        description:
          "Modal footer content. Use this slot to place non standard buttons",
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

    let example = reactive({
      isVisible: false,
      isVisibleLong: false,
      title: "Example modal",
      noPrimaryButton: false,
      noSecondaryButton: false,
      primaryButtonStyle: "primary noMargin",
      secondaryButtonStyle: "secondary noMargin",
      primaryButtonLabel: "OK",
      secondaryButtonLabel: "Cancel",
      primaryButtonClose: false,
      secondaryButtonClose: true,
      noCloseButton: false,
      staticBackdrop: false,
      position: "top",
      size: "md",
      transition: "fade-slide",
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
      example,
    };
  },
};
</script>

<style scoped>
@import "./Documentation.css";
</style>
