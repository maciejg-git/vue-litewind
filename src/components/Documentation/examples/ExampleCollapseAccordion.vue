<template>
  <!-- model collapse accordion -->

  <p class="mt-8 mb-4">Model collapse accordion</p>

  <v-accordion class="my-2">
    <v-card>
      <v-button-collapse v-model="accordion.isVisible" block>
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion.isVisible">
        <div class="p-8">
          {{ text[0] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card class="my-2">
      <v-button-collapse v-model="accordion.isVisible2" block>
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion.isVisible2">
        <div class="p-8">
          {{ text[1] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card class="my-2">
      <v-button-collapse v-model="accordion.isVisible3" block>
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion.isVisible3">
        <div class="p-8">
          {{ text[2] }}
        </div>
      </v-collapse>
    </v-card>
  </v-accordion>

  <!-- reference slot accordion -->

  <p class="mt-8 mb-4">Reference slot accordion</p>

  <v-accordion class="my-2">
    <v-card base="card-flat">
      <v-collapse>
        <template #reference="{ isOpen, onTrigger }">
          <v-button-collapse
            block
            base="button-plain"
            class="p-3"
            :switch="isOpen"
            v-on="onTrigger"
          >
            Toggle collapse
          </v-button-collapse>
        </template>
        <div class="p-8">
          {{ text[0] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card base="card-flat" class="my-2">
      <v-collapse>
        <template #reference="{ isOpen, onTrigger }">
          <v-button-collapse
            block
            base="button-plain"
            class="p-3"
            :switch="isOpen"
            v-on="onTrigger"
          >
            Toggle collapse
          </v-button-collapse>
        </template>
        <div class="p-8">
          {{ text[1] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card base="card-flat" class="my-2">
      <v-collapse>
        <template #reference="{ isOpen, onTrigger }">
          <v-button-collapse
            block
            base="button-plain"
            class="p-3"
            :switch="isOpen"
            v-on="onTrigger"
          >
            Toggle collapse
          </v-button-collapse>
        </template>
        <div class="p-8">
          {{ text[0] }}
        </div>
      </v-collapse>
    </v-card>
  </v-accordion>
</template>

<script>
import { reactive } from "vue";
import { text } from "../../../const";

export default {
  setup() {
    let accordion = reactive({
      isVisible: false,
      isVisible2: false,
      isVisible3: false,
    });

    return {
      accordion,
      text,
    };
  },
};
</script>
