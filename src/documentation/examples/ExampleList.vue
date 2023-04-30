<template>
  <v-list
    :tag="example.tag"
    :base="example.base"
    class="w-auto md:w-[500px]"
  >
    <v-list-item
      v-for="item in example.users"
      :active="item.active"
    >
      <div class="flex gap-x-4">
        <div>
          <div class="font-semibold">
            {{ item.full_name }}
          </div>
          <div class="text-text-300">
            {{ item.title }}
          </div>
        </div>
        <div class="text-sm text-gray-300 ml-auto">
          {{ item.department }}
        </div>
      </div>
    </v-list-item>
  </v-list>
  <!-- CUT START -->
  <div class="mt-5">
    <label for="style">List style:</label>
    <v-select
      id="style"
      v-model="example.base"
      :items="['list', 'material-list']"
      inline
    ></v-select>
  </div>
  <v-tabs
    base="material-tabs"
    class="mt-10"
  >
    <v-tab name="Props">
      <div class="flex flex-col gap-y-2 mt-5">
        <div>
          <label for="tag">tag:</label>
          <v-select
            id="tag"
            v-model="example.tag"
            :items="['div', 'a', 'button']"
            inline
          ></v-select>
        </div>
      </div>
    </v-tab>
  </v-tabs>
  <!-- CUT END -->
</template>

<script setup>
import { reactive } from "vue";
import company from "../example-data/company.json";

let example = reactive({
  users: company.slice(0, 5).map((i) => ({ ...i, active: false })),
  tag: "div",
  base: "list",
});

example.users[2].active = true;
</script>
