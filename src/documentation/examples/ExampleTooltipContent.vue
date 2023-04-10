<template>
  <div class="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
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
    >
      Hover me (data title attribute)
    </v-button>
  </div>
</template>
