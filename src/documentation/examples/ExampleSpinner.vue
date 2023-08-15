<template>
  <p class="my-4">Border spinners</p>
  <div class="flex items-end gap-x-10">
    <v-spinner mod-spinner="variant:primary size:small" />
    <v-spinner mod-spinner="variant:success" />
    <v-spinner mod-spinner="variant:warn size:large" />
  </div>

  <p class="my-4">SVG spinners</p>
  <div class="flex items-end gap-x-10">
    <v-spinner type="svg" mod-spinner="variant:primary size:small" />
    <v-spinner type="svg" mod-spinner="variant:success" />
    <v-spinner type="svg" mod-spinner="variant:warn size:large" />
  </div>

  <p class="my-4">Icon spinners</p>
  <div class="flex items-end gap-x-10">
    <v-spinner icon="mdi-loading" mod-spinner="variant:primary" />
    <v-spinner icon="b-arrow-clockwise" mod-spinner="variant:success" />
  </div>
</template>
