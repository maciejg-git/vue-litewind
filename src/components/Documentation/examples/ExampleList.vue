<template>
  <v-list width="500px" :tag="example.tag" :name="example.name">
    <v-list-item :active="example.active1">
      <div class="font-semibold">
        {{ dataJSON[0].first_name }} {{ dataJSON[0].last_name }}
      </div>
      <div class="text-gray-400">
        {{ dataJSON[0].email }}
      </div>
      <div>
        <v-checkbox type="checkbox" v-model="example.active1" />
        <label for="" class="ml-2">toggle active</label>
      </div>
    </v-list-item>
    <v-list-item :active="example.active2">
      <div class="font-semibold">
        {{ dataJSON[1].first_name }} {{ dataJSON[1].last_name }}
      </div>
      <div class="text-gray-400">
        {{ dataJSON[1].email }}
      </div>
      <div>
        <v-checkbox type="checkbox" v-model="example.active2" />
        <label for="" class="ml-2">toggle active</label>
      </div>
    </v-list-item>
    <v-list-item :active="example.active3">
      <div class="font-semibold">
        {{ dataJSON[2].first_name }} {{ dataJSON[2].last_name }}
      </div>
      <div class="text-gray-400">
        {{ dataJSON[2].email }}
      </div>
      <div>
        <v-checkbox type="checkbox" v-model="example.active3" />
        <label for="" class="ml-2">toggle active</label>
      </div>
    </v-list-item>
    <v-list-item :active="example.active4">
      <div class="font-semibold">
        {{ dataJSON[3].first_name }} {{ dataJSON[3].last_name }}
      </div>
      <div class="text-gray-400">
        {{ dataJSON[3].email }}
      </div>
      <div>
        <v-checkbox type="checkbox" v-model="example.active4" />
        <label for="" class="ml-2">toggle active</label>
      </div>
    </v-list-item>
    <v-list-item :active="example.active5">
      <div class="font-semibold">
        {{ dataJSON[4].first_name }} {{ dataJSON[4].last_name }}
      </div>
      <div class="text-gray-400">
        {{ dataJSON[4].email }}
      </div>
      <div>
        <v-checkbox type="checkbox" v-model="example.active5" />
        <label for="" class="ml-2">toggle active</label>
      </div>
    </v-list-item>
  </v-list>
  <div class="mt-5">
    <label for="style">List style:</label>
    <v-select id="style" v-model="example.name">
      <option value="list">bootstrap</option>
      <option value="listMaterial">material</option>
    </v-select>
  </div>
  <v-tabs name="tabs-material" class="mt-10">
    <v-tab name="Props">
      <div class="mb-2 mt-5">
        <label for="tag">tag:</label>
        <v-select id="tag" v-model="example.tag">
          <option value="div">div</option>
          <option value="a">a</option>
          <option value="button">button</option>
        </v-select>
      </div>
    </v-tab>
    <v-tab name="Events">
      <div class="overflow-y-auto max-h-48 mt-5 w-full">
        <div class="px-2 pb-2">
          <div class="py-1">This component does not emit any events</div>
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
</template>

<script>
import { ref, reactive } from "vue";
import dataJSON from "../../../data.json";

export default {
  setup() {
    let example = reactive({
      tag: "div",
      active1: false,
      active2: false,
      active3: false,
      active4: false,
      active5: false,
      name: "list",
    });

    return {
      example,
      dataJSON,
    };
  },
};
</script>
