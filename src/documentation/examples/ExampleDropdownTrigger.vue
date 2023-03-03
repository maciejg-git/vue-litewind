<template>
  <v-dropdown id="dropdown" :offsetY="5">
    <v-card width="320px" style-card="menu shadow">
      <v-dropdown-menu-item tag="button">
        Menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Second menu item
      </v-dropdown-menu-item>
      <v-dropdown-header>
        Menu header
      </v-dropdown-header>
      <v-dropdown-menu-item tag="button">
        Active menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Another menu item
      </v-dropdown-menu-item>
      <v-divider />
      <v-dropdown-menu-item disabled tag="button">
        Disabled menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Menu item
      </v-dropdown-menu-item>
    </v-card>
  </v-dropdown>

  <v-trigger for="dropdown" v-slot="{ reference, onTrigger, isOpen }">
    <v-button :ref="reference" v-on="onTrigger">
      Dropdown menu
      <v-chevron rotate180 :switch="isOpen" class="ml-2"></v-chevron>
    </v-button>
  </v-trigger>
</template>
