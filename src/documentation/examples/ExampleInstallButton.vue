<template>
  <div class="flex items-center gap-4">
    <v-button>Default button</v-button>
    <v-button mod-button="preset:plain">Plain button</v-button>
    <v-button mod-button="variant:success">Success button</v-button>
    <v-button mod-button="variant:primary size:small">Small button</v-button>
    <v-button mod-button="variant:secondary size:tiny text:uppercase">Tiny button</v-button>
  </div>

  <div class="flex items-center gap-4 mt-6">
    <v-button
      mod-button="new?variant:danger visited?variant:secondary size:small"
      :variant="variant"
      @click="variant = 'visited'"
    >
      {{ variant === "new" ? "Click me" : "Visited" }}
    </v-button>
  </div>
</template>

<script setup>
import { ref } from "vue";

let variant = ref("new");
</script>
