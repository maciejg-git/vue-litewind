<template>
  <v-button
    v-tooltip="{
      offsetY: 5,
      text: () => 'Dynamic content ' + (Math.random() * 100).toFixed(0),
    }"
  >
    Hover me (dynamic content)
  </v-button>

  <v-button
    v-tooltip="{ offsetY: 5 }"
    data-title="This tooltip has content from data-title attribute"
    class="ml-4"
  >
    Hover me (data title attribute)
  </v-button>
</template>
