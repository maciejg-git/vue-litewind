<template>
  <div class="flex items-center gap-x-5">
    <v-badge mod-badge="variant:secondary">
      NEW
      <v-badge
        mod-badge="size:tiny variant:success"
        class="ml-2"
      >
        7
      </v-badge>
    </v-badge>
    <v-badge>NEW</v-badge>
    <v-badge mod-badge="size:small variant:warn">NEW</v-badge>
    <v-badge mod-badge="size:tiny variant:success">NEW</v-badge>
  </div>

  <!-- positioned badges -->

  <v-button class="relative mt-10">
    Badge button
    <v-badge
      position="top-right"
      mod-badge="special:circle variant:danger"
    ></v-badge>
  </v-button>
</template>
