<template>
  <teleport to="body">
    <transition :name="transition" @after-leave="resetScrollbar">
      <div
        v-if="modelValue"
        class="fixed-main"
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
                @click="closeModal"
              />
            </header>
            <main :class="classes.content.value">
              <v-close-button
                v-if="noHeader && closeButtonInContent"
                class="absolute top-6 right-6"
                @click="closeModal"
              />
              <slot name="default"></slot>
            </main>
            <footer v-if="!noFooter" :class="classes.footer.value">
              <slot name="footer">
                <v-button
                  v-if="!noSecondaryButton"
                  :style-button="secondaryButtonStyle"
                  @click="handleSecondaryButtonClick"
                >
                  {{ secondaryButtonLabel }}
                </v-button>
                <v-button
                  v-if="!noPrimaryButton"
                  :style-button="primaryButtonStyle"
                  class="ml-2"
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

    <transition name="fade">
      <div v-if="modelValue" :class="classes.backdrop.value"></div>
    </transition>
  </teleport>
</template>

<script>
import { ref, computed, watch } from "vue";
import vButton from "./vButton.vue";
import vCloseButton from "./vCloseButton.vue";
import focus from "../directives/focus"
import useStyles from "./composition/use-styles";

export default {
  props: {
    modelValue: { type: Boolean, default: undefined },
    title: { type: String, default: undefined },
    noPrimaryButton: { type: Boolean, default: false },
    noSecondaryButton: { type: Boolean, default: false },
    primaryButtonStyle: { type: String, default: "primary" },
    secondaryButtonStyle: { type: String, default: "secondary" },
    primaryButtonLabel: { type: String, default: "Accept" },
    secondaryButtonLabel: { type: String, default: "Close" },
    primaryButtonClose: { type: Boolean, default: false },
    secondaryButtonClose: { type: Boolean, default: false },
    noCloseButton: { type: Boolean, default: false },
    closeButtonInContent: { type: Boolean, default: false },
    staticBackdrop: { type: Boolean, default: false },
    noHeader: { type: Boolean, default: false },
    noFooter: { type: Boolean, default: false },
    position: { type: String, default: "top" },
    size: { type: String, default: "md" },
    transition: { type: String, default: "fade-slide" },
    name: { type: String, default: "modal" },
    styleModal: { type: String, default: "" },
    styleHeader: { type: String, default: "" },
    styleFooter: { type: String, default: "" },
    styleContent: { type: String, default: "" },
    styleBackdrop: { type: String, default: "" },
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
      },
      content: null,
      backdrop: {
        fixed: "fixed-backdrop",
      },
    });

    classes.container = computed(() => {
      let position = "items-start";
      if (props.position == "top") position = "items-start";
      else if (props.position == "center") position = "items-center";

      let size = "md:w-6/12";
      if (props.size == "xl") size = "md:w-10/12"
      else if (props.size == "lg") size = "md:w-8/12"
      else if (props.size == "md") size = "md:w-6/12"
      else if (props.size == "sm") size = "md:w-4/12"
      else if (props.size == "fit") size = "md:w-max"

      return ["fixed-container", size, position];
    });

    // remove scrollbar and add some padding to avoid shifting modal window
    // when opening
    let getScrollBarWidth = () => {
      return window.innerWidth - document.documentElement.clientWidth;
    }

    let removeScrollbar = () => {
      let scrollbarWidth = getScrollBarWidth();
      if (scrollbarWidth > 0) {
        document.body.style.overflowY = "hidden"
        document.body.style.paddingRight = scrollbarWidth + "px";
      }
    };

    let resetScrollbar = () => {
      document.body.style.overflowY = null;
      document.body.style.paddingRight = null;
    };

    watch(
      () => props.modelValue,
      (value) => value && removeScrollbar(),
    );

    let closeModal = () => emit("update:modelValue", false);

    let handleBackdropClick = () => {
      if (props.staticBackdrop) return;
      closeModal();
    };

    let handlePrimaryButtonClick = () => {
      if (props.primaryButtonClose) closeModal();
      emit("input:primaryButtonClick");
    };

    let handleSecondaryButtonClick = () => {
      if (props.secondaryButtonClose) closeModal();
      emit("input:secondaryButtonClick");
    };

    let handleKeydown = () => closeModal()

    return {
      classes,
      resetScrollbar,
      closeModal,
      handleBackdropClick,
      handlePrimaryButtonClick,
      handleSecondaryButtonClick,
      handleKeydown,
    };
  },
};
</script>

<style scoped lang="postcss">
.modal-z-31 {
  z-index: 31;
}

.fixed-main {
  @apply fixed inset-0 modal-z-31 overflow-y-auto;
}
.fixed-container {
  @apply flex relative min-h-full mx-auto py-6 px-6 md:px-0 pointer-events-none;
}
.fixed-modal {
  @apply flex-1 relative overflow-auto pointer-events-auto;
}
.fixed-footer {
  @apply flex justify-end;
}
.fixed-header {
  @apply flex items-center justify-between;
}
.fixed-backdrop {
  @apply fixed inset-0 overflow-y-auto min-h-screen z-30;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.15s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.2s ease, transform 0.15s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  transform: scale(0.96);
  opacity: 0;
}
</style>
