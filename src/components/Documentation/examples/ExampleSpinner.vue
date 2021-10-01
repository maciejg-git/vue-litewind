<template>
  <div>
    <v-spinner style-spinner="primary small" class="mr-10"></v-spinner>
    <v-spinner style-spinner="success" class="mr-10"></v-spinner>
    <v-spinner style-spinner="warn large" class="mr-4"></v-spinner>
  </div>

  <div class="mt-10">
    <v-spinner thickness="0.07" class="mr-4"></v-spinner>
    <v-spinner thickness="0.2" style-spinner="yellow" class="mr-4"></v-spinner>
    <v-spinner thickness="0.35" style-spinner="green" class="mr-4"></v-spinner>
  </div>

  <div class="mt-10">
    <v-spinner speed="0.6" style-spinner="primary" class="mr-4"></v-spinner>
    <v-spinner speed="1.0" style-spinner="success" class="mr-4"></v-spinner>
    <v-spinner speed="1.5" style-spinner="warn" class="mr-4"></v-spinner>
  </div>

  <div class="mt-10">
    <v-button class="mr-2">
      <v-spinner style-spinner="light small"></v-spinner>
      <span class="ml-2">Button</span>
    </v-button>

    <v-button style-button="secondary">
      <v-spinner style-spinner="success small"></v-spinner>
      <span class="ml-2">Button</span>
    </v-button>
  </div>
</template>
