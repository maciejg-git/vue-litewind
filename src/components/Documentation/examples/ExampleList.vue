<template>
  <v-list width="500px" :tag="example.tag" :name="example.name">
    <v-list-item :active="example.active1">
      <div class="font-semibold">
        {{ data[0].first_name }} {{ data[0].last_name }}
      </div>
      <div class="text-gray-400">
        {{ data[0].email }}
      </div>
      <div>
        <v-checkbox type="checkbox" v-model="example.active1" />
        <label for="" class="ml-2">toggle active</label>
      </div>
    </v-list-item>

    <v-list-item :active="example.active2">
      <div class="font-semibold">
        {{ data[1].first_name }} {{ data[1].last_name }}
      </div>
      <div class="text-gray-400">
        {{ data[1].email }}
      </div>
      <div>
        <v-checkbox type="checkbox" v-model="example.active2" />
        <label for="" class="ml-2">toggle active</label>
      </div>
    </v-list-item>

    <v-list-item :active="example.active3">
      <div class="font-semibold">
        {{ data[2].first_name }} {{ data[2].last_name }}
      </div>
      <div class="text-gray-400">
        {{ data[2].email }}
      </div>
      <div>
        <v-checkbox type="checkbox" v-model="example.active3" />
        <label for="" class="ml-2">toggle active</label>
      </div>
    </v-list-item>

    <v-list-item :active="example.active4">
      <div class="font-semibold">
        {{ data[3].first_name }} {{ data[3].last_name }}
      </div>
      <div class="text-gray-400">
        {{ data[3].email }}
      </div>
      <div>
        <v-checkbox type="checkbox" v-model="example.active4" />
        <label for="" class="ml-2">toggle active</label>
      </div>
    </v-list-item>

    <v-list-item :active="example.active5">
      <div class="font-semibold">
        {{ data[4].first_name }} {{ data[4].last_name }}
      </div>
      <div class="text-gray-400">
        {{ data[4].email }}
      </div>
      <div>
        <v-checkbox type="checkbox" v-model="example.active5" />
        <label for="" class="ml-2">toggle active</label>
      </div>
    </v-list-item>
  </v-list>
<!-- CUT START -->
  <div class="mt-5">
    <label for="style">List style:</label>
    <v-select id="style" v-model="example.name">
      <option value="list">bootstrap</option>
      <option value="list-material">material</option>
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
  </v-tabs>
<!-- CUT END -->
</template>

<script>
import { reactive } from "vue";
/* CUT START */
import data from "../../../data.json";
/* CUT END */
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
/* CUT START */
      data,
/* CUT END */
    };
  },
};
</script>
