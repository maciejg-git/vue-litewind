<template>
  <v-card>
    <div @context="showContextDropdown">
      item menu
    </div>
  </v-card>
  <v-dropdown auto-close-menu :reference="context.position">
    <v-card width="320px" style-card="shadow">
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
    let context = reactive({
      isVisible: false,
      position: {},
    })

    let showContextDropdown = (e) => {
      context.position.x = e.clientX
      context.position.y = e.clientY
      context.isVisible = true
    }

    return {
      context,
      showContextDropdown,
    };
  },
};
</script>
