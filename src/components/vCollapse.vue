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
// props
import { defaultProps } from "../defaultProps";

export default {
  components: {
    vTransition,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: defaultProps("collapse", "transition", "fade-collapse"),
    },
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

<style scoped>
.fade-collapse-enter-active,
.fade-collapse-leave-active {
  transition: height var(--collapse-transition-duration) ease, opacity var(--collapse-transition-duration) ease;
  overflow: hidden;
}

.fade-collapse-enter-from,
.fade-collapse-leave-active {
  opacity: 0;
}
</style>
