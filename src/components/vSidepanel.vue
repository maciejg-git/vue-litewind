<template>
  <transition
    :name="sidebarLeft ? transition + '-left' : transition + '-right'"
  >
    <div
      v-show="isOpen"
      :class="classes.sidepanel.value"
      :style="{ width: width }"
    >
      <div v-if="!noHeader" class="fixed-header">
        <div class="my-3 ml-5">
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
      <slot name="default" :close="close"></slot>
    </div>
  </transition>
</template>

<script>
// vue
import { ref, computed, watch, onBeforeUnmount } from "vue";
// composition
import useStyles from "./composition/use-styles";
// components
import vCloseButton from "./vCloseButton.vue";
// props
import { sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";
// trigger
import { registerListener, removeListener } from "../trigger";

export default {
  props: {
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
    noHeader: {
      type: Boolean,
      default: defaultProps("sidepanel", "noHeader", false),
    },
    closeButton: {
      type: Object,
      default: defaultProps("sidepanel", "closeButton", {}),
    },
    transition: {
      type: String,
      default: defaultProps("sidepanel", "transition", "fade-slide-m"),
    },
    styleSidepanel: {
      type: String,
      default: defaultProps("sidepanel", "styleSidepanel", ""),
    },
    ...sharedStyleProps("sidepanel"),
  },
  components: {
    vCloseButton,
  },
  setup(props, { emit, attrs }) {
    let { classes } = useStyles("sidepanel", props, {
      sidepanel: {
        fixed: "fixed-sidepanel",
        prop: computed(() => (props.sidebarLeft ? "left-0" : "right-0")),
      },
      closeButton: null,
    });

    let isOpen = ref(false)

    watch(() => props.modelValue,
      (value) => {
        if (value) open()
        else close()
      }
    )

    let open = () => {
      isOpen.value = true
      emit("update:modelValue", true)
    }

    let close = () => {
      isOpen.value = false
      emit("update:modelValue", false);
    }

    let toggle = () => {
      if (!isOpen.value) open()
      else close()
    }

    // trigger by id

    let onTrigger = { click: toggle }

    let { id } = attrs

    if (id) {
      registerListener(id, { onTrigger })

      onBeforeUnmount(() => removeListener(id))
    }

    // handle template events

    let handleClose = () => close();

    return {
      classes,
      isOpen,
      close,
      handleClose,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-sidepanel {
  @apply fixed h-full top-0 z-20;
}
.fixed-header {
  @apply flex justify-between w-full;
}

.fade-slide-f-right-enter-active,
.fade-slide-f-right-leave-active {
  transition: opacity 0.2s ease, transform 0.3s ease;
}
.fade-slide-f-right-enter-from,
.fade-slide-f-right-leave-to {
  opacity: 0;
  transform: translateX(200px);
}

.fade-slide-m-right-enter-active,
.fade-slide-m-right-leave-active {
  transition: opacity 0.3s ease, transform 0.4s ease;
}
.fade-slide-m-right-enter-from,
.fade-slide-m-right-leave-to {
  opacity: 0;
  transform: translateX(200px);
}

.fade-slide-s-right-enter-active,
.fade-slide-s-right-leave-active {
  transition: opacity 0.35s ease, transform 0.45s ease;
}
.fade-slide-s-right-enter-from,
.fade-slide-s-right-leave-to {
  opacity: 0;
  transform: translateX(200px);
}

.fade-slide-f-left-enter-active,
.fade-slide-f-left-leave-active {
  transition: opacity 0.2s ease, transform 0.3s ease;
}
.fade-slide-f-left-enter-from,
.fade-slide-f-left-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}

.fade-slide-m-left-enter-active,
.fade-slide-m-left-leave-active {
  transition: opacity 0.3s ease, transform 0.4s ease;
}
.fade-slide-m-left-enter-from,
.fade-slide-m-left-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}

.fade-slide-s-left-enter-active,
.fade-slide-s-left-leave-active {
  transition: opacity 0.35s ease, transform 0.45s ease;
}
.fade-slide-s-left-enter-from,
.fade-slide-s-left-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}
</style>
