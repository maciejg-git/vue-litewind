<template>
  <v-dropdown>
    <template #activator>
      <v-input
        type="text"
        v-model="example.date"
        placeholder="Pick date"
      ></v-input>
    </template>
    <template #default="{ hide }">
      <v-card style-card="shadow" class="p-2">
        <v-date-picker
          v-model="example.date"
          width="305px"
          :buttons="example.buttons"
          adjacent-months
          @state:done="hide"
        ></v-date-picker>
      </v-card>
    </template>
  </v-dropdown>
<!-- CUT START -->
  <div class="mt-4 lg:ml-10 lg:mt-0">
    <div class="mb-2">
      <label for="dropdown-buttons">buttons:</label>
      <v-select id="dropdown-buttons" v-model="example.buttons">
        <option :value="true">true</option>
        <option :value="false">false</option>
      </v-select>
    </div>
  </div>
  <!-- CUT END -->
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      date: "",
      buttons: false,
    });

    return {
      example,
    };
  },
};
</script>
