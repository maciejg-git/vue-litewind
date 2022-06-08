<template>
  <!-- simple card -->

  <v-card width="320px" style-card="shadow hoverable" class="overflow-hidden">
    <img :src="randomPhoto()" alt="" />
    <header class="font-semibold text-lg pt-3 px-6">Example card</header>
    <header class="text-gray-500 text-sm py-1 px-6">Subtitle</header>
    <div class="p-6">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </div>
    <v-divider />
    <div class="text-sm px-3 py-2">Card footer</div>
  </v-card>

  <!-- horizontal card -->

  <v-card
    width="720px"
    style-card="shadow hoverable"
    style="height: 360px"
    class="flex flex-row my-10 overflow-hidden"
  >
    <img :src="randomPhoto(360, 360)" alt="" />
    <div class="flex flex-col">
      <header class="font-semibold text-lg pt-4 px-6">Example card</header>
      <header class="text-gray-500 text-sm py-1 px-6">Subtitle</header>
      <div class="p-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </div>
      <v-divider class="w-11/12 mx-auto mt-auto" />
      <v-button base="button-plain" class="ml-auto font-semibold underline m-3 mr-6">
        Show more
      </v-button>
    </div>
  </v-card>

  <!-- overlay card -->

  <v-card width="360px" style-card="shadow hoverable" class="relative overflow-hidden">
    <img :src="randomPhoto(360, 600)" alt="" class="opacity-100"/>
    <div class="absolute bottom-0 bg-gray-800 bg-opacity-80 text-gray-100">
      <header class="font-semibold text-lg pt-3 px-6">Example card</header>
      <header class="text-gray-500 text-sm py-1 px-6">Subtitle</header>
      <div class="p-6 pb-10">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book.
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  setup() {
    let id = [1015, 1016, 1040, 1043, 1067, 155, 158, 179, 184, 191];

    let randomPhoto = (w = 360, h = 240) =>
      `https://picsum.photos/id/${id[(Math.random() * 9).toFixed(0)]}/${w}/${h}`;

    return {
      id,
      randomPhoto,
    };
  },
};
</script>
