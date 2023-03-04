<template>
  <v-accordion>
    <v-collapse>
      <template #reference="{ isOpen, onTrigger }">
        <v-button v-on="onTrigger">Toggle collapse</v-button>
      </template>
      <div>accordion content</div>
    </v-collapse>

    <v-collapse>
      <template #reference="{ isOpen, onTrigger }">
        <v-button v-on="onTrigger">Toggle collapse 2</v-button>
      </template>
      <div>accordion content 2</div>
    </v-collapse>

    <v-collapse>
      <template #reference="{ isOpen, onTrigger }">
        <v-button v-on="onTrigger">Toggle collapse 3</v-button>
      </template>
      <div>accordion content 3</div>
    </v-collapse>
  </v-accordion>
</template>

<script setup>
import vAccordion from "../../components/vAccordion.vue"
import vButton from "../../components/vButton.vue"
import vCollapse from "../../components/vCollapse.vue"
</script>
