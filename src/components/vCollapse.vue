<template>
  <div class="overflow-hidden">
    <v-transition :name="transition">
      <div v-show="isOpen">
        <slot name="default"></slot>
      </div>
    </v-transition>
  </div>
</template>

<script>
import { watch, toRef, onMounted, onUnmounted, inject } from "vue";
import vTransition from "./vTransition.vue"

export default {
  components: {
    vTransition,
  },
  props: {
    modelValue: { type: Boolean, default: false },
    transition: { type: String, default: "fade-collapse" },
  },
  setup(props, { emit }) {
    let accordion = inject("accordion", null);

    let isOpen = toRef(props, "modelValue");

    let collapse = () => emit("update:modelValue", false);

    let c = { isOpen, collapse };

    onMounted(() => {
      if (accordion) {
        watch(isOpen, () => accordion.update(c), {
          immediate: true,
        });
      }
    });

    onUnmounted(() => accordion && accordion.remove(c));

    return {
      isOpen,
    };
  },
};
</script>

<style scoped>
</style>
