<template>
  <v-dropdown auto-close-menu>
    <template #reference>
      <v-button-dropdown>
        Dropdown menu
      </v-button-dropdown>
    </template>
    <v-card width="320px" style-card="menu shadow">
      <v-dropdown-menu-item tag="button">
        Menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Second menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item active tag="button">
        Active menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Active menu item
      </v-dropdown-menu-item>
    </v-card>
  </v-dropdown>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
    });

    return {
    };
  },
};
</script>
