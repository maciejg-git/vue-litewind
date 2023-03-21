<template>
  <v-button v-tooltip="{ offsetY: 5, transition:'fade', text: 'This is fade tooltip' }">
    Hover me (fade)
  </v-button>

  <v-button
    v-tooltip="{ offsetY: 5, transition: 'scale-fade', text: 'This is scale-fade tooltip' }"
    class="ml-4"
  >
    Hover me (scale-fade)
  </v-button>

  <v-button
    v-tooltip="{ offsetY: 5, transition: '', text: 'This is nofade tooltip' }"
    class="ml-4"
  >
    Hover me (no animation)
  </v-button>
</template>
