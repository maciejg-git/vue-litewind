<template>
  <ul
    class="fixed block"
    @mouseenter="handleContainerMouseEnter"
    @mouseleave="handleContainerMouseLeave"
  >
    <transition-group name="fade">
      <li
        v-for="item in localNotifications"
        class="w-full"
        :key="item.id"
      >
        <v-notify
          class="w-full"
          :notifyData="item"
          v-bind="item.props"
          @close-button-clicked="handleCloseButton"
        >
          <template
            v-for="(name, slot) of $slots"
            #[slot]="slotProps"
          >
            <slot
              :name="slot"
              v-bind="slotProps"
            ></slot>
          </template>
        </v-notify>
      </li>
    </transition-group>
  </ul>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import vNotify from "./vNotify.vue"
import { sharedProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

let props = defineProps({
  ...sharedProps(),
  order: {
    type: String,
    default: "new-on-bottom",
  },
  autoDismissDelay: {
    type: Number,
    default: 10000,
  },
  dismissable: {
    type: Boolean,
    default: true,
  },
  static: {
    type: Boolean,
    default: false,
  },
  notify: {
    type: Object,
    default: defaultProps("notify-container", "notify", {}),
  },
});

let { notifications, setNotifyOptions, removeNotify, removeNotifyById } = inject("_notify");

setNotifyOptions(props);

let localNotifications = computed(() => {
  return props.order === "new-on-bottom"
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

let handleCloseButton = (id) => {
  removeNotifyById(id)
};
</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all var(--notify-transition-duration) ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translate(0%, -100%);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(160%);
  /* transform: translateX(40%); */
  /* transform: scale(0.2); */
}

.fade-leave-active {
  position: absolute;
}
</style>
