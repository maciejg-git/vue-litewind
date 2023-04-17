<template>
  <v-dropdown
    v-bind="example"
    @state:opened="events.unshift({ ev: 'state:opened', data: $event })"
    @state:closed="events.unshift({ ev: 'state:closed', data: $event })"
  >
    <template #reference="{ reference, onTrigger, isOpen }">
      <v-button-chevron
        :ref="reference"
        :chevron="{ class: 'ml-2' }"
        v-on="onTrigger"
        :switch="isOpen"
      >
        Dropdown menu
      </v-button-chevron>
    </template>

    <v-card
      width="320px"
      style-card="menu shadow"
    >
      <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">Second menu item</v-dropdown-menu-item>
      <v-dropdown-header>Menu header</v-dropdown-header>
      <v-dropdown-menu-item
        active
        tag="button"
      >
        Active menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Another menu item
      </v-dropdown-menu-item>
      <v-divider />
      <v-dropdown-menu-item
        disabled
        tag="button"
      >
        Disabled menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
    </v-card>
  </v-dropdown>
  <!-- CUT START -->
  <v-tabs
    base="material-tabs"
    class="mt-10"
  >
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="placement">placement:</label>
          <v-select
            id="placement"
            v-model="example.placement"
            inline
            :items="[
              'top',
              'top-start',
              'top-end',
              'bottom',
              'bottom-start',
              'bottom-end',
              'right',
              'right-start',
              'right-end',
              'left',
              'left-start',
              'left-end',
            ]"
          ></v-select>
        </div>
        <div>
          <label for="trigger">trigger:</label>
          <v-select
            id="trigger"
            v-model="example.trigger"
            inline
            :items="['click', 'focus', 'hover']"
          ></v-select>
        </div>
        <div>
          <label for="offsetX">offsetX:</label>
          <v-input
            type="text"
            id="offsetX"
            inline
            v-model.number="example.offsetX"
          ></v-input>
        </div>
        <div>
          <label for="offsetY">offsetY:</label>
          <v-input
            type="text"
            id="offsetY"
            inline
            v-model.number="example.offsetY"
          ></v-input>
        </div>
        <div>
          <label for="flip">flip:</label>
          <v-select-prop
            id="flip"
            v-model="example.flip"
          ></v-select-prop>
        </div>
        <div>
          <label for="auto-close-menu">auto-close-menu:</label>
          <v-select-prop
            id="auto-close-menu"
            v-model="example.autoCloseMenu"
          ></v-select-prop>
        </div>
        <div>
          <label for="transition">transition:</label>
          <v-select
            id="transition"
            v-model="example.transition"
            inline
            :items="[
              {
                text: 'empty string',
                value: '',
              },
              'fade',
              'fade-slide',
              'fade-scale',
            ]"
          ></v-select>
        </div>
      </div>
    </v-tab>
    <v-tab name="Events">
      <template #name>
        Events
        <v-badge
          style-badge="secondary tiny"
          class="ml-2"
        >
          {{ events.length }}
        </v-badge>
      </template>
      <event-viewer :events="events" />
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script setup>
import { ref, reactive } from "vue";

let example = reactive({
  placement: "bottom-start",
  offsetX: 0,
  offsetY: 5,
  flip: false,
  autoCloseMenu: false,
  transition: "fade-scale",
  trigger: "click",
});

let events = ref([]);
</script>
