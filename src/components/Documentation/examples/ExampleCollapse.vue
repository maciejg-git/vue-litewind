<template>

  <!-- v-button-collapse -->

  <v-card class="p-1">
    <v-button-collapse block v-model="example.isVisible">
      Toggle collapse
    </v-button-collapse>
    <v-collapse v-model="example.isVisible">
      <div class="p-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
<!-- CUT START -->
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
<!-- CUT END -->
      </div>
    </v-collapse>
  </v-card>

  <!-- v-button -->

  <v-card class="p-1 mt-1">
    <v-button block @click="example.isVisible2 = !example.isVisible2">
      <span class="ml-auto">Toggle collapse 2</span>
      <v-chevron
        initial="down"
        rotate180
        counter-clockwise
        :switch="example.isVisible2"
        class="ml-auto"
      />
    </v-button>
    <v-collapse v-model="example.isVisible2">
      <div class="p-4">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
<!-- CUT START -->
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
<!-- CUT END -->
      </div>
    </v-collapse>
  </v-card>

  <!-- v-button-collapse (styled) -->

  <v-card class="p-1">
    <v-button-collapse
      block
      v-model="example.isVisible3"
      style-button="square small pink uppercase"
    >
      Toggle collapse
    </v-button-collapse>
    <v-collapse v-model="example.isVisible3">
      <div class="p-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
<!-- CUT START -->
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
<!-- CUT END -->
      </div>
    </v-collapse>
  </v-card>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    let example = reactive({
      isVisible: false,
      isVisible2: false,
      isVisible3: false,
    });

    return {
      example,
    };
  },
};
</script>
