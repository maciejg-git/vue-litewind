const t=`<template>\r
  <v-button v-tooltip.bottom.delay100.oY5.fade="'This is fade tooltip'">\r
    Hover me (fade)\r
  </v-button>\r
\r
  <v-button\r
    v-tooltip.bottom.delay100.oY5.scale-fade="'This is scale-fade tooltip'"\r
    class="ml-4"\r
  >\r
    Hover me (scale-fade)\r
  </v-button>\r
\r
  <v-button\r
    v-tooltip.bottom.delay100.oY5.noanim="'This is nofade tooltip'"\r
    class="ml-4"\r
  >\r
    Hover me (no animation)\r
  </v-button>\r
</template>\r
`;export{t as default};
