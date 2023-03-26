<template>
  <v-tree :items="items"></v-tree>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    name: "Directory",
    id: 17,
    children: [
      { name: "Some item", id: 1 },
      { name: "Another item", id: 2 },
      { name: "Third", id: 3 },
      { name: "File" },
      {
        name: "Sub directory",
        id: 5,
        children: [
          {
            name: "Another sub directory",
            id: 6,
            children: [
              { name: "Content", id: 7 },
              { name: "Another item", id: 8 },
            ],
          },
          { name: "Fourth", id: 9 },
          { name: "Another file", id: 10 },
          { name: "Video file", id: 11 },
          { name: "Secret item", id: 12 },
          {
            name: "More content here",
            id: 13,
            children: [
              { name: "Another video file", id: 14 },
              { name: "Fifth", id: 15 },
            ],
          },
        ],
      },
      { name: "Sixth item", id: 16 },
    ],
  },
]);
</script>
