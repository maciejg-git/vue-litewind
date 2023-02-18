<template>
  <v-button v-tooltip.bottom.delay100.oY5.fade="'This is fade tooltip'">
    Hover me (fade)
  </v-button>

  <v-button
    v-tooltip.bottom.delay100.oY5.scale-fade="'This is scale-fade tooltip'"
    class="ml-4"
  >
    Hover me (scale-fade)
  </v-button>

  <v-button
    v-tooltip.bottom.delay100.oY5.noanim="'This is nofade tooltip'"
    class="ml-4"
  >
    Hover me (no animation)
  </v-button>
</template>
