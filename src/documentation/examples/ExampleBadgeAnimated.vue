<template>
  <div class="flex gap-x-7">
    <v-badge
      style-badge="small secondary"
      update-animation="scale-up"
      :update-key="example"
    >
      {{ example }}
    </v-badge>

    <v-badge
      style-badge="small secondary"
      update-animation="bounce"
      :update-key="example"
    >
      {{ example }}
    </v-badge>

    <v-badge
      style-badge="small secondary"
      update-animation="to-danger"
      :update-key="example"
    >
      {{ example }}
    </v-badge>

    <v-badge
      style-badge="small secondary"
      update-animation="to-success"
      :update-key="example"
    >
      {{ example }}
    </v-badge>
  </div>

  <div class="mt-10">
    <v-button @click="example = (Math.random() * 100).toFixed()">
      Update badge value
    </v-button>
  </div>
</template>

<script setup>
import { ref } from "vue";

let example = ref(4);
</script>
