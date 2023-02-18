<template>
  <p class="my-4">Border spinners</p>
  <div class="flex items-end gap-x-10">
    <v-spinner style-spinner="primary small" />
    <v-spinner style-spinner="success" />
    <v-spinner style-spinner="warn large" />
  </div>

  <p class="my-4">SVG spinners</p>
  <div class="flex items-end gap-x-10">
    <v-spinner type="svg" style-spinner="primary small" />
    <v-spinner type="svg" style-spinner="success" />
    <v-spinner type="svg" style-spinner="warn large" />
  </div>

  <p class="my-4">Icon spinners</p>
  <div class="flex items-end gap-x-10">
    <v-spinner icon="mdi-loading" style-spinner="primary" />
    <v-spinner icon="b-arrow-clockwise" style-spinner="success" />
  </div>
</template>
