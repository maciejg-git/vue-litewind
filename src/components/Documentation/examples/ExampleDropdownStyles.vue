<template>

  <!-- relaxed -->

  <v-dropdown base="relaxed">
    <template #reference="{ reference, onTrigger }">
      <v-button :ref="reference" v-on="onTrigger" class="mr-4">
        Dropdown menu (relaxed)
        <v-chevron style-chevron="right" />
      </v-button>
    </template>
    <v-card
      width="320px"
      style-card="shadow"
      class="flex flex-col items-center py-1"
    >
      <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">Second menu item</v-dropdown-menu-item>
      <v-dropdown-header>Menu header</v-dropdown-header>
      <v-dropdown-menu-item tag="button">
        Menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Another menu item
      </v-dropdown-menu-item>
      <v-divider class="w-11/12 mx-auto" />
      <v-dropdown-menu-item disabled tag="button">
        Disabled menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
    </v-card>
  </v-dropdown>

  <!-- flat -->

  <v-dropdown base="flat" :offsetY="5">
    <template #reference="{ reference, onTrigger }">
      <v-button
        :ref="reference"
        style-button="square"
        v-on="onTrigger"
        class="mr-4"
      >
        Dropdown menu (flat)
        <v-chevron style-chevron="right" />
      </v-button>
    </template>
    <v-card width="320px" base="flat">
      <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">Second menu item</v-dropdown-menu-item>
      <v-dropdown-header>Menu header</v-dropdown-header>
      <v-dropdown-menu-item tag="button">
        Menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Another menu item
      </v-dropdown-menu-item>
      <v-divider class="w-11/12 mx-auto" />
      <v-dropdown-menu-item disabled tag="button">
        Disabled menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
    </v-card>
  </v-dropdown>
</template>
