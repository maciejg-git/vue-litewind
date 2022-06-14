<template>
  <v-tree :items="items" auto-open-root></v-tree>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const items = ref([
      {
        name: "Movies",
        id: 1,
        children: [
          { name: "Lost in Translation", id: 2 },
          { name: "Before Sunset", id: 3 },
          { name: "Groundhog Day", id: 4 },
          { name: "Out of Africa", id: 5 },
          {
            name: "Science-fiction",
            id: 6,
            children: [
              {
                name: "Matrix",
                id: 7,
                children: [
                  { name: "Matrix", id: 8 },
                  { name: "Matrix: Revolutions", id: 9 },
                ],
              },
              { name: "Blade Runner", id: 10 },
              { name: "Futurama", id: 11 },
              { name: "Dune", id: 12 },
              { name: "Ghost in the Shell", id: 13 },
              {
                name: "Star Wars",
                id: 14,
                children: [
                  { name: "Return of The Jedi", id: 15 },
                  { name: "The Phantom Menace", id: 16 },
                ],
              },
            ],
          },
          { name: "Spirited Away", id: 17 },
        ],
      },
    ]);

    return {
      items,
    };
  },
};
</script>
