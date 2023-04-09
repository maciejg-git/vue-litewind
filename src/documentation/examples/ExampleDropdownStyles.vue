<template>
  <!-- relaxed -->

  <v-dropdown
    base="relaxed-dropdown"
    :offsetY="5"
  >
    <template #reference="{ reference, onTrigger }">
      <v-button-chevron
        :ref="reference"
        :chevron="{ class: 'ml-2' }"
        class="mr-4"
        v-on="onTrigger"
      >
        Dropdown menu (relaxed)
      </v-button-chevron>
    </template>

    <v-card
      width="320px"
      style-card="shadow"
      class="flex flex-col items-center py-3"
    >
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
        Menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Another menu item
      </v-dropdown-menu-item>
      <v-divider class="w-11/12 mx-auto" />
      <v-dropdown-menu-item
        disabled
        tag="button"
      >
        Disabled menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Menu item
      </v-dropdown-menu-item>
    </v-card>
  </v-dropdown>

  <!-- flat -->

  <v-dropdown
    base="flat-dropdown"
    :offsetY="5"
  >
    <template #reference="{ reference, onTrigger }">
      <v-button-chevron
        :ref="reference"
        style-button="square"
        :chevron="{ class: 'ml-2' }"
        v-on="onTrigger"
        class="mt-4 md:mt-0"
      >
        Dropdown menu (flat)
      </v-button-chevron>
    </template>
    <v-card
      width="320px"
      base="flat-card"
    >
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
        Menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Another menu item
      </v-dropdown-menu-item>
      <v-divider class="w-11/12 mx-auto" />
      <v-dropdown-menu-item
        disabled
        tag="button"
      >
        Disabled menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Menu item
      </v-dropdown-menu-item>
    </v-card>
  </v-dropdown>
</template>
