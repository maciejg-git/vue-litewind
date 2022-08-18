const t=`<template>\r
  <v-button v-tooltip.bottom.delay500.oY5="'This is delayed tooltip'">\r
    Hover me (long delay)\r
  </v-button>\r
\r
  <v-button\r
    v-tooltip.bottom.delay0.oY5="'This tooltip apears instantaneously'"\r
    class="ml-4"\r
  >\r
    Hover me (no delay)\r
  </v-button>\r
</template>\r
`;export{t as default};
