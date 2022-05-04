<template>
  <v-dropdown auto-close-menu>
    <template #reference="{ reference, onTrigger }">
      <v-button-dropdown :ref="reference" v-on="onTrigger">
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
        Third menu item
      </v-dropdown-menu-item>
    </v-card>
  </v-dropdown>
</template>
