const n=`<template>\r
  <v-dropdown auto-close-menu :offsetY="5">\r
    <template #reference="{ reference, onTrigger }">\r
      <v-button-dropdown :ref="reference" v-on="onTrigger">\r
        Dropdown menu\r
      </v-button-dropdown>\r
    </template>\r
    <v-card width="320px" style-card="menu shadow">\r
      <v-dropdown-menu-item tag="button">\r
        Menu item\r
      </v-dropdown-menu-item>\r
      <v-dropdown-menu-item tag="button">\r
        Second menu item\r
      </v-dropdown-menu-item>\r
      <v-dropdown-menu-item active tag="button">\r
        Active menu item\r
      </v-dropdown-menu-item>\r
      <v-dropdown-menu-item tag="button">\r
        Third menu item\r
      </v-dropdown-menu-item>\r
    </v-card>\r
  </v-dropdown>\r
</template>\r
`;export{n as default};
