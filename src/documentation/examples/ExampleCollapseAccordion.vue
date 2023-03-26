<template>
  <!-- model collapse accordion -->

  <p class="mt-8 mb-4">Accordion - controlled by models</p>

  <v-accordion class="my-2">
    <v-card>
      <v-button-chevron
        :switch="accordion.isVisible"
        block
        :chevron="{ class: 'ml-auto' }"
        @click="accordion.isVisible = !accordion.isVisible"
      >
        Toggle collapse
      </v-button-chevron>
      <v-collapse v-model="accordion.isVisible">
        <div class="p-8">
          {{ text[0] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card class="my-2">
      <v-button-chevron
        :switch="accordion.isVisible2"
        block
        :chevron="{ class: 'ml-auto' }"
        @click="accordion.isVisible2 = !accordion.isVisible2"
      >
        Toggle collapse
      </v-button-chevron>
      <v-collapse v-model="accordion.isVisible2">
        <div class="p-8">
          {{ text[1] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card class="my-2">
      <v-button-chevron
        :switch="accordion.isVisible3"
        block
        :chevron="{ class: 'ml-auto' }"
        @click="accordion.isVisible3 = !accordion.isVisible3"
      >
        Toggle collapse
      </v-button-chevron>
      <v-collapse v-model="accordion.isVisible3">
        <div class="p-8">
          {{ text[2] }}
        </div>
      </v-collapse>
    </v-card>
  </v-accordion>

  <!-- reference slot accordion -->

  <p class="mt-8 mb-4">Accordion - controlled from reference slot</p>

  <v-accordion class="my-2">
    <v-card
      base="flat-card"
      style-card="shadow"
    >
      <v-collapse>
        <template #reference="{ isOpen, onTrigger }">
          <v-button-chevron
            :switch="isOpen"
            base="plain-button"
            block
            class="p-3"
            :chevron="{ class: 'ml-auto' }"
            v-on="onTrigger"
          >
            Toggle collapse
          </v-button-chevron>
        </template>
        <div class="p-8">
          {{ text[0] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card
      base="flat-card"
      style-card="shadow"
      class="my-2"
    >
      <v-collapse>
        <template #reference="{ isOpen, onTrigger }">
          <v-button-chevron
            :switch="isOpen"
            base="plain-button"
            block
            class="p-3"
            :chevron="{ class: 'ml-auto' }"
            v-on="onTrigger"
          >
            Toggle collapse
          </v-button-chevron>
        </template>
        <div class="p-8">
          {{ text[1] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card
      base="flat-card"
      style-card="shadow"
      class="my-2"
    >
      <v-collapse>
        <template #reference="{ isOpen, onTrigger }">
          <v-button-chevron
            :switch="isOpen"
            base="plain-button"
            block
            class="p-3"
            :chevron="{ class: 'ml-auto' }"
            v-on="onTrigger"
          >
            Toggle collapse
          </v-button-chevron>
        </template>
        <div class="p-8">
          {{ text[0] }}
        </div>
      </v-collapse>
    </v-card>
  </v-accordion>
</template>

<script setup>
import { reactive } from "vue";
import { text } from "../example-data/data.js";

let accordion = reactive({
  isVisible: false,
  isVisible2: false,
  isVisible3: false,
});
</script>
