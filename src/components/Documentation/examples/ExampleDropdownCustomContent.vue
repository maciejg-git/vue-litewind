<template>
  <v-dropdown :offsetY="5">
    <template #reference="{ reference, onTrigger }">
      <v-button-dropdown :ref="reference" v-on="onTrigger" class="mr-4">
        Filterable menu
      </v-button-dropdown>
    </template>
    <v-card width="320px" style-card="menu shadow">
      <div class="px-4 py-1">
        <v-input
          v-model="filter"
          class="text-sm"
          placeholder="Filter"
          base="underlined"
        ></v-input>
      </div>
      <v-dropdown-menu-item v-for="item in menuItems" tag="button">
        {{ item.label }}
      </v-dropdown-menu-item>
    </v-card>
  </v-dropdown>
</template>

<script>
import { ref, reactive, computed } from "vue";

export default {
  setup() {
    let filter = ref("");

    let menuContent = [
      {
        label: "Second menu item",
      },
      {
        label: "Menu header",
      },
      {
        label: "Active menu item",
      },
      {
        label: "Another menu item",
      },
      {
        label: "Menu item",
      },
    ];

    let menuItems = computed(() => {
      return menuContent.filter((i) => {
        return i.label.indexOf(filter.value) !== -1;
      });
    });

    return {
      filter,
      menuItems,
    };
  },
};
</script>
