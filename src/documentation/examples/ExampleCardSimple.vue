<template>
  <v-card
    width="320px"
    mod-card="effect:hoverScale variant:info"
    class="overflow-hidden mx-auto"
  >
    <img
      :src="randomPhoto()"
      alt=""
    />
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
</template>

<script setup>
let id = [1015, 1016, 1040, 1043, 1067, 155, 158, 179, 184, 191];

let randomPhoto = (w = 360, h = 240) =>
  `https://picsum.photos/id/${id[(Math.random() * 9).toFixed(0)]}/${w}/${h}`;
</script>
