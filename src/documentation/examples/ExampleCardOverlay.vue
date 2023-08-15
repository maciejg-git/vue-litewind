<template>
  <v-card
    width="360px"
    class="relative overflow-hidden mx-auto"
  >
    <img
      :src="randomPhoto(360, 600)"
      alt=""
      class="opacity-100"
    />
    <div class="absolute bottom-0 bg-gray-800 bg-opacity-80 text-gray-100">
      <header class="font-semibold text-lg pt-3 px-6">Example card</header>
      <header class="text-gray-500 text-sm py-1 px-6">Subtitle</header>
      <div class="p-6 pb-10">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </div>
    </div>
  </v-card>
</template>

<script setup>
let id = [1015, 1016, 1040, 1043, 1067, 155, 158, 179, 184, 191];

let randomPhoto = (w = 360, h = 240) =>
  `https://picsum.photos/id/${id[(Math.random() * 9).toFixed(0)]}/${w}/${h}`;
</script>
