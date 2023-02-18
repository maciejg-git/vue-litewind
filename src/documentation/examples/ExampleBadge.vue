<template>
  <div class="flex items-center gap-x-5">
    <v-badge style-badge="secondary">
      NEW
      <v-badge
        style-badge="tiny success"
        class="ml-2"
      >
        7
      </v-badge>
    </v-badge>
    <v-badge>NEW</v-badge>
    <v-badge style-badge="small warn">NEW</v-badge>
    <v-badge style-badge="tiny success">NEW</v-badge>
  </div>

  <!-- positioned badges -->

  <v-button class="relative mt-10">
    Badge button
    <v-badge
      position="top-right"
      style-badge="circle danger"
    ></v-badge>
  </v-button>
</template>
