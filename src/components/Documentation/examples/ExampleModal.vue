<template>
  <div class="flex flex-col items-center gap-y-2 w-full md:w-1/2">
    <v-button
      @click="example.isVisible = !example.isVisible"
    >
      Show modal
    </v-button>
    <v-button
      @click="example.isVisibleLong = !example.isVisibleLong"
    >
      Show long scrollable modal
    </v-button>
    <v-button
      @click="example.isVisibleImage = !example.isVisibleImage"
    >
      Show image modal
    </v-button>
  </div>

  <!-- CUT START -->
  <div class="mt-4 md:ml-14 md:mt-0">
    <div class="mb-2">
      <label for="position">position:</label>
      <v-select id="position" v-model="example.position">
        <option value="top">top</option>
        <option value="center">center</option>
      </v-select>
    </div>
    <div class="mb-2">
      <label for="size">size:</label>
      <v-select id="size" v-model="example.size">
        <option value="sm">sm</option>
        <option value="md">md</option>
        <option value="lg">lg</option>
        <option value="xl">xl</option>
        <option value="fit">fit</option>
      </v-select>
    </div>
    <div class="mb-2">
      <label for="transition">transition:</label>
      <v-select id="transition" v-model="example.transition">
        <option value="fade">fade</option>
        <option value="fade-slide">fade-slide</option>
        <option value="fade-scale">fade-scale</option>
      </v-select>
    </div>
  </div>
  <!-- CUT END -->

  <!-- modal -->

  <v-modal
    v-model="example.isVisible"
    :title="example.title"
    :no-primary-button="!!example.noPrimaryButton"
    :no-secondary-button="!!example.noSecondaryButton"
    :primary-button-label="example.primaryButtonLabel"
    :secondary-button-label="example.secondaryButtonLabel"
    :primary-button-close="!!example.primaryButtonClose"
    :secondary-button-close="!!example.secondaryButtonClose"
    :no-close-button="!!example.noCloseButton"
    :close-button-in-content="!!example.closeButtonInContent"
    :static-backdrop="!!example.staticBackdrop"
    :no-header="!!example.noHeader"
    :no-footer="!!example.noFooter"
    :position="example.position"
    :size="example.size"
    :transition="example.transition"
  >
    <!-- forms -->
<!-- CUT START -->
    <div>
      <div class="mb-2">
        <label for="title">title:</label>
        <v-input type="text" id="title" v-model="example.title"></v-input>
      </div>
      <div class="mb-2">
        <label for="no-primary-button">no-primary-button:</label>
        <v-select id="no-primary-button" v-model="example.noPrimaryButton">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="no-secondary-button">no-secondary-button:</label>
        <v-select id="no-secondary-button" v-model="example.noSecondaryButton">
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
        ></v-input>
      </div>
      <div class="mb-2">
        <label for="secondary-button-label">secondary-button-label:</label>
        <v-input
          type="text"
          id="secondary-button-label"
          v-model="example.secondaryButtonLabel"
        ></v-input>
      </div>
      <div class="mb-2">
        <label for="primary-button-close">primary-button-close:</label>
        <v-select
          id="primary-button-close"
          v-model="example.primaryButtonClose"
        >
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="secondary-button-close">secondary-button-close:</label>
        <v-select
          id="secondary-button-close"
          v-model="example.secondaryButtonClose"
        >
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="no-close-button">no-close-button:</label>
        <v-select id="no-close-button" v-model="example.noCloseButton">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="close-button-in-content">close-button-in-content:</label>
        <v-select id="close-button-in-content" v-model="example.closeButtonInContent">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="static-backdrop">static-backdrop:</label>
        <v-select id="static-backdrop" v-model="example.staticBackdrop">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="no-header">no-header:</label>
        <v-select id="no-header" v-model="example.noHeader">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="no-footer">no-footer:</label>
        <v-select id="no-footer" v-model="example.noFooter">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="position-modal">position:</label>
        <v-select id="position-modal" v-model="example.position">
          <option value="top">top</option>
          <option value="center">center</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="size-modal">size:</label>
        <v-select id="size-modal" v-model="example.size">
          <option value="sm">sm</option>
          <option value="md">md</option>
          <option value="lg">lg</option>
          <option value="xl">xl</option>
        </v-select>
      </div>
    </div>
<!-- CUT END -->
  </v-modal>

  <!-- long scrollable modal -->

  <v-modal
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
    Early in the month of October, 1815, about an hour before sunset, a man who
    was travelling on foot entered the little town of D—— The few inhabitants
<!-- CUT START -->
    who were at their windows or on their thresholds at the moment stared at
    this traveller with a sort of uneasiness. It was difficult to encounter a
    wayfarer of more wretched appearance. He was a man of medium stature,
    thickset and robust, in the prime of life. He might have been forty-six or
    forty-eight years old. A cap with a drooping leather visor partly concealed
    his face, burned and tanned by sun and wind, and dripping with perspiration.
    His shirt of coarse yellow linen, fastened at the neck by a small silver
    anchor, permitted a view of his hairy breast: he had a cravat twisted into a
    string; trousers of blue drilling, worn and threadbare, white on one knee
    and torn on the other; an old gray, tattered blouse, patched on one of the
    elbows with a bit of green cloth sewed on with twine; a tightly packed
    soldier knapsack, well buckled and perfectly new, on his back; an enormous,
    knotty stick in his hand; iron-shod shoes on his stockingless feet; a shaved
    head and a long beard.
    <br />

    The sweat, the heat, the journey on foot, the dust, added I know not what
    sordid quality to this dilapidated whole. His hair was closely cut, yet
    bristling, for it had begun to grow a little, and did not seem to have been
    cut for some time.
    <br />

    No one knew him. He was evidently only a chance passer-by. Whence came he?
    From the south; from the seashore, perhaps, for he made his entrance into
    D—— by the same street which, seven months previously, had witnessed the
    passage of the Emperor Napoleon on his way from Cannes to Paris. This man
    must have been walking all day. He seemed very much fatigued. Some women of
    the ancient market town which is situated below the city had seen him pause
    beneath the trees of the boulevard Gassendi, and drink at the fountain which
    stands at the end of the promenade. He must have been very thirsty: for the
    children who followed him saw him stop again for a drink, two hundred paces
    further on, at the fountain in the market-place.
    <br />

    On arriving at the corner of the Rue Poichevert, he turned to the left, and
    directed his steps toward the town-hall. He entered, then came out a quarter
    of an hour later. A gendarme was seated near the door, on the stone bench
    which General Drouot had mounted on the 4th of March to read to the
    frightened throng of the inhabitants of D—— the proclamation of the Gulf
    Juan. The man pulled off his cap and humbly saluted the gendarme.
    <br />

    The gendarme, without replying to his salute, stared attentively at him,
    followed him for a while with his eyes, and then entered the town-hall.
    <br />

    There then existed at D—— a fine inn at the sign of the Cross of Colbas.
    This inn had for a landlord a certain Jacquin Labarre, a man of
    consideration in the town on account of his relationship to another Labarre,
    who kept the inn of the Three Dauphins in Grenoble, and had served in the
    Guides. At the time of the Emperor’s landing, many rumors had circulated
    throughout the country with regard to this inn of the Three Dauphins. It was
    said that General Bertrand, disguised as a carter, had made frequent trips
    thither in the month of January, and that he had distributed crosses of
    honor to the soldiers and handfuls of gold to the citizens. The truth is,
    that when the Emperor entered Grenoble he had refused to install himself at
    the hotel of the prefecture; he had thanked the mayor, saying, “I am going
    to the house of a brave man of my acquaintance”; and he had betaken himself
    to the Three Dauphins. This glory of the Labarre of the Three Dauphins was
    reflected upon the Labarre of the Cross of Colbas, at a distance of five and
    twenty leagues. It was said of him in the town, “That is the cousin of the
    man of Grenoble.”
    <br />

    The man bent his steps towards this inn, which was the best in the
    country-side. He entered the kitchen, which opened on a level with the
    street. All the stoves were lighted; a huge fire blazed gayly in the
    fireplace. The host, who was also the chief cook, was going from one
    stew-pan to another, very busily superintending an excellent dinner designed
    for the wagoners, whose loud talking, conversation, and laughter were
    audible from an adjoining apartment. Any one who has travelled knows that
    there is no one who indulges in better cheer than wagoners. A fat marmot,
    flanked by white partridges and heather-cocks, was turning on a long spit
    before the fire; on the stove, two huge carps from Lake Lauzet and a trout
    from Lake Alloz were cooking.
<!-- CUT END -->
  </v-modal>

  <!-- image modal -->

  <v-modal
    v-model="example.isVisibleImage"
    no-header
    no-footer
    close-button-in-content
    size="fit"
    :position="example.position"
    :transition="example.transition"
    style-content="edge-to-edge"
  >
    <img :src="'/' + images[currentImage]" width="1000" alt="" />
    <v-button
      @click="prev()"
      style-button="secondary"
      class="absolute bottom-4 left-4 opacity-97 mix-blend-screen"
    >
      Previous
    </v-button>
    <v-button
      @click="next()"
      style-button="secondary"
      class="absolute bottom-4 right-4 opacity-97 mix-blend-screen"
    >
      Next
    </v-button>
  </v-modal>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      isVisible: false,
      isVisibleLong: false,
      isVisibleImage: false,
      title: "Example modal",
      noPrimaryButton: false,
      noSecondaryButton: false,
      primaryButtonStyle: "primary",
      secondaryButtonStyle: "secondary",
      primaryButtonLabel: "OK",
      secondaryButtonLabel: "Cancel",
      primaryButtonClose: false,
      secondaryButtonClose: true,
      noCloseButton: false,
      closeButtonInContent: false,
      staticBackdrop: false,
      noHeader: false,
      noFooter: false,
      position: "top",
      size: "md",
      transition: "fade-slide",
    });

    let images = ["mononoke035.jpg", "mononoke033.jpg"];

    let currentImage = ref(0);

    let next = () => {
      return (currentImage.value =
        currentImage.value + 1 > 1 ? 0 : currentImage.value + 1);
    };

    let prev = () => {
      return (currentImage.value =
        currentImage.value - 1 < 0 ? 1 : currentImage.value - 1);
    };

    return {
      example,
      images,
      currentImage,
      next,
      prev,
    };
  },
};
</script>
