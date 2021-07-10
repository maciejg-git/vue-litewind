<template>
  <transition :name="transition" @after-leave="resetScrollbar">
    <div
      v-if="modelValue"
      :style="{ 'padding-right': scrollbarWidth }"
      class="fixed inset-0 z-20 overflow-y-auto"
      @click.self="handleBackdropClick"
    >
      <div :class="classes.container.value">
        <div :class="classes.modal.value">
          <header :class="classes.header.value">
            {{ title }}
            <v-close-button
              v-if="!noCloseButton"
              @click="close"
            ></v-close-button>
          </header>
          <main :class="classes.content.value">
            <slot name="default"></slot>
          </main>
          <footer :class="classes.footer.value">
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
</template>

<script>
import { ref, computed, watch, getCurrentInstance } from "vue";
import vButton from "./vButton.vue";
import vCloseButton from "./vCloseButton.vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: Boolean, default: undefined },
    title: { type: String, default: undefined },
    noPrimaryButton: { type: Boolean, default: false },
    noSecondaryButton: { type: Boolean, default: false },
    primaryButtonStyle: { type: String, default: "primary noMargin" },
    secondaryButtonStyle: { type: String, default: "secondary noMargin" },
    primaryButtonLabel: { type: String, default: "Accept" },
    secondaryButtonLabel: { type: String, default: "Close" },
    primaryButtonClose: { type: Boolean, default: false },
    secondaryButtonClose: { type: Boolean, default: false },
    noCloseButton: { type: Boolean, default: false },
    staticBackdrop: { type: Boolean, default: false },
    position: { type: String, default: "top" },
    size: { type: String, default: "md" },
    transition: { type: String, default: "fade-slide" },
    name: { type: String, default: "modal" },
    theme: { type: String, default: "default" },
    styleModal: { type: String, default: "default" },
    styleHeader: { type: String, default: "default" },
    styleFooter: { type: String, default: "default" },
    styleContent: { type: String, default: "default" },
    styleBackdrop: { type: String, default: "default" },
  },
  components: {
    vButton,
    vCloseButton,
  },
  emits: [
    "input:primaryButtonClick",
    "input:secondaryButtonClick",
    "update:modelValue",
  ],
  setup(props, { emit }) {
    let elements = ["modal", "header", "footer", "content", "backdrop"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClass = {
      container: [
        "flex",
        "relative",
        "w-full",
        "min-h-full",
        "mx-auto",
        "py-6",
        "px-6",
        "md:px-0",
        "pointer-events-none",
      ],
      modal: ["relative", "flex-1", "overflow-auto", "pointer-events-auto"],
      header: ["flex", "items-center", "justify-between"],
      footer: ["flex", "justify-end"],
      backdrop: ["fixed", "inset-0", "overflow-y-auto", "min-h-screen"],
    };

    let classes = {
      container: computed(() => {
        let position =
          props.position == "top"
            ? ["items-start"]
            : props.position == "center"
            ? ["items-center"]
            : ["items-start"];
        let size =
          props.size == "xl"
            ? "md:w-10/12"
            : props.size == "lg"
            ? "md:w-8/12"
            : props.size == "md"
            ? "md:w-6/12"
            : props.size == "sm"
            ? "md:w-4/12"
            : "md:w-6/12";
        return [...fixedClass.container, ...position, size];
      }),
      modal: computed(() => {
        let c = [...fixedClass.modal, ...styles.modal.value];
        return removeTailwindClasses(c);
      }),
      header: computed(() => {
        let c = [...fixedClass.header, ...styles.header.value];
        return removeTailwindClasses(c);
      }),
      footer: computed(() => {
        let c = [...fixedClass.footer, ...styles.footer.value];
        return removeTailwindClasses(c);
      }),
      content: computed(() => {
        let c = [...styles.content.value];
        return removeTailwindClasses(c);
      }),
      backdrop: computed(() => {
        let c = [...fixedClass.backdrop, ...styles.backdrop.value];
        return removeTailwindClasses(c);
      }),
    };

    let scrollbarWidth = ref(0);

    let getScrollBarWidth = () =>
      window.innerWidth - document.documentElement.clientWidth;

    let removeScrollbar = () => {
      scrollbarWidth.value = getScrollBarWidth();
      if (scrollbarWidth.value > 0) {
        document.body.classList.add("overflow-y-hidden");
        document.body.style.paddingRight = scrollbarWidth.value + "px";
      }
    };

    let resetScrollbar = () => {
      document.body.classList.remove("overflow-y-hidden");
      document.body.style.paddingRight = null;
    };

    watch(
      () => props.modelValue,
      (v) => {
        if (v) removeScrollbar()
      }
    );

    let a = 0;

    let close = function () {
      emit("update:modelValue", false);
    };

    let handleBackdropClick = function () {
      if (props.staticBackdrop) return;
      close();
    };

    let handlePrimaryButtonClick = function () {
      emit("input:primaryButtonClick");
      if (props.primaryButtonClose) close();
    };

    let handleSecondaryButtonClick = function () {
      emit("input:secondaryButtonClick");
      if (props.secondaryButtonClose) close();
    };

    return {
      classes,
      scrollbarWidth,
      resetScrollbar,
      close,
      handleBackdropClick,
      handlePrimaryButtonClick,
      handleSecondaryButtonClick,
    };
  },
};
</script>

<style scoped>
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
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  transform: scale(0.96);
  opacity: 0;
}
</style>
