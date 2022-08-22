<template>
  <div class="flex items-center gap-6">
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
</template>
