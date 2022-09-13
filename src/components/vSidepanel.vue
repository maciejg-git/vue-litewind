<template>
  <transition
    :name="sidebarLeft ? transition + '-left' : transition + '-right'"
  >
    <div
      v-show="isOpen"
      :class="classes.sidepanel.value"
      :style="{ width: width }"
    >
      <div v-if="!noHeader" class="flex justify-between w-full">
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
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";
// trigger
import { registerListener, removeListener } from "../trigger";

export default {
  props: {
    ...sharedProps(),
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
      default: defaultProps("sidepanel", "transition", "fade-slide"),
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
        fixed: "fixed h-full top-0 z-20",
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
.fade-slide-right-enter-active,
.fade-slide-right-leave-active {
  transition: opacity var(--sidepanel-transition-duration) ease, transform var(--sidepanel-transition-duration) ease;
}
.fade-slide-right-enter-from,
.fade-slide-right-leave-to {
  opacity: 0;
  transform: translateX(200px);
}

.fade-slide-left-enter-active,
.fade-slide-left-leave-active {
  transition: opacity var(--sidepanel-transition-duration) ease, transform var(--sidepanel-transition-duration) ease;
}
.fade-slide-left-enter-from,
.fade-slide-left-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}
</style>
