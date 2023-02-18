<template>
  <v-button v-tooltip.bottom.delay500.oY5="'This is delayed tooltip'">
    Hover me (long delay)
  </v-button>

  <v-button
    v-tooltip.bottom.delay0.oY5="'This tooltip apears instantaneously'"
    class="ml-4"
  >
    Hover me (no delay)
  </v-button>
</template>
