<template>
  <v-button
    v-tooltip="{ offsetY: 5, delay: 500, text: 'This is delayed tooltip' }"
  >
    Hover me (long delay)
  </v-button>

  <v-button
    v-tooltip="{
      offsetY: 5,
      delay: 0,
      text: 'This tooltip apears instantaneously',
    }"
    class="ml-4"
  >
    Hover me (no delay)
  </v-button>
</template>
