<template>
  <div>
    <v-badge style-badge="secondary" class="mr-4">
      New
      <v-badge style-badge="tiny success" class="ml-2">7</v-badge>
    </v-badge>
    <v-badge class="mr-4">New</v-badge>
    <v-badge style-badge="small warn" class="mr-4">New</v-badge>
    <v-badge style-badge="tiny success" class="mr-4">New</v-badge>
  </div>

  <!-- positioned badges -->

  <div class="mt-10">
    <v-button class="relative mr-6">
      badge button
      <v-badge position="top-right" style-badge="primary tiny danger">
        2
      </v-badge>
    </v-button>

    <v-button class="relative mr-6">
      badge button
      <v-badge position="top-right" style-badge="circle danger"></v-badge>
    </v-button>
  </div>

  <!-- custom position badge -->

  <div class="mt-10">
    <v-button class="relative">
      badge button (custom)
      <v-badge
        style-badge="primary tiny danger"
        class="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2"
      >
        9
      </v-badge>
    </v-button>
  </div>

  <p class="my-6">Animated badges</p>

  <div>
    <v-badge
      style-badge="small secondary"
      update-animation="scale-up"
      :update-key="example"
      class="mr-10"
    >
      {{ example }}
    </v-badge>
    <v-badge
      style-badge="small secondary"
      update-animation="bounce"
      :update-key="example"
      class="mr-10"
    >
      {{ example }}
    </v-badge>
    <v-badge
      style-badge="small secondary"
      update-animation="to-danger"
      :update-key="example"
      class="mr-10"
    >
      {{ example }}
    </v-badge>
    <v-badge
      style-badge="small secondary"
      update-animation="to-success"
      :update-key="example"
      class="mr-10"
    >
      {{ example }}
    </v-badge>
  </div>
  <div class="mt-10">
    <v-button @click="example = (Math.random() * 100).toFixed()">
      Update badge value
    </v-button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let example = ref(4);

    return {
      example,
    };
  },
};
</script>
