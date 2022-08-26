<template>
  <v-trigger for="modal" v-slot="{ onTrigger }">
    <v-button v-on="onTrigger">Show modal</v-button>
  </v-trigger>

  <v-modal id="modal" title="Trigger modal">Trigger modal</v-modal>
</template>
