<template>
  <!-- @slot reference -->
  <slot
    name="reference"
    :isOpen="isOpen"
    :onTrigger="onTrigger"
  ></slot>

  <div class="overflow-hidden">
    <v-transition :name="transition">
      <div v-show="isOpen">
        <!-- @slot default -->
        <slot name="default"></slot>
      </div>
    </v-transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, inject } from "vue";
import vTransition from "./vTransition.vue";
import { sharedProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

let props = defineProps({
  ...sharedProps(),
  modelValue: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: String,
    default: defaultProps("collapse", "transition", "fade-collapse"),
  },
});

const emit = defineEmits(["update:modelValue"]);

let isOpen = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    isOpen.value = value;
  }
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

let accordion = inject("_accordion", null);

let c = { isOpen, collapse };

onMounted(() => {
  if (accordion) {
    watch(isOpen, () => accordion.update(c), {
      immediate: true,
    });
  }
});

onUnmounted(() => accordion && accordion.remove(c));
</script>

<style scoped>
.fade-collapse-enter-active,
.fade-collapse-leave-active {
  transition: height var(--collapse-transition-duration) ease,
    opacity var(--collapse-transition-duration) ease;
  overflow: hidden;
}

.fade-collapse-enter-from,
.fade-collapse-leave-active {
  opacity: 0;
}
</style>
