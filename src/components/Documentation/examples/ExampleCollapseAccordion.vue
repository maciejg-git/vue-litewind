<template>
  <!-- model collapse accordion -->

  <span>Model collapse accordion</span>

  <v-accordion class="my-4">
    <v-card>
      <v-button-collapse v-model="accordion.isVisible" block>
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion.isVisible">
        <div class="py-8 px-10">
          {{ text[0] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card class="mt-1">
      <v-button-collapse v-model="accordion.isVisible2" block>
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion.isVisible2">
        <div class="py-8 px-10">
          {{ text[1] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card class="mt-1">
      <v-button-collapse v-model="accordion.isVisible3" block>
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion.isVisible3">
        <div class="py-8 px-10">
          {{ text[2] }}
        </div>
      </v-collapse>
    </v-card>
  </v-accordion>

  <!-- reference slot accordion -->

  <span>Reference slot accordion</span>

  <v-accordion class="my-4">
    <v-card name="card-flat">
      <v-collapse>
        <template #reference="{ isOpen, onTrigger }">
          <v-button-collapse
            block
            name="button-plain"
            class="p-3"
            :switch="isOpen"
            v-on="onTrigger"
          >
            Toggle collapse
          </v-button-collapse>
        </template>
        <div class="py-8 px-10">
          {{ text[0] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card name="card-flat" class="mt-2">
      <v-collapse>
        <template #reference="{ isOpen, onTrigger }">
          <v-button-collapse
            block
            name="button-plain"
            class="p-3"
            :switch="isOpen"
            v-on="onTrigger"
          >
            Toggle collapse
          </v-button-collapse>
        </template>
        <div class="py-8 px-10">
          {{ text[1] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card name="card-flat" class="mt-2">
      <v-collapse>
        <template #reference="{ isOpen, onTrigger }">
          <v-button-collapse
            block
            name="button-plain"
            class="p-3"
            :switch="isOpen"
            v-on="onTrigger"
          >
            Toggle collapse
          </v-button-collapse>
        </template>
        <div class="py-8 px-10">
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
