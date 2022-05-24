<template>
  <div class="flex items-center gap-6">
    <v-button>Button</v-button>
    <v-button tag="a">Button (link)</v-button>
    <v-button base="button-plain">Plain button</v-button>
  </div>

  <div class="flex items-center gap-6 mt-6">
    <v-button style-button="large">Large button</v-button>
    <v-button style-button="small">Small button</v-button>
    <v-button style-button="tiny">Tiny button</v-button>
  </div>

  <div class="flex items-center gap-6 mt-6">
    <v-button style-button="warn">Warn button</v-button>
    <v-button style-button="success">Success button</v-button>
    <v-button style-button="danger">Danger button</v-button>
  </div>

  <div class="flex items-center gap-6 mt-6">
    <v-button style-button="square">Square button</v-button>
    <v-button style-button="pill">Pill button</v-button>
    <v-button style-button="uppercase">Uppercase button</v-button>
    <v-button style-button="raised">Raised button</v-button>
  </div>

  <div class="flex items-center gap-6 mt-6">
    <v-button style-button="warn" class="flex-col">
      <v-icon name="b-star" class="w-6 h-6" />
      <span class="text-sm">Icon button</span>
    </v-button>

    <v-button style-button="warn">
      <v-icon name="b-star" class="w-6 h-6 mr-2" />
      Icon button
    </v-button>

    <v-button>
      Icon button
      <v-icon icon="b-arrow-right" class="w-5 h-5 ml-2" />
    </v-button>
  </div>

  <div class="flex items-center gap-6 mt-6">
    <v-button block class="w-full">Block button</v-button>
  </div>

  <div class="flex items-center gap-6 mt-6">
    <v-button disabled>Button (disabled)</v-button>
  </div>
</template>
