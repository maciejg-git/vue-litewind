const t=`<template>\r
  <v-button\r
    v-tooltip.bottom.delay100.oY5="\r
      () => 'Dynamic content ' + (Math.random() * 100).toFixed(0)\r
    "\r
  >\r
    Hover me (dynamic content)\r
  </v-button>\r
\r
  <v-button\r
    v-tooltip.bottom.delay100.oY5\r
    data-title="This tooltip has content from data-title attribute"\r
    class="ml-4"\r
  >\r
    Hover me (data title attribute)\r
  </v-button>\r
</template>\r
`;export{t as default};
