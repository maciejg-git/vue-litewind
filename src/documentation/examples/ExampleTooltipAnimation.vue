<template>
  <div class="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
    <v-button
      v-tooltip="{
        offsetY: 5,
        transition: 'fade',
        text: 'This is fade tooltip',
      }"
    >
      Hover me (fade)
    </v-button>

    <v-button
      v-tooltip="{
        offsetY: 5,
        transition: 'scale-fade',
        text: 'This is scale-fade tooltip',
      }"
    >
      Hover me (scale-fade)
    </v-button>

    <v-button
      v-tooltip="{ offsetY: 5, transition: '', text: 'This is nofade tooltip' }"
    >
      Hover me (no animation)
    </v-button>
  </div>
</template>
