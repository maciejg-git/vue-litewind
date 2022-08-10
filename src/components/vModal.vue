<template>
  <teleport to="body">
    <transition :name="transition" @after-leave="resetScrollbar">
      <div
        v-if="modelValue"
        class="fixed-main"
        role="dialog"
        tabindex="0"
        @click.self="handleBackdropClick"
        @keydown.esc="handleKeydown"
        v-focus
      >
        <div :class="classes.container.value">
          <div :class="classes.modal.value">
            <header v-if="!noHeader" :class="classes.header.value">
              <slot name="header">
                <span>
                  {{ title }}
                </span>
              </slot>
              <v-close-button
                v-if="!noCloseButton"
                v-bind="closeButton"
                @click="closeModal"
              />
            </header>
            <main :class="classes.content.value">
              <v-close-button
                v-if="noHeader && closeButtonInContent"
                class="absolute top-6 right-6"
                @click="handleClickCloseButton"
              />
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
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade-backdrop">
      <div v-if="modelValue" :class="classes.backdrop.value"></div>
    </transition>
  </teleport>
</template>

<script>
// vue
import { computed, watch } from "vue";
// composition
import useStyles from "./composition/use-styles";
// components
import vButton from "./vButton.vue";
import vCloseButton from "./vCloseButton.vue";
// directives
import focus from "../directives/focus";
// props
import { sharedStyleProps } from "../shared-props";
// style
import "../styles/transitions.css";

export default {
  props: {
    modelValue: { type: Boolean, default: undefined },
    title: { type: String, default: undefined },
    noPrimaryButton: { type: Boolean, default: false },
    noSecondaryButton: { type: Boolean, default: false },
    primaryButton: { type: Object, default: { styleButton: "primary" } },
    secondaryButton: { type: Object, default: { styleButton: "secondary" } },
    primaryButtonLabel: { type: String, default: "Accept" },
    secondaryButtonLabel: { type: String, default: "Close" },
    primaryButtonClose: { type: Boolean, default: false },
    secondaryButtonClose: { type: Boolean, default: false },
    justifyButtons: { type: String, default: "end" },
    noCloseButton: { type: Boolean, default: false },
    closeButtonInContent: { type: Boolean, default: false },
    staticBackdrop: { type: Boolean, default: false },
    noHeader: { type: Boolean, default: false },
    noFooter: { type: Boolean, default: false },
    position: { type: String, default: "top" },
    size: { type: String, default: "md" },
    closeButton: { type: Object, default: {} },
    transition: { type: String, default: "fade-slide-m" },
    styleModal: { type: String, default: "" },
    styleHeader: { type: String, default: "" },
    styleFooter: { type: String, default: "" },
    styleContent: { type: String, default: "" },
    styleBackdrop: { type: String, default: "" },
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
  setup(props, { emit }) {
    let { classes } = useStyles("modal", props, {
      modal: {
        fixed: "fixed-modal",
      },
      header: {
        fixed: "fixed-header",
      },
      footer: {
        fixed: "fixed-footer",
        prop: computed(() => classesFooter[props.justifyButtons]),
      },
      content: null,
      backdrop: {
        fixed: "fixed-backdrop",
      },
    });

    classes.container = computed(() => {
      return [
        "fixed-container",
        classesSize[props.size],
        classesPosition[props.position],
      ];
    });

    const classesFooter = {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    const classesPosition = {
      top: "items-start",
      center: "items-center",
    };

    const classesSize = {
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

    watch(
      () => props.modelValue,
      (value) => value && removeScrollbar()
    );

    let closeModal = () => emit("update:modelValue", false);

    // handle template events

    let handleBackdropClick = () => {
      if (props.staticBackdrop) {
        emit("input:static-backdrop-click");
        return;
      }
      closeModal();
    };

    let handleClickCloseButton = () => closeModal();

    let handlePrimaryButtonClick = () => {
      if (props.primaryButtonClose) closeModal();
      emit("input:primary-button-click");
    };

    let handleSecondaryButtonClick = () => {
      if (props.secondaryButtonClose) closeModal();
      emit("input:secondary-button-click");
    };

    let handleKeydown = () => closeModal();

    return {
      classes,
      resetScrollbar,
      closeModal,
      handleBackdropClick,
      handleClickCloseButton,
      handlePrimaryButtonClick,
      handleSecondaryButtonClick,
      handleKeydown,
    };
  },
};
</script>

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
