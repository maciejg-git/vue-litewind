<template>
  <!-- simple popover -->

  <p class="my-4">Simple popover</p>

  <v-popover v-bind="example">
    <template #reference="{ reference, onTrigger }">
      <v-button
        :ref="reference"
        v-on="onTrigger"
      >
        Show simple popover
      </v-button>
    </template>
    <v-card
      style-card="shadow"
      width="220px"
    >
      <v-popover-header />
      <div class="p-5">This is popover.</div>
    </v-card>
  </v-popover>

  <!-- form popover -->

  <p class="my-4">Form popover</p>

  <v-popover
    v-bind="example"
    title="Login"
  >
    <template #reference="{ reference, onTrigger }">
      <v-button
        :ref="reference"
        v-on="onTrigger"
      >
        Show form popover
      </v-button>
    </template>
    <v-card
      style-card="shadow"
      class="w-[250px]"
    >
      <v-popover-header />
      <div class="flex flex-col gap-y-4 p-5">
        <div class="flex flex-col gap-y-1">
          <v-input
            type="text"
            label="Email"
            id="login"
            placeholder="Enter email"
          ></v-input>
        </div>
        <div class="flex flex-col gap-y-1">
          <v-input
            type="password"
            label="Password"
            id="password"
            placeholder="Enter password"
          ></v-input>
        </div>
        <v-button
          style-button="small"
          class="ml-auto mt-2"
        >
          Login
        </v-button>
      </div>
    </v-card>
  </v-popover>

  <!-- tooltip popover -->

  <p class="my-4">Tooltip popover</p>

  <v-popover
    v-bind="example"
    title="Header"
  >
    <template #reference="{ reference, onTrigger }">
      <v-button
        :ref="reference"
        v-on="onTrigger"
      >
        Show tooltip popover
      </v-button>
    </template>
    <v-card
      base="flat-card"
      style-card="shadow"
      class="w-[330px] p-7"
    >
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </v-card>
  </v-popover>
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
          <label for="title">title</label>
          <v-input
            type="text"
            id="title"
            inline
            v-model="example.title"
          ></v-input>
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
    <v-tab>
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
  placement: "right",
  trigger: "click",
  noHeader: false,
  title: "Popover title",
  transition: "fade",
  offsetY: 10,
});

let events = ref([]);
</script>
