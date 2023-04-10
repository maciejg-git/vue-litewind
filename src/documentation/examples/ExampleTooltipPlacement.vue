<template>
  <div class="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
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
    >
      Hover me (automatic placement)
    </v-button>
  </div>
</template>
