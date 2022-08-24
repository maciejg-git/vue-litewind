<template>
  <v-dropdown :offsetY="5">
    <template #reference="{ reference, onTrigger }">
      <v-button-dropdown :ref="reference" v-on="onTrigger" class="mr-4">
        Filterable menu
      </v-button-dropdown>
    </template>
    <v-card width="280px" style-card="menu shadow">
      <div class="px-4 py-1">
        <v-input
          v-model="filter"
          class="text-sm"
          placeholder="Filter"
          base="underlined"
        ></v-input>
      </div>
      <v-dropdown-menu-item v-for="item in menuItems" :key="item" tag="button">
        {{ item }}
      </v-dropdown-menu-item>
    </v-card>
  </v-dropdown>
</template>

<script>
import { ref, computed } from "vue";
import { languages } from "../data/data";

export default {
  setup() {
    let filter = ref("");

    let menuItems = computed(() => {
      return languages.filter((i) => {
        return i.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1;
      });
    });

    return {
      filter,
      menuItems,
    };
  },
};
</script>
