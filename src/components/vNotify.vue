<template>
  <div :class="classes.notify.value">
    <!-- @slot default -->
    <slot
      name="default"
      v-bind="notifyData"
    >
      <div class="relative flex items-center">
        <div>
          <v-icon
            :name="notifyData.icon"
            :class="classes.icon.value"
          ></v-icon>
        </div>
        <div>
          <header v-if="notifyData.header" :class="classes.header.value">
            <!-- @slot header -->
            <slot
              name="header"
              v-if="notifyData.header"
              v-bind="notifyData"
            >
              {{ notifyData.header }}
            </slot>
          </header>
          <div>
            <!-- @slot content -->
            <slot
              name="content"
              v-bind="notifyData"
            >
              <div :class="classes.content.value">
                {{ notifyData.text }}
                <!-- @slot content-append -->
                <slot
                  name="content-append"
                  v-bind="notifyData"
                ></slot>
              </div>
            </slot>
          </div>
        </div>
        <v-close-button
          v-if="notifyData.dismissable"
          class="ml-auto"
          v-bind="closeButton"
          @click="emit('close-button-clicked', notifyData.id)"
        ></v-close-button>
      </div>
      <!-- @slot footer -->
      <slot
        name="footer"
        v-bind="notifyData"
      ></slot>
    </slot>
  </div>
</template>

<script setup>
import { inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles";
import vIcon from "./vIcon.vue"
import vCloseButton from "./vCloseButton.vue"
import { sharedProps, sharedModProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

let props = defineProps({
  ...sharedProps(),
  ...sharedModProps("notify", ["Notify", "Header", "Icon", "Content"]),
  notifyData: {
    type: Object,
    default: {},
  },
  closeButton: {
    type: Object,
    default: defaultProps("notify", "closeButton", {}),
  },
});

let emit = defineEmits(["close-button-clicked"]);

let { notify } = inject("mods", {});

let elements = {
  notify: null,
  header: null,
  icon: null,
  content: null,
};

let { classes } = useTailwindStyles(props, notify, elements);
</script>
