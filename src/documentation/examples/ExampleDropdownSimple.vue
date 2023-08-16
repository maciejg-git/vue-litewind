<template>
  <v-dropdown
    auto-close-menu
    :offsetY="5"
  >
    <template #reference="{ reference, onTrigger }">
      <v-button-chevron
        :ref="reference"
        :chevron="{ class: 'ml-2' }"
        v-on="onTrigger"
      >
        Dropdown menu
      </v-button-chevron>
    </template>

    <v-card
      width="320px"
    >
      <v-dropdown-menu-item tag="button">
        Menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Second menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item
        active
        tag="button"
      >
        Active menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Third menu item
      </v-dropdown-menu-item>
    </v-card>
  </v-dropdown>
</template>
