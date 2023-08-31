<template>
  <v-dropdown :offsetY="5">
    <template #reference="{ reference, onTrigger }">
      <v-button-chevron
        :ref="reference"
        :chevron="{ class: 'ml-2' }"
        v-on="onTrigger"
      >
        Filterable menu
      </v-button-chevron>
    </template>

    <v-card width="280px">
      <div class="px-4 py-1">
        <v-input
          v-model="filter"
          placeholder="Filter"
          base="underlinedInput"
          :close-button="{
            modCloseButton: 'size:small',
          }"
          clearable
        ></v-input>
      </div>
      <v-dropdown-menu-item
        v-for="item in menuItems"
        :key="item"
        tag="button"
      >
        {{ item }}
      </v-dropdown-menu-item>
    </v-card>
  </v-dropdown>
</template>

<script setup>
import { ref, computed } from "vue";
import { languages } from "../example-data/data.js";

let filter = ref("");

let menuItems = computed(() => {
  return languages.filter((i) => {
    return i.toLowerCase().indexOf(filter.value.toLowerCase()) !== -1;
  });
});
</script>
