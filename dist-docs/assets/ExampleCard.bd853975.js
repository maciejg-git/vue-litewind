const r=`<template>\r
  <!-- simple card -->\r
\r
  <v-card width="320px" style-card="shadow hoverable" class="overflow-hidden">\r
    <img :src="randomPhoto()" alt="" />\r
    <header class="font-semibold text-lg pt-3 px-6">Example card</header>\r
    <header class="text-gray-500 text-sm py-1 px-6">Subtitle</header>\r
    <div class="p-6">\r
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.\r
      Lorem Ipsum has been the industry's standard dummy text ever since the\r
      1500s, when an unknown printer took a galley of type and scrambled it to\r
      make a type specimen book.\r
    </div>\r
    <v-divider />\r
    <div class="text-sm px-3 py-2">Card footer</div>\r
  </v-card>\r
\r
  <!-- horizontal card -->\r
\r
  <v-card\r
    width="720px"\r
    style-card="shadow hoverable"\r
    style="height: 360px"\r
    class="flex flex-row my-10 overflow-hidden"\r
  >\r
    <img :src="randomPhoto(360, 360)" alt="" />\r
    <div class="flex flex-col">\r
      <header class="font-semibold text-lg pt-4 px-6">Example card</header>\r
      <header class="text-gray-500 text-sm py-1 px-6">Subtitle</header>\r
      <div class="p-6">\r
        Lorem Ipsum is simply dummy text of the printing and typesetting\r
        industry. Lorem Ipsum has been the industry's standard dummy text ever\r
        since the 1500s, when an unknown printer took a galley of type and\r
        scrambled it to make a type specimen book.\r
      </div>\r
      <v-divider class="w-11/12 mx-auto mt-auto" />\r
      <v-button base="button-plain" class="ml-auto font-semibold underline m-3 mr-6">\r
        Show more\r
      </v-button>\r
    </div>\r
  </v-card>\r
\r
  <!-- overlay card -->\r
\r
  <v-card width="360px" style-card="shadow hoverable" class="relative overflow-hidden">\r
    <img :src="randomPhoto(360, 600)" alt="" class="opacity-100"/>\r
    <div class="absolute bottom-0 bg-gray-800 bg-opacity-80 text-gray-100">\r
      <header class="font-semibold text-lg pt-3 px-6">Example card</header>\r
      <header class="text-gray-500 text-sm py-1 px-6">Subtitle</header>\r
      <div class="p-6 pb-10">\r
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.\r
        Lorem Ipsum has been the industry's standard dummy text ever since the\r
        1500s, when an unknown printer took a galley of type and scrambled it to\r
        make a type specimen book.\r
      </div>\r
    </div>\r
  </v-card>\r
</template>\r
\r
<script>\r
export default {\r
  setup() {\r
    let id = [1015, 1016, 1040, 1043, 1067, 155, 158, 179, 184, 191];\r
\r
    let randomPhoto = (w = 360, h = 240) =>\r
      \`https://picsum.photos/id/\${id[(Math.random() * 9).toFixed(0)]}/\${w}/\${h}\`;\r
\r
    return {\r
      id,\r
      randomPhoto,\r
    };\r
  },\r
};\r
<\/script>\r
`;export{r as default};
