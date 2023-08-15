<template>
  <v-card
    style="width: 320px"
    class="self-start p-2"
  >
    <v-date-picker v-model="example.date">
      <template #day="{ day }">
        <div class="relative">
          {{ day }}
          <v-badge
            v-if="markedDays[day]"
            mod-badge="special:circleSmall variant:danger"
            class="absolute top-full right-1/2 transform translate-x-1/2"
          ></v-badge>
        </div>
      </template>
    </v-date-picker>
  </v-card>
</template>

<script setup>
import { reactive } from "vue";

let example = reactive({
  date: "",
});

let markedDays = [...Array(31)].map((i) => {
  return Math.floor(Math.random() * 2);
});
</script>
