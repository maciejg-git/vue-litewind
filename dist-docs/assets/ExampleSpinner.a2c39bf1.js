const n=`<template>\r
  <p class="my-4">Border spinners</p>\r
  <div class="flex items-end gap-x-10">\r
    <v-spinner style-spinner="primary small" />\r
    <v-spinner style-spinner="success" />\r
    <v-spinner style-spinner="warn large" />\r
  </div>\r
\r
  <p class="my-4">SVG spinners</p>\r
  <div class="flex items-end gap-x-10">\r
    <v-spinner type="svg" style-spinner="primary small" />\r
    <v-spinner type="svg" style-spinner="success" />\r
    <v-spinner type="svg" style-spinner="warn large" />\r
  </div>\r
\r
  <p class="my-4">Icon spinners</p>\r
  <div class="flex items-end gap-x-10">\r
    <v-spinner icon="mdi-loading" style-spinner="primary" />\r
    <v-spinner icon="b-arrow-clockwise" style-spinner="success" />\r
  </div>\r
</template>\r
`;export{n as default};
