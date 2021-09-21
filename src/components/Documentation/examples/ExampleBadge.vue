<template>
  <div>
    <v-badge style-badge="secondary" class="mr-4">
      New
      <v-badge style-badge="tiny green" class="ml-2">7</v-badge>
    </v-badge>
    <v-badge class="mr-4">New</v-badge>
    <v-badge style-badge="small yellow" class="mr-4">New</v-badge>
    <v-badge style-badge="small green" class="mr-4">New</v-badge>
    <v-badge style-badge="small" class="mr-4">New</v-badge>
    <v-badge style-badge="tiny yellow" class="mr-4">New</v-badge>
    <v-badge style-badge="tiny" class="mr-4">New</v-badge>
  </div>

  <div class="mt-10">
    <v-button class="relative mr-6">
      badge button
      <v-badge position="top-right" style-badge="primary tiny red">2</v-badge>
    </v-button>
    <v-button class="relative mr-6">
      badge button
      <v-badge position="top-right" style-badge="circle red"></v-badge>
    </v-button>
  </div>

  <div class="mt-10">
    <v-button class="relative">
      badge button (custom)
      <v-badge
        style-badge="primary tiny red"
        class="
          absolute
          top-0
          right-0
          transform
          -translate-y-1/2
          translate-x-1/2
        "
      >
        9
      </v-badge>
    </v-button>
  </div>
</template>
