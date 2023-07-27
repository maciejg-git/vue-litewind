<template>
  <div
    class="fixed"
    @mouseenter="handleContainerMouseEnter"
    @mouseleave="handleContainerMouseLeave"
  >
    <ul class="w-full">
      <transition-group name="fade">
        <li
          v-for="notify in localNotifications"
          class="my-4 w-full"
          :key="notify.id"
        >
          <v-notify class="w-full">
            <slot
              name="default"
              v-bind="notify"
            >
              <slot name="header">
                <header>
                  {{ notify.header }}
                </header>
              </slot>
              <slot name="content" v-bind="notify">
                <div>
                  {{ notify.text }}
                </div>
              </slot>
              {{ notify.id }}
            </slot>
          </v-notify>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script setup>
import { computed, provide, inject } from "vue";
import useStyles from "./composition/use-styles";
import { sharedStyleProps } from "../shared-props";

let props = defineProps({
  ...sharedStyleProps("notify", ["Notify"]),
  direction: {
    type: String,
    default: "bottom",
  },
  delay: {
    type: Number,
    default: 4000,
  },
  dismissable: {
    type: Boolean,
    default: true,
  },
});

let { classes, states } = useStyles("notify", props, {
  notify: null,
});

let { notifications, options } = inject("notify");

let setNotifyComponentOptions = (options) => {
  options.delay = props.delay;
  options.dismissable = props.dismissable;
};

setNotifyComponentOptions(options);

let localNotifications = computed(() => {
  return props.direction === "bottom"
    ? notifications.value
    : notifications.value.toReversed();
});

let handleContainerMouseEnter = () => {
  notifications.value.forEach((i) => {
    i.pauseTimer();
  });
};

let handleContainerMouseLeave = () => {
  notifications.value.forEach((i) => {
    i.restartTimer();
  });
};

provide("notify-container", { classes, states })
</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all var(--popover-transition-duration) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  position: absolute;
}
</style>
