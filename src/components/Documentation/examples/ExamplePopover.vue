<template>
  <!-- simple popover -->

  <p class="my-4">Simple popover</p>

  <v-popover v-bind="example">
    <template #reference="{ reference, onTrigger }">
      <v-button :ref="reference" v-on="onTrigger">Show simple popover</v-button>
    </template>
    This is popover.
  </v-popover>

  <!-- form popover -->

  <p class="my-4">Form popover</p>

  <v-popover v-bind="example" title="Login">
    <template #reference="{ reference, onTrigger }">
      <v-button :ref="reference" v-on="onTrigger">Show form popover</v-button>
    </template>
    <div class="flex flex-col gap-y-4 w-[250px]">
      <div class="flex flex-col gap-y-1">
        <label for="login">Email</label>
        <v-input type="text" id="login" placeholder="Enter email"></v-input>
      </div>
      <div class="flex flex-col gap-y-1">
        <label for="password">Password</label>
        <v-input type="password" id="password" placeholder="Enter password"></v-input>
      </div>
      <v-button style-button="small" class="ml-auto mt-6">Login</v-button>
    </div>
  </v-popover>

  <!-- tooltip popover -->

  <p class="my-4">Tooltip popover</p>

  <v-popover v-bind="example" title="Header" base="popover-plain">
    <template #reference="{ reference, onTrigger }">
      <v-button :ref="reference" v-on="onTrigger">
        Show tooltip popover
      </v-button>
    </template>
    <div class="w-[280px]">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but also
      the leap into electronic typesetting, remaining essentially unchanged. It
      was popularised in the 1960s with the release of Letraset sheets containing
      Lorem Ipsum passages, and more recently with desktop publishing software
      like Aldus PageMaker including versions of Lorem Ipsum.
    </div>
  </v-popover>
<!-- CUT START -->
  <v-tabs base="tabs-material" class="mt-10">
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
            <option value="focus">focus</option>
            <option value="hover">hover</option>
          </v-select>
        </div>
        <div>
          <label for="no-header">no-header:</label>
          <v-select id="no-header" v-model="example.noHeader">
            <option :value="true">true</option>
            <option :value="false">false</option>
          </v-select>
        </div>
        <div>
          <label for="title">title</label>
          <v-input type="text" id="title" v-model="example.title"></v-input>
        </div>
        <div>
          <label for="transition">transition:</label>
          <v-select id="transition" v-model="example.transition">
            <option value="fade-f">fade-f</option>
            <option value="fade-m">fade-m</option>
            <option value="fade-s">fade-s</option>
            <option value="">empty string</option>
          </v-select>
        </div>
      </div>
    </v-tab>
    <v-tab>
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
      placement: "right",
      trigger: "click",
      noHeader: false,
      title: "Popover title",
      transition: "fade-m",
      offsetY: 10,
    });

    let events = ref([]);

    return {
      example,
      events,
    };
  },
};
</script>
