const n=`<template>\r
  <v-card style="height: 600px">\r
    <v-navbar class="py-2 px-4">\r
      <div class="flex items-center">\r
        <span class="font-bold text-lg">Brand</span>\r
        <ul class="flex flex-row gap-x-7 ml-7">\r
          <li><div class="py-2">Home</div></li>\r
          <li><div class="py-2">About</div></li>\r
          <li>\r
            <v-dropdown trigger="hover" :offset-y="2" base="dropdown-flat">\r
              <template #reference="{ reference, onTrigger }">\r
                <v-button\r
                  :ref="reference"\r
                  v-on="onTrigger"\r
                  base="button-plain"\r
                  class="py-2"\r
                >\r
                  Dropdown\r
                </v-button>\r
              </template>\r
              <v-card width="420px" base="card-flat">\r
                <v-dropdown-menu-item tag="button">\r
                  <header class="font-semibold">Get started</header>\r
                  <span class="text-sm">\r
                    Lorem Ipsum is simply dummy text of the printing and\r
                    typesetting industry. Lorem Ipsum has been the industry's\r
                    standard dummy text ever since the 1500s, when an unknown\r
                    printer took a galley of type and scrambled it to make a\r
                    type specimen book\r
                  </span>\r
                </v-dropdown-menu-item>\r
                <v-dropdown-menu-item tag="button">\r
                  <header class="font-semibold">Documenation</header>\r
                  <span class="text-sm">\r
                    It is a long established fact that a reader will be\r
                    distracted by the readable content of a page when looking at\r
                    its layout\r
                  </span>\r
                </v-dropdown-menu-item>\r
                <v-dropdown-menu-item tag="button">\r
                  <header class="font-semibold">Team</header>\r
                  <span class="text-sm">\r
                    Contrary to popular belief, Lorem Ipsum is not simply random\r
                    text. It has roots in a piece of classical Latin literature\r
                    from 45 BC, making it over 2000 years old\r
                  </span>\r
                </v-dropdown-menu-item>\r
                <v-dropdown-menu-item tag="button">\r
                  <header class="font-semibold">About</header>\r
                  <span class="text-sm">\r
                    It is a long established fact that a reader will be\r
                    distracted by the readable content of a page when looking at\r
                    its layout\r
                  </span>\r
                </v-dropdown-menu-item>\r
              </v-card>\r
            </v-dropdown>\r
          </li>\r
        </ul>\r
        <div class="ml-auto mr-4">\r
          <v-input></v-input>\r
        </div>\r
        <v-button>Search</v-button>\r
      </div>\r
    </v-navbar>\r
  </v-card>\r
</template>\r
`;export{n as default};
