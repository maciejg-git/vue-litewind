<template>
  <div class="flex flex-col gap-y-4 w-full md:w-1/2">
    <v-input
      v-model="model"
      :inline="false"
      placeholder="Type something..."
    >
      <template #prepend>
        <div class="mr-2">http://</div>
      </template>
    </v-input>

    <v-input
      v-model="model"
      :inline="false"
      placeholder="Type something..."
    >
      <template #append>
        <div class="ml-2">.com</div>
      </template>
    </v-input>

    <v-input
      v-model="model"
      placeholder="Type something..."
    >
      <template #icon>
        <v-icon
          name="b-exclamation-circle"
          class="h-6 w-6 text-gray-400 dark:text-gray-400 mr-2"
        ></v-icon>
      </template>
    </v-input>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

let model = ref("");
</script>
