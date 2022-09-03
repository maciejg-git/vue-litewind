<template>
  <v-popover id="popover" title="Popover title" placement="right" :offsetY="10">
    <v-card style-card="popover shadow">
      This is popover.
    </v-card>
  </v-popover>

  <v-trigger for="popover" v-slot="{ reference, onTrigger }">
    <v-button :ref="reference" v-on="onTrigger">
      Show popover
    </v-button>
  </v-trigger>
</template>
