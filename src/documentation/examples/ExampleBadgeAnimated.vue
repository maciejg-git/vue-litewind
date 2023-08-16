<template>
  <div class="flex gap-x-7">
    <v-badge
      mod-badge="size:small variant:secondary"
      update-animation="scale-up"
      :update-key="example"
    >
      {{ example }}
    </v-badge>

    <v-badge
      mod-badge="size:small variant:secondary"
      update-animation="bounce"
      :update-key="example"
    >
      {{ example }}
    </v-badge>

    <v-badge
      mod-badge="size:small variant:secondary"
      update-animation="to-danger"
      :update-key="example"
    >
      {{ example }}
    </v-badge>

    <v-badge
      mod-badge="size:small variant:secondary"
      update-animation="to-success"
      :update-key="example"
    >
      {{ example }}
    </v-badge>

    <!-- Tailwind animations -->

    <v-badge
      mod-badge="size:small variant:warn"
      class="animate-pulse"
    >
      NEW
    </v-badge>

    <v-badge
      mod-badge="size:small variant:success"
      class="animate-bounce"
    >
      NEW
    </v-badge>
  </div>

  <div class="mt-10">
    <v-button @click="example = ((Math.random() * 50) + 10).toFixed()">
      Update badge value
    </v-button>
  </div>
</template>

<script setup>
import { ref } from "vue";

let example = ref(4);
</script>
