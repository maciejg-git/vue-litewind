<template>
  <v-card style="width: 320px" class="self-start p-2">
    <v-date-picker v-model="example.date">
      <template #day="{ day }">
        <div class="relative">
          {{ day }}
          <v-badge
            v-if="isMarked(day)"
            style-badge="circle-small danger tiny"
            class="absolute top-full right-1/2 transform translate-x-1/2"
          ></v-badge>
        </div>
      </template>
    </v-date-picker>
  </v-card>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      date: "",
    });

    let isMarked = (day) => {
      return Math.floor(Math.random() * 2);
    };

    return {
      example,
      isMarked,
    };
  },
};
</script>
