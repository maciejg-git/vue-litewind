<template>
  <v-card
    width="360px"
    style-card="borderless rounded-extra shadow"
    class="overflow-hidden mx-auto"
  >
    <img
      :src="randomPhoto()"
      alt=""
    />
    <header class="font-semibold text-lg mt-5 px-10">Example card</header>
    <header class="text-gray-500 text-sm mt-2 px-10">Subtitle</header>
    <div class="px-10 py-7">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </div>
  </v-card>
</template>

<script>
export default {
  setup() {
    let id = [1015, 1016, 1040, 1043, 1067, 155, 158, 179, 184, 191];

    let randomPhoto = (w = 360, h = 240) =>
      `https://picsum.photos/id/${
        id[(Math.random() * 9).toFixed(0)]
      }/${w}/${h}`;

    return {
      id,
      randomPhoto,
    };
  },
};
</script>
