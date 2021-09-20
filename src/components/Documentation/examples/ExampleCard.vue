<template>
  <v-card width="320px" style-card="shadow hoverable">
    <img :src="randomPhoto()" alt="" />
    <header class="font-semibold pt-3 px-3">Example card</header>
    <header class="text-gray-500 text-sm py-1 px-3">Subtitle</header>
    <div class="p-3">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </div>
    <hr />
    <div class="text-sm px-3 py-2">Card footer</div>
  </v-card>

  <v-card
    width="720px"
    style-card="shadow hoverable"
    style="height: 320px"
    class="flex flex-row my-10"
  >
    <img :src="randomPhotoHorizontal()" alt="" />
    <div class="flex flex-col">
      <header class="font-semibold pt-4 px-3">Example card</header>
      <header class="text-gray-500 text-sm py-1 px-3">Subtitle</header>
      <div class="p-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </div>
      <hr class="w-11/12 mx-auto" />
      <v-button style-button="small" class="ml-auto my-auto m-4">
        Details
      </v-button>
    </div>
  </v-card>
</template>

<script>
export default {
  setup() {
    let id = [1015, 1016, 1040, 1043, 1067, 155, 158, 179, 184, 191];

    let randomPhoto = () =>
      `https://picsum.photos/id/${id[(Math.random() * 9).toFixed(0)]}/320/200`;

    let randomPhotoHorizontal = () =>
      `https://picsum.photos/id/${id[(Math.random() * 9).toFixed(0)]}/320/300`;

    return {
      id,
      randomPhoto,
      randomPhotoHorizontal,
    };
  },
};
</script>
