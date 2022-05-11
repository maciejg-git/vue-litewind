<template>
  <slot name="reference" :isOpen="isOpen" :onTrigger="onTrigger"></slot>

  <div class="overflow-hidden">
    <v-transition :name="transition">
      <div v-show="isOpen">
        <slot name="default"></slot>
      </div>
    </v-transition>
  </div>
</template>

<script>
// vue
import { ref, watch, onMounted, onUnmounted, inject } from "vue";
// components
import vTransition from "./vTransition.vue";

export default {
  components: {
    vTransition,
  },
  props: {
    modelValue: { type: Boolean, default: false },
    transition: { type: String, default: "fade-collapse" },
  },
  setup(props, { emit }) {
    let isOpen = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (value) => (isOpen.value = value)
    );

    let uncollapse = () => {
      isOpen.value = true;
      emit("update:modelValue", true);
    };

    let collapse = () => {
      isOpen.value = false;
      emit("update:modelValue", false);
    };

    let toggleCollapse = () => {
      isOpen.value ? collapse() : uncollapse();
    };

    let onTrigger = {
      click: toggleCollapse,
    };

    // accordion

    let accordion = inject("accordion", null);

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
      onTrigger,
    };
  },
};
</script>

<style scoped></style>
