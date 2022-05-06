<template>
  <v-accordion>
    <v-card>
      <v-button-collapse block v-model="accordion.isVisible">
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion.isVisible">
        <div class="p-4">
          {{ text[0] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card class="mt-1">
      <v-button-collapse block v-model="accordion.isVisible2">
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion.isVisible2">
        <div class="p-4">
          {{ text[1] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card class="mt-1">
      <v-button-collapse block v-model="accordion.isVisible3">
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion.isVisible3">
        <div class="p-4">
          {{ text[2] }}
        </div>
      </v-collapse>
    </v-card>
  </v-accordion>

  <v-accordion class="mt-10">
    <v-card>
      <v-collapse>
        <template #reference="{ onTrigger }">
          <v-button-collapse block v-on="onTrigger">
            Toggle collapse
          </v-button-collapse>
        </template>
        <div class="p-4">
          {{ text[0] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card class="mt-1">
      <v-collapse>
        <template #reference="{ onTrigger }">
          <v-button-collapse block v-on="onTrigger">
            Toggle collapse
          </v-button-collapse>
        </template>
        <div class="p-4">
          {{ text[1] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card class="mt-1">
      <v-collapse>
        <template #reference="{ onTrigger }">
          <v-button-collapse block v-on="onTrigger">
            Toggle collapse
          </v-button-collapse>
        </template>
        <div class="p-4">
          {{ text[2] }}
        </div>
      </v-collapse>
    </v-card>
  </v-accordion>

  <!-- alternate style -->

  <v-accordion class="mt-10">
    <v-card name="card-flat">
      <v-button-collapse
        block
        v-model="accordion2.isVisible"
        name="button-plain"
        class="p-3"
      >
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion2.isVisible">
        <div class="p-4">
          {{ text[0] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card name="card-flat" class="mt-2">
      <v-button-collapse
        block
        v-model="accordion2.isVisible2"
        name="button-plain"
        class="p-3"
      >
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion2.isVisible2">
        <div class="p-4">
          {{ text[1] }}
        </div>
      </v-collapse>
    </v-card>

    <v-card name="card-flat" class="mt-2">
      <v-button-collapse
        block
        v-model="accordion2.isVisible3"
        name="button-plain"
        class="p-3"
      >
        Toggle collapse
      </v-button-collapse>
      <v-collapse v-model="accordion2.isVisible3">
        <div class="p-4">
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
      isVisible: true,
      isVisible2: false,
      isVisible3: false,
    });

    let accordion2 = reactive({
      isVisible: false,
      isVisible2: false,
      isVisible3: false,
    });

    return {
      accordion,
      accordion2,
      text,
    };
  },
};
</script>
