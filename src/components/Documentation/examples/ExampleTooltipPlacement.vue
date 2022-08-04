<template>
  <p class="my-6">Tooltip placement:</p>

  <div class="mb-10">
    <v-button v-tooltip.top.delay100.oY5="'This is tooltip on the top'">
      Hover me (tooltip on top)
    </v-button>
    <v-button
      v-tooltip.right.delay100.oY5="'This is tooltip on the right'"
      class="ml-4"
    >
      Hover me (tooltip on right)
    </v-button>
  </div>
</template>
