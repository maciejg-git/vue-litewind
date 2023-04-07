<template>
  <teleport to="body">
    <transition
      :name="transition"
      @after-leave="resetScrollbar"
    >
      <div
        v-if="isOpen"
        v-bind="$attrs"
        class="fixed inset-0 z-[31] overflow-y-auto"
        role="dialog"
        tabindex="0"
        @click="handleClickBackdrop"
        @keydown.esc="handleKeydown('esc')"
        v-focus
        aria-modal="true"
      >
        <div :class="containerClasses">
          <div
            :class="classes.modal.value"
            ref="trapRef"
            @click.stop
          >
          <!-- @slot modal -->
            <slot
              name="modal"
              :close="close"
            >
              <header
                v-if="!noHeader"
                :class="classes.header.value"
              >
              <!-- @slot header -->
                <slot name="header">
                  <span>
                    {{ title }}
                  </span>
                </slot>
                <v-close-button
                  v-if="!noCloseButton"
                  v-bind="closeButton"
                  @click="handleClickCloseButton"
                />
              </header>
              <main :class="classes.content.value">
                <!-- @slot default -->
                <slot name="default"></slot>
              </main>
              <footer
                v-if="!noFooter"
                :class="classes.footer.value"
              >
              <!-- @slot footer -->
                <slot name="footer">
                  <v-button
                    v-if="!noSecondaryButton"
                    aria-label="Cancel button"
                    v-bind="secondaryButton"
                    class="mx-2"
                    @click="handleSecondaryButtonClick"
                  >
                    {{ secondaryButtonLabel }}
                  </v-button>
                  <v-button
                    v-if="!noPrimaryButton"
                    aria-label="OK button"
                    v-bind="primaryButton"
                    class="mx-2"
                    @click="handlePrimaryButtonClick"
                  >
                    {{ primaryButtonLabel }}
                  </v-button>
                </slot>
              </footer>
            </slot>
          </div>
        </div>
      </div>
    </transition>

    <v-backdrop :isOpen="isOpen" />
  </teleport>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { ref, computed, watch, onBeforeUnmount, useAttrs } from "vue";
import useStyles from "./composition/use-styles";
import useFocusTrap from "./composition/use-focus-trap"
import vButton from "./vButton.vue";
import vCloseButton from "./vCloseButton.vue";
import vBackdrop from "./vBackdrop.vue";
import { default as vFocus } from "../directives/focus";
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";
import { registerListener, removeListener } from "../trigger";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("modal"),
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  title: {
    type: String,
    default: undefined,
  },
  noPrimaryButton: {
    type: Boolean,
    default: false,
  },
  noSecondaryButton: {
    type: Boolean,
    default: false,
  },
  primaryButton: {
    type: Object,
    default: {
      styleButton: "primary",
    },
  },
  secondaryButton: {
    type: Object,
    default: {
      styleButton: "secondary",
    },
  },
  primaryButtonLabel: {
    type: String,
    default: defaultProps("modal", "primaryButtonLabel", "Accept"),
  },
  secondaryButtonLabel: {
    type: String,
    default: defaultProps("modal", "secondaryButtonLabel", "Close"),
  },
  primaryButtonClose: {
    type: Boolean,
    default: false,
  },
  secondaryButtonClose: {
    type: Boolean,
    default: false,
  },
  justifyButtons: {
    type: String,
    default: defaultProps("modal", "justifyButtons", "end"),
  },
  noCloseButton: {
    type: Boolean,
    default: false,
  },
  staticBackdrop: {
    type: Boolean,
    default: false,
  },
  noHeader: {
    type: Boolean,
    default: defaultProps("modal", "noHeader", false),
  },
  noFooter: {
    type: Boolean,
    default: defaultProps("modal", "noFooter", false),
  },
  position: {
    type: String,
    default: defaultProps("modal", "position", "top"),
  },
  size: {
    type: String,
    default: defaultProps("modal", "size", "md"),
  },
  closeButton: {
    type: Object,
    default: defaultProps("modal", "closeButton", {}),
  },
  transition: {
    type: String,
    default: defaultProps("modal", "transition", "fade-slide"),
  },
  styleModal: {
    type: String,
    default: defaultProps("modal", "styleModal", ""),
  },
  styleHeader: {
    type: String,
    default: defaultProps("modal", "styleHeader", ""),
  },
  styleFooter: {
    type: String,
    default: defaultProps("modal", "styleFooter", ""),
  },
  styleContent: {
    type: String,
    default: defaultProps("modal", "styleContent", ""),
  },
});

const emit = defineEmits([
  "input:primary-button-click",
  "input:secondary-button-click",
  "update:modelValue",
  "input:static-backdrop-click",
]);

const attrs = useAttrs();

let { classes } = useStyles("modal", props, {
  modal: {
    fixed: "flex-1 relative overflow-auto",
  },
  header: {
    fixed: "flex items-center justify-between",
  },
  footer: {
    fixed: "flex",
    prop: computed(() => footerClasses[props.justifyButtons]),
  },
  content: null,
});

let containerClasses = computed(() => {
  return [
    "flex relative min-h-full mx-auto py-6 px-6 md:px-0",
    {
      "md:w-4/12": props.size === "sm",
      "md:w-6/12": props.size === "md",
      "md:w-8/12": props.size === "lg",
      "md:w-10/12": props.size === "xl",
      "md:w-max": props.size === "fit",
      "items-start": props.position === "top",
      "items-center": props.position === "center",
      "items-end": props.position === "bottom",
    }
  ];
});

const footerClasses = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

// remove scrollbar and add some padding to avoid shifting modal window
// when opening

let getScrollBarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

let removeScrollbar = () => {
  let scrollbarWidth = getScrollBarWidth();

  if (scrollbarWidth > 0) {
    document.body.style.overflowY = "hidden";
    document.body.style.paddingRight = scrollbarWidth + "px";
  }
};

let resetScrollbar = () => {
  document.body.style.overflowY = null;
  document.body.style.paddingRight = null;
};

// control visibility

let isOpen = ref(false);

watch(
  () => props.modelValue,
  (value) => {
    if (value) open();
    else close();
  }
);

let open = () => {
  isOpen.value = true;
  removeScrollbar();
  emit("update:modelValue", true);
};

let close = () => {
  isOpen.value = false;
  emit("update:modelValue", false);
};

// trigger by id

let onTrigger = { click: open };

let { id } = attrs;

if (id) {
  registerListener(id, { onTrigger });

  onBeforeUnmount(() => removeListener(id));
}

// focus trap

let trapRef = ref(null)
useFocusTrap(trapRef)

// handle template events

let handleClickBackdrop = () => {
  if (props.staticBackdrop) {
    emit("input:static-backdrop-click");
    return;
  }
  close();
};

let handleClickCloseButton = () => {
  close();
};

let handlePrimaryButtonClick = () => {
  if (props.primaryButtonClose) close();
  emit("input:primary-button-click");
};

let handleSecondaryButtonClick = () => {
  if (props.secondaryButtonClose) close();
  emit("input:secondary-button-click");
};

let handleKeydown = (key) => {
  close();
};
</script>

<style scoped lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--modal-transition-duration) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity var(--modal-transition-duration) ease,
    transform var(--modal-transition-duration) ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity var(--modal-transition-duration) ease,
    transform var(--modal-transition-duration) ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  transform: scale(0.96);
  opacity: 0;
}
</style>
