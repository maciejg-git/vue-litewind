<template>
  <div class="flex items-center gap-4">
    <v-button>Button</v-button>
    <v-button tag="a">Button (link)</v-button>
    <v-button name="button-plain">Plain button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button style-button="large">Large button</v-button>
    <v-button style-button="small">Small button</v-button>
    <v-button style-button="tiny">Tiny button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button style-button="warn">Warn button</v-button>
    <v-button style-button="success">Success button</v-button>
    <v-button style-button="danger">Danger button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button style-button="square">Square button</v-button>
    <v-button style-button="pill">Pill button</v-button>
    <v-button style-button="uppercase">Uppercase button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button style-button="warn">
      <v-icon name="b-star" class="v-icon--md mr-2" />
      Icon button
    </v-button>

    <v-button style-button="success">
      <v-icon icon-type="success" class="v-icon--md mr-2" />
      Success button
    </v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button block>Block button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-4">
    <v-button disabled>Button (disabled)</v-button>
  </div>
</template>
