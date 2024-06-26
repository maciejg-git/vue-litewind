<template>
  <transition
    :name="sidebarLeft ? transition + '-left' : transition + '-right'"
  >
    <aside
      v-show="isOpen"
      :class="classes.sidepanel.value"
      :style="{ width: width }"
      v-bind="$attrs"
    >
      <div
        v-if="!noHeader"
        class="flex w-full justify-between"
      >
        <div class="my-3 ml-5">
          <!-- @slot header -->
          <slot name="header"></slot>
        </div>
        <v-close-button
          v-if="showCloseButton"
          v-bind="closeButton"
          type="button"
          aria-label="Close"
          class="m-4"
          @click="handleClose"
        />
      </div>
      <!-- @slot default -->
      <div class="h-full overflow-y-scroll">
        <slot
          name="default"
          :close="close"
        ></slot>
      </div>
    </aside>
  </transition>

  <transition name="fade-backdrop">
    <v-backdrop
      v-if="modal"
      :isOpen="isOpen"
      v-bind="backdrop"
      @click="close()"
    />
  </transition>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { ref, computed, watch, onBeforeUnmount, useAttrs, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles";
import vCloseButton from "./vCloseButton.vue";
import vBackdrop from "./vBackdrop.vue";
import { sharedProps, sharedModProps } from "../shared-props";
import { defaultProps } from "../defaultProps";
import { registerListener, removeListener } from "./composition/use-trigger";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("sidepanel", ["Sidepanel"]),
  modelValue: {
    type: Boolean,
    default: false,
  },
  showCloseButton: {
    type: Boolean,
    default: defaultProps("sidepanel", "showCloseButton", true),
  },
  sidebarLeft: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: defaultProps("sidepanel", "width", "320px"),
  },
  modal: {
    type: Boolean,
    default: defaultProps("sidepanel", "modal", false),
  },
  noHeader: {
    type: Boolean,
    default: defaultProps("sidepanel", "noHeader", false),
  },
  closeButton: {
    type: Object,
    default: defaultProps("sidepanel", "closeButton", {}),
  },
  backdrop: {
    type: Object,
    default: defaultProps("sidepanel", "backdrop", {}),
  },
  transition: {
    type: String,
    default: defaultProps("sidepanel", "transition", "fade-slide"),
  },
});

let emit = defineEmits(["update:modelValue"]);

let attrs = useAttrs();

let { sidepanel } = inject("mods", {});

let elements = {
  sidepanel: {
    fixed: "fixed h-full top-0 z-[31]",
    computed: computed(() => (props.sidebarLeft ? "left-0" : "right-0")),
  },
};

let { classes } = useTailwindStyles(props, sidepanel, elements);

let isOpen = ref(false);

let open = () => {
  isOpen.value = true;
  if (props.modal) {
    document.body.style.overflowY = "hidden";
  }
  emit("update:modelValue", true);
};

let close = () => {
  isOpen.value = false;
  if (props.modal) {
    document.body.style.overflowY = null;
  }
  emit("update:modelValue", false);
};

let toggle = () => {
  if (!isOpen.value) {
    open();
  } else {
    close();
  }
};

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      open();
    } else {
      close();
    }
  },
  { immediate: true }
);

// trigger by id

let onTrigger = { click: toggle };

let { id } = attrs;

if (id) {
  registerListener(id, { onTrigger });

  onBeforeUnmount(() => removeListener(id));
}

// handle template events

let handleClose = () => {
  close();
};
</script>

<style scoped lang="postcss">
.fade-slide-right-enter-active,
.fade-slide-right-leave-active {
  transition: opacity var(--sidepanel-transition-duration) ease,
    transform var(--sidepanel-transition-duration) ease;
}
.fade-slide-right-enter-from,
.fade-slide-right-leave-to {
  opacity: 0;
  transform: translateX(200px);
}

.fade-slide-left-enter-active,
.fade-slide-left-leave-active {
  transition: opacity var(--sidepanel-transition-duration) ease,
    transform var(--sidepanel-transition-duration) ease;
}
.fade-slide-left-enter-from,
.fade-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}
</style>
