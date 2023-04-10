<template>
  <div class="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
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
    >
      Hover me (no delay)
    </v-button>
  </div>
</template>
