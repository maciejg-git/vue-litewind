<template>
  <v-container class="gap-y-4">
    <v-row>
      <v-col class="basis-3/12">
        <div class="column-content">col 1</div>
      </v-col>
      <v-col class="basis-3/12 ml-auto">
        <div class="column-content">col 2 .ml-auto</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="basis-3/12 ml-auto">
        <div class="column-content">col 1 .ml-auto</div>
      </v-col>
      <v-col class="basis-5/12">
        <div class="column-content">col 2</div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="basis-4/12 mx-auto">
        <div class="column-content">col 1 .mx-auto</div>
      </v-col>
      <v-col class="basis-4/12">
        <div class="column-content">col 2</div>
      </v-col>
    </v-row>
  </v-container>
</template>
