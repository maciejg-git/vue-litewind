<template>
  <div class="flex flex-col gap-y-4">

    <!-- simple popover -->

    <v-popover
      v-bind="example"
      @update:modelValue="
        example.events.unshift({ ev: 'update:modelValue', data: $event })
      "
    >
      <template #reference>
        <v-button>Show simple popover</v-button>
      </template>
      This is popover.
    </v-popover>

    <!-- form popover -->

    <v-popover
      v-bind="example"
      title="Login"
      @update:modelValue="
        example.events.unshift({ ev: 'update:modelValue', data: $event })
      "
    >
      <template #reference>
        <v-button>Show form popover</v-button>
      </template>
      <div class="grid grid-cols-3 gap-2 my-2">
        <label for="login">Login</label>
        <v-input type="text" id="login" class="col-span-2"></v-input>
        <label for="password">Password</label>
        <v-input type="password" id="password" class="col-span-2"></v-input>
      </div>
    </v-popover>

    <!-- tooltip popover -->

    <v-popover
      v-bind="example"
      title="Header"
      name="popover-plain"
      @update:modelValue="
        example.events.unshift({ ev: 'update:modelValue', data: $event })
      "
    >
      <template #reference>
        <v-button>Show tooltip popover</v-button>
      </template>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </v-popover>
  </div>
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
          <option value="focus">focus</option>
          <option value="hover">hover</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="no-header">no-header:</label>
        <v-select id="no-header" v-model="example.noHeader">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="title">title</label>
        <v-input type="text" id="title" v-model="example.title"></v-input>
      </div>
      <div class="mb-2">
        <label for="transition">transition:</label>
        <v-select id="transition" v-model="example.transition">
          <option value="fade">fade</option>
        </v-select>
      </div>
      <div class="mb-2">
        <label for="click-outside-close">click-outside-close:</label>
        <v-select id="click-outside-close" v-model="example.clickOutsideClose">
          <option :value="true">true</option>
          <option :value="false">false</option>
        </v-select>
      </div>
    </v-tab>
    <v-tab>
      <template #name>
        Events
        <v-badge style-badge="secondary tiny" class="ml-2">
          {{ events.length }}
        </v-badge>
      </template>
      <div class="overflow-y-auto max-h-48 mt-5 w-full">
        <div class="px-2 pb-2">
          <template v-for="ev in example.events">
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
      placement: "right",
      trigger: "click",
      noHeader: false,
      title: "Popover title",
      transition: "fade",
      clickOutsideClose: true,
    });

    let events = ref([]);

    return {
      example,
      events,
    };
  },
};
</script>
