<template>
  <v-dropdown
    v-bind="example"
    @state:opened="events.unshift({ ev: 'state:opened', data: $event })"
    @state:closed="events.unshift({ ev: 'state:closed', data: $event })"
  >
    <template #reference="{ reference, onTrigger }">
      <v-button-dropdown :ref="reference" v-on="onTrigger" class="mr-4">
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
      <v-dropdown-header>
        Menu header
      </v-dropdown-header>
      <v-dropdown-menu-item active tag="button">
        Active menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">
        Another menu item
      </v-dropdown-menu-item>
      <v-divider />
      <v-dropdown-menu-item disabled tag="button">
        Disabled menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
    </v-card>
  </v-dropdown>
<!-- CUT START -->
  <v-tabs base="material" class="mt-10">
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="placement">placement:</label>
          <v-select id="placement" v-model="example.placement">
            <option value="auto">auto</option>
            <option value="auto-start">auto-start</option>
            <option value="auto-end">auto-end</option>
            <option value="top">top</option>
            <option value="top-start">top-start</option>
            <option value="top-end">top-end</option>
            <option value="bottom">bottom</option>
            <option value="bottom-start">bottom-start</option>
            <option value="bottom-end">bottom-end</option>
            <option value="right">right</option>
            <option value="right-start">right-start</option>
            <option value="right-end">right-end</option>
            <option value="left">left</option>
            <option value="left-start">left-start</option>
            <option value="left-end">left-end</option>
          </v-select>
        </div>
        <div>
          <label for="trigger">trigger:</label>
          <v-select id="trigger" v-model="example.trigger">
            <option value="click">click</option>
            <option value="hover">hover</option>
            <option value="focus">focus</option>
          </v-select>
        </div>
        <div>
          <label for="offsetX">offsetX:</label>
          <v-input type="text" id="offsetX" inline v-model.number="example.offsetX"></v-input>
        </div>
        <div>
          <label for="offsetY">offsetY:</label>
          <v-input type="text" id="offsetY" inline v-model.number="example.offsetY"></v-input>
        </div>
        <div>
          <label for="no-flip">no-flip:</label>
          <v-select-prop id="no-flip" v-model="example.noFlip">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="auto-close-menu">auto-close-menu:</label>
          <v-select-prop id="auto-close-menu" v-model="example.autoCloseMenu">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select-prop>
        </div>
        <div>
          <label for="transition">transition:</label>
          <v-select id="transition" v-model="example.transition">
            <option value="fade-100">fade-100</option>
            <option value="fade-200">fade-200</option>
            <option value="fade-300">fade-300</option>
            <option value="">empty string</option>
          </v-select>
        </div>
      </div>
    </v-tab>
    <v-tab name="Events">
      <template #name>
        Events
        <v-badge style-badge="secondary tiny" class="ml-2">
          {{ events.length }}
        </v-badge>
      </template>
      <event-viewer :events="events" />
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      placement: "bottom-start",
      offsetX: 0,
      offsetY: 5,
      noFlip: false,
      autoCloseMenu: false,
      transition: "fade-200",
      trigger: "click",
    });

    let dropdownButton = ref(true)
    let dropdown = ref(true)

    let events = ref([]);

    return {
      example,
      events,
      dropdown,
      dropdownButton,
    };
  },
};
</script>
