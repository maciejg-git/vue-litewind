<template>
  <p class="my-4">Border spinners</p>
  <div>
    <v-spinner style-spinner="primary small" class="mr-10" />
    <v-spinner style-spinner="success" class="mr-10" />
    <v-spinner style-spinner="warn large" class="mr-4" />
  </div>

  <p class="my-4">SVG spinners</p>
  <div>
    <v-spinner type="svg" style-spinner="primary small" class="mr-10" />
    <v-spinner type="svg" style-spinner="success" class="mr-10" />
    <v-spinner type="svg" style-spinner="warn large" class="mr-10" />
  </div>

  <p class="my-4">Icon spinners</p>
  <div>
    <v-spinner icon="mdi-loading" style-spinner="primary" class="mr-10" />
    <v-spinner icon="b-arrow-clockwise" style-spinner="success" class="mr-10" />
  </div>
</template>
