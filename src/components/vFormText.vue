<template>
  <div
    :class="[
      classes.formText.value,
      state === 'valid' && variants.formText.valid,
      state === 'invalid' && variants.formText.invalid,
    ]"
  >
    <transition-group :name="transition">
      <div
        v-for="(message, key) in text"
        :key="message"
      >
        <!-- @slot message -->
        <slot
          name="message"
          v-bind="{ message, key }"
        >
          {{ message }}
        </slot>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { computed, watch, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import { sharedProps, sharedModProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("formText", ["FormText"]),
  state: {
    type: String,
    default: "",
  },
  messages: {
    type: Object,
    default: {},
  },
  singleLineMessage: {
    type: Boolean,
    default: defaultProps("formtext", "singleLineMessage", false),
  },
  transition: {
    type: String,
    default: defaultProps("formtext", "transition", "fade-scale"),
  },
});

let { formText } = inject("mods", {})

let elements = {
  formText: {
    externalVariants: ["variant"]
  },
}

let { classes, variants } = useTailwindStyles(props, formText, elements)

let text = computed(() => {
  if (props.state === "invalid") {
    if (props.messages.required) {
      return { required: props.messages.required };
    } else {
      if (props.singleLineMessage) {
        let [k, v] = Object.entries(props.messages)[0];
        return { k: v };
      }
      return props.messages;
    }
  }
});
</script>

<style scoped lang="postcss">
.fade-scale-move,
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scaleY(0.2);
}
.fade-scale-leave-active {
  display: none;
}

.fade-slide-down-move,
.fade-slide-down-enter-active,
.fade-slide-down-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top;
}
.fade-slide-down-enter-from,
.fade-slide-down-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-down-leave-active {
  display: none;
}
</style>
