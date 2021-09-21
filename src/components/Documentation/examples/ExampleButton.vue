<template>
  <div class="flex items-center gap-4">
    <v-button>Button</v-button>
    <v-button tag="a">Button (link)</v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button style-button="large">Large button</v-button>
    <v-button style-button="">Normal button</v-button>
    <v-button style-button="small">Small button</v-button>
    <v-button style-button="tiny">Tiny button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button style-button="secondary">Secondary button</v-button>
    <v-button style-button="yellow">Yellow button</v-button>
    <v-button style-button="green">Green button</v-button>
    <v-button style-button="red">Red button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button style-button="square">Square button</v-button>
    <v-button style-button="pill">Pill button</v-button>
    <v-button style-button="uppercase">Uppercase button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button style-button="secondary">Secondary button</v-button>
    <v-button style-button="yellow">
      <v-icon icon="star" class="b-icon--small mr-2" />
      Yellow button
    </v-button>
    <v-button style-button="green">
      <v-icon icon-type="success" class="b-icon--small mr-2" />
      Green button
    </v-button>
    <v-button style-button="red">Red button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button block>Block button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button disabled>Button (disabled)</v-button>
  </div>
</template>
