<template>
  <teleport to="body">
    <transition :name="transition" @after-leave="resetScrollbar">
      <div
        v-if="isOpen"
        v-bind="$attrs"
        class="fixed-main"
        role="dialog"
        tabindex="0"
        @click.self="handleBackdropClick"
        @keydown.esc="handleKeydown"
        v-focus
      >
        <div :class="containerClasses">
          <div :class="classes.modal.value">
            <slot name="modal" :close="close">
              <header v-if="!noHeader" :class="classes.header.value">
                <slot name="header">
                  <span>
                    {{ title }}
                  </span>
                </slot>
                <v-close-button
                  v-if="!noCloseButton"
                  v-bind="closeButton"
                  @click="close"
                />
              </header>
              <main :class="classes.content.value">
                <slot name="default"></slot>
              </main>
              <footer v-if="!noFooter" :class="classes.footer.value">
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

    <transition name="fade-backdrop">
      <div v-if="isOpen" :class="classes.backdrop.value"></div>
    </transition>
  </teleport>
</template>

<script>
// vue
import { ref, computed, watch, onBeforeUnmount } from "vue";
// composition
import useStyles from "./composition/use-styles";
// components
import vButton from "./vButton.vue";
import vCloseButton from "./vCloseButton.vue";
// directives
import focus from "../directives/focus";
// props
import { sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";
// trigger
import { registerListener, removeListener } from "../trigger";

export default {
  props: {
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
      default: defaultProps("modal", "transition", "fade-slide-m"),
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
    styleBackdrop: {
      type: String,
      default: defaultProps("modal", "styleBackdrop", ""),
    },
    ...sharedStyleProps("modal"),
  },
  components: {
    vButton,
    vCloseButton,
  },
  directives: {
    focus,
  },
  emits: [
    "input:primaryButtonClick",
    "input:secondaryButtonClick",
    "update:modelValue",
  ],
  inheritAttrs: false,
  setup(props, { emit, attrs }) {
    let { classes } = useStyles("modal", props, {
      modal: {
        fixed: "fixed-modal",
      },
      header: {
        fixed: "fixed-header",
      },
      footer: {
        fixed: "fixed-footer",
        prop: computed(() => footerClasses[props.justifyButtons]),
      },
      content: null,
      backdrop: {
        fixed: "fixed-backdrop",
      },
    });

    let containerClasses = computed(() => {
      return [
        "fixed-container",
        sizeClasses[props.size],
        positionClasses[props.position],
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

    const positionClasses = {
      top: "items-start",
      center: "items-center",
      bottom: "items-end",
    };

    const sizeClasses = {
      sm: "md:w-4/12",
      md: "md:w-6/12",
      lg: "md:w-8/12",
      xl: "md:w-10/12",
      fit: "md:w-max",
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

    // handle template events

    let handleBackdropClick = () => {
      if (props.staticBackdrop) {
        emit("input:static-backdrop-click");
        return;
      }
      close();
    };

    let handleClickCloseButton = () => close();

    let handlePrimaryButtonClick = () => {
      if (props.primaryButtonClose) close();
      emit("input:primary-button-click");
    };

    let handleSecondaryButtonClick = () => {
      if (props.secondaryButtonClose) close();
      emit("input:secondary-button-click");
    };

    let handleKeydown = () => close();

    return {
      classes,
      containerClasses,
      resetScrollbar,
      isOpen,
      close,
      handleBackdropClick,
      handleClickCloseButton,
      handlePrimaryButtonClick,
      handleSecondaryButtonClick,
      handleKeydown,
    };
  },
};
</script>

<style>
@import "../styles/transitions.css";
</style>

<style scoped lang="postcss">
.fixed-main {
  @apply fixed inset-0 z-[31] overflow-y-auto;
}
.fixed-container {
  @apply flex relative min-h-full mx-auto py-6 px-6 md:px-0 pointer-events-none;
}
.fixed-modal {
  @apply flex-1 relative overflow-auto pointer-events-auto;
}
.fixed-footer {
  @apply flex;
}
.fixed-header {
  @apply flex items-center justify-between;
}
.fixed-backdrop {
  @apply fixed inset-0 overflow-y-auto min-h-screen z-30;
}

.fade-backdrop-enter-active,
.fade-backdrop-leave-active {
  transition: opacity 0.2s ease;
}
.fade-backdrop-enter-from,
.fade-backdrop-leave-to {
  opacity: 0;
}
</style>
