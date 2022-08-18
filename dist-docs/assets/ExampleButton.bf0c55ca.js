const t=`<template>\r
  <div class="flex items-center gap-6">\r
    <v-button>Button</v-button>\r
    <v-button tag="a">Button (link)</v-button>\r
    <v-button base="plain">Plain button</v-button>\r
  </div>\r
\r
  <div class="flex items-center gap-6 mt-6">\r
    <v-button style-button="large">Large button</v-button>\r
    <v-button style-button="small">Small button</v-button>\r
    <v-button style-button="tiny">Tiny button</v-button>\r
  </div>\r
\r
  <div class="flex items-center gap-6 mt-6">\r
    <v-button style-button="warn">Warn button</v-button>\r
    <v-button style-button="success">Success button</v-button>\r
    <v-button style-button="danger">Danger button</v-button>\r
  </div>\r
\r
  <div class="flex items-center gap-6 mt-6">\r
    <v-button style-button="square">Square button</v-button>\r
    <v-button style-button="pill">Pill button</v-button>\r
    <v-button style-button="uppercase">Uppercase button</v-button>\r
    <v-button style-button="raised">Raised button</v-button>\r
  </div>\r
\r
  <!-- icon buttons -->\r
\r
  <div class="flex items-center gap-6 mt-6">\r
    <v-button style-button="warn" class="flex-col">\r
      <v-icon name="b-star" class="w-6 h-6" />\r
      <span class="text-sm">Icon button</span>\r
    </v-button>\r
\r
    <v-button style-button="warn">\r
      <v-icon name="b-star" class="w-6 h-6 mr-2" />\r
      Icon button\r
    </v-button>\r
\r
    <v-button>\r
      Icon button\r
      <v-icon icon="b-arrow-right" class="w-5 h-5 ml-2" />\r
    </v-button>\r
  </div>\r
\r
  <!-- block button -->\r
\r
  <div class="flex items-center gap-6 mt-6">\r
    <v-button block class="w-full">Block button</v-button>\r
  </div>\r
\r
  <!-- disabled button -->\r
\r
  <div class="flex items-center gap-6 mt-6">\r
    <v-button disabled>Button (disabled)</v-button>\r
  </div>\r
</template>\r
`;export{t as default};
