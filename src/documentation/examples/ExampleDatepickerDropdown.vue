<template>
  <v-dropdown :offsetY="5">
    <template #reference="{ reference, onTrigger }">
      <v-input
        :ref="reference"
        v-on="onTrigger"
        type="text"
        v-model="example.date"
        placeholder="Pick date"
        inline
      ></v-input>
    </template>

    <template #default="{ hide }">
      <v-card class="p-2">
        <v-date-picker
          v-model="example.date"
          width="305px"
          :buttons="example.buttons"
          adjacent-months
          @state:done="hide"
        />
      </v-card>
    </template>
  </v-dropdown>
</template>

<script setup>
import { reactive } from "vue";

let example = reactive({
  date: "",
  buttons: false,
});
</script>
