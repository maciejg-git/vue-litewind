<template>
  <v-card
    width="320px"
    class="mx-auto overflow-hidden"
  >
    <img
      :src="randomPhoto()"
      alt=""
    />
    <header class="px-6 pt-3 text-lg font-semibold">Example card</header>
    <header class="px-6 py-1 text-sm text-gray-500">Subtitle</header>
    <div class="p-6">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </div>
    <v-divider />
    <div class="px-3 py-2 text-sm">Card footer</div>
    <v-backdrop
      fill="element"
      class="pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100"
      mod-backdrop="variant:gradientDiagonal transition:opacity"
    ></v-backdrop>
  </v-card>
</template>

<script setup>
let id = [1015, 1016, 1040, 1043, 1067, 155, 158, 179, 184, 191];

let randomPhoto = (w = 360, h = 240) =>
  `https://picsum.photos/id/${id[(Math.random() * 9).toFixed(0)]}/${w}/${h}`;
</script>
