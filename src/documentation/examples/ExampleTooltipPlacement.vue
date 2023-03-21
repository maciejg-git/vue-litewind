<template>
  <v-button
    v-tooltip="{
      offsetY: 5,
      placement: 'top',
      text: 'This is tooltip on the top',
    }"
  >
    Hover me (tooltip on top)
  </v-button>

  <v-button
    v-tooltip="{
      offsetY: 5,
      placement: 'right',
      text: 'This is tooltip on the right',
    }"
    class="ml-4"
  >
    Hover me (tooltip on right)
  </v-button>

  <v-button
    v-tooltip="{
      offsetY: 5,
      autoPlacement: true,
      flip: false,
      text: 'This is auto placed tooltip',
    }"
    class="ml-4"
  >
    Hover me (automatic placement)
  </v-button>
</template>
