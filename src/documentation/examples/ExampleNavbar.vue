<template>
  <v-card
    style="height: 600px"
    mod-card="variant:transparent"
  >
    <v-navbar class="flex items-center px-4 py-2">
      <span class="text-lg font-bold">Brand</span>
      <ul class="ml-7 flex flex-row gap-x-7">
        <li><div class="py-2">Home</div></li>
        <li><div class="py-2">About</div></li>
        <li>
          <v-dropdown
            trigger="hover"
            :flip="false"
            :offset-y="2"
          >
            <template #reference="{ reference, onTrigger }">
              <v-button
                :ref="reference"
                v-on="onTrigger"
                mod-button="preset:plain"
                class="py-2"
              >
                Dropdown
              </v-button>
            </template>
            <v-card
              class="min-w-[300px] md:min-w-[420px]"
              mod-card="preset:flatDropdown"
            >
              <v-dropdown-menu-item tag="button">
                <header class="font-semibold">Get started</header>
                <span class="text-sm">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </span>
              </v-dropdown-menu-item>
              <v-dropdown-menu-item tag="button">
                <header class="font-semibold">Documenation</header>
                <span class="text-sm">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout
                </span>
              </v-dropdown-menu-item>
              <v-dropdown-menu-item tag="button">
                <header class="font-semibold">Team</header>
                <span class="text-sm">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old
                </span>
              </v-dropdown-menu-item>
              <v-dropdown-menu-item tag="button">
                <header class="font-semibold">About</header>
                <span class="text-sm">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout
                </span>
              </v-dropdown-menu-item>
            </v-card>
          </v-dropdown>
        </li>
      </ul>
      <div class="ml-auto mr-4 hidden items-center gap-x-4 md:flex">
        <v-input></v-input>
        <v-button>Search</v-button>
      </div>
    </v-navbar>
  </v-card>
</template>
