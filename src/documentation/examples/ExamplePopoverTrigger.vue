<template>
  <v-popover id="popover" title="Popover title" placement="right" :offsetY="10">
    <v-card width="220px">
      <v-popover-header />
      <div class="p-5">This is popover.</div>
    </v-card>
  </v-popover>

  <v-trigger for="popover" v-slot="{ reference, onTrigger }">
    <v-button :ref="reference" v-on="onTrigger">
      Show popover
    </v-button>
  </v-trigger>
</template>
