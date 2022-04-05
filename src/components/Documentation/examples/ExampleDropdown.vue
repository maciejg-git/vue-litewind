<template>

  <!-- Dropdown menu -->

  <v-dropdown
    v-bind="example"
    @state:opened="events.unshift({ ev: 'state:opened', data: $event })"
    @state:closed="events.unshift({ ev: 'state:closed', data: $event })"
  >
    <template #reference>
      <v-button-dropdown class="mr-4">
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

  <!-- Dropdown menu (alternate style) -->

  <v-dropdown
    v-bind="example"
    name="dropdown-relaxed"
    @state:opened="events.unshift({ ev: 'state:opened', data: $event })"
    @state:closed="events.unshift({ ev: 'state:closed', data: $event })"
    class="ml-2"
  >
    <template #reference>
      <v-button class="mr-4">
        Dropdown menu (alternate style)
        <v-chevron style-chevron="right" />
      </v-button>
    </template>
    <v-card width="320px" style-card="shadow" class="flex flex-col py-1 ">
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
      <v-divider class="w-11/12 mx-auto" />
      <v-dropdown-menu-item disabled tag="button">
        Disabled menu item
      </v-dropdown-menu-item>
      <v-dropdown-menu-item tag="button">Menu item</v-dropdown-menu-item>
    </v-card>
  </v-dropdown>

  <!-- Dropdown datepicker -->

  <v-dropdown
    v-bind="example"
    @state:opened="events.unshift({ ev: 'state:opened', data: $event })"
    @state:closed="events.unshift({ ev: 'state:closed', data: $event })"
    class="ml-2"
  >
    <template #reference>
      <v-button class="mr-4">
        Dropdown datepicker
        <v-chevron style-chevron="right" />
      </v-button>
    </template>
    <template #default="{ hide }">
      <v-card width="320px" style-card="shadow" class="p-2">
        <v-date-picker
          v-model="example.date"
          adjacent-months
          @state:done="hide"
        />
      </v-card>
    </template>
  </v-dropdown>
<!-- CUT START -->
  <v-tabs name="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
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
      <div class="mb-2">
        <label for="trigger">trigger:</label>
        <v-select id="trigger" v-model="example.trigger">
          <option value="click">click</option>
          <option value="hover">hover</option>
          <option value="focus">focus</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="offsetX">offsetX:</label>
        <v-input type="text" id="offsetX" v-model.number="example.offsetX"></v-input>
      </div>
      <div class="mb-2">
        <label for="offsetY">offsetY:</label>
        <v-input type="text" id="offsetY" v-model.number="example.offsetY"></v-input>
      </div>
      <div class="mb-2">
        <label for="no-flip">no-flip:</label>
        <v-select id="no-flip" v-model="example.noFlip">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="auto-close-menu">auto-close-menu:</label>
        <v-select id="auto-close-menu" v-model="example.autoCloseMenu">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="transition">transition:</label>
        <v-select id="transition" v-model="example.transition">
          <option value="fade">fade</option>
          <option value="">empty string</option>
        </v-select>
      </div>
    </v-tab>
    <v-tab name="Events">
      <template #name>
        Events
        <v-badge style-badge="secondary tiny" class="ml-2">
          {{ events.length }}
        </v-badge>
      </template>
      <div class="overflow-y-auto max-h-48 mt-5 w-full">
        <div class="px-2 pb-2">
          <template v-for="ev in events">
            <div class="py-1">
              <code class="code-word">{{ ev.ev }}</code>
              {{ ev.data }}
            </div>
          </template>
        </div>
      </div>
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
      transition: "fade",
      trigger: "click",
      date: "",
    });

    let events = ref([]);

    return {
      example,
      events,
    };
  },
};
</script>
