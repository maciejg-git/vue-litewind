const t=`<template>\r
  <p class="my-6">Default tooltip:</p>\r
\r
  <div class="mb-10">\r
    <v-button v-tooltip.oY5="'This is tooltip'">\r
      Hover me\r
    </v-button>\r
  </div>\r
\r
  <!-- tooltip placement -->\r
\r
  <p class="my-6">Tooltip placement:</p>\r
\r
  <div class="mb-10">\r
    <v-button v-tooltip.top.delay100.oY5="'This is tooltip on the top'">\r
      Hover me (tooltip on top)\r
    </v-button>\r
    <v-button\r
      v-tooltip.right.delay100.oY5="'This is tooltip on the right'"\r
      class="ml-4"\r
    >\r
      Hover me (tooltip on right)\r
    </v-button>\r
  </div>\r
\r
  <!-- tooltip delay -->\r
\r
  <p class="my-6">Tooltip delay:</p>\r
\r
  <div class="mb-10">\r
    <v-button v-tooltip.bottom.delay500.oY5="'This is delayed tooltip'">\r
      Hover me (long delay)\r
    </v-button>\r
    <v-button\r
      v-tooltip.bottom.delay0.oY5="'This tooltip apears instantaneously'"\r
      class="ml-4"\r
    >\r
      Hover me (no delay)\r
    </v-button>\r
  </div>\r
\r
  <!-- tooltip content -->\r
\r
  <p class="my-6">Tooltip content source:</p>\r
\r
  <div class="mb-10">\r
    <v-button\r
      v-tooltip.bottom.delay100.oY5="() => 'Dynamic content ' + (Math.random() * 100).toFixed(0)"\r
    >\r
      Hover me (dynamic content)\r
    </v-button>\r
    <v-button\r
      v-tooltip.bottom.delay100.oY5\r
      data-title="This tooltip has content from data-title attribute"\r
      class="ml-4"\r
    >\r
      Hover me (data title attribute)\r
    </v-button>\r
  </div>\r
\r
  <!-- tooltip animation -->\r
\r
  <p class="my-6">Tooltip animation:</p>\r
\r
  <div>\r
    <v-button v-tooltip.bottom.delay100.oY5.fade="'This is fade tooltip'">\r
      Hover me (fade)\r
    </v-button>\r
    <v-button\r
      v-tooltip.bottom.delay100.oY5.scale-fade="'This is scale-fade tooltip'"\r
      class="ml-4"\r
    >\r
      Hover me (scale-fade)\r
    </v-button>\r
    <v-button\r
      v-tooltip.bottom.delay100.oY5.noanim="'This is nofade tooltip'"\r
      class="ml-4"\r
    >\r
      Hover me (no animation)\r
    </v-button>\r
  </div>\r
</template>\r
`;export{t as default};
