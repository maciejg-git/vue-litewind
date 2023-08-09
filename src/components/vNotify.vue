<template>
<div :class="classes.notify.value">
  <slot
  name="default"
  v-bind="notify"
  >
  <div class="relative flex items-center">
    <div>
      <v-icon :name="notify.icon" :class="classes.icon.value"></v-icon>
    </div>
    <div>
      <header :class="classes.header.value">
        <slot name="header" v-if="notify.header" v-bind="notify">
        {{ notify.header }}
        </slot>
      </header>
      <div>
        <slot name="content" v-bind="notify">
        <div :class="classes.content.value">
          {{ notify.text }}
        <slot name="content-append" v-bind="notify"></slot>
        </div>
        </slot>
      </div>
    </div>
    <v-close-button v-if="notify.dismissable" class="ml-auto" v-bind="closeButton" @click="emit('close-button-clicked', notify.id)"></v-close-button>
  </div>
  <slot name="footer" v-bind="notify"></slot>
  </slot>
</div>
</template>

<script setup>
import { inject } from "vue"
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

let props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("notify", ["Notify", "Header", "Icon", "Content"]),
  notify: {
    type: Object,
    default: {},
  },
  closeButton: {
    type: Object,
    default: defaultProps("notify", "closeButton", {})
  },
})

let emit = defineEmits(['close-button-clicked'])

let { classes, states } = useStyles("notify", props, {
  notify: null,
  header: null,
  icon: null,
  content: null,
});
</script>
