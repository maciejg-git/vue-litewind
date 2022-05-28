<template>
  <p class="my-6">Default tooltip:</p>

  <div class="mb-10">
    <v-button v-tooltip.oY5="'This is tooltip'">
      Hover me
    </v-button>
  </div>

  <!-- tooltip placement -->

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

  <!-- tooltip delay -->

  <p class="my-6">Tooltip delay:</p>

  <div class="mb-10">
    <v-button v-tooltip.bottom.delay500.oY5="'This is delayed tooltip'">
      Hover me (long delay)
    </v-button>
    <v-button
      v-tooltip.bottom.delay0.oY5="'This tooltip apears instantaneously'"
      class="ml-4"
    >
      Hover me (no delay)
    </v-button>
  </div>

  <!-- tooltip content -->

  <p class="my-6">Tooltip content source:</p>

  <div class="mb-10">
    <v-button
      v-tooltip.bottom.delay100.oY5="() => 'Dynamic content ' + (Math.random() * 100).toFixed(0)"
    >
      Hover me (dynamic content)
    </v-button>
    <v-button
      v-tooltip.bottom.delay100.oY5
      data-title="This tooltip has content from data-title attribute"
      class="ml-4"
    >
      Hover me (data title attribute)
    </v-button>
  </div>

  <!-- tooltip animation -->

  <p class="my-6">Tooltip animation:</p>

  <div>
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
  </div>
</template>
