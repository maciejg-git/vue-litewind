<template>
  <slot name="reference" v-bind="referenceSlotProps"></slot>

  <div class="overflow-hidden">
    <v-transition :name="transition">
      <div v-show="isOpen">
        <slot name="default"></slot>
      </div>
    </v-transition>
  </div>
</template>

<script>
import { ref, watch, onMounted, onUnmounted, inject } from "vue";
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
    let accordion = inject("accordion", null);

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

    let referenceSlotProps = { isOpen, onTrigger }

    // accordion

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
      referenceSlotProps,
    };
  },
};
</script>

<style scoped></style>
