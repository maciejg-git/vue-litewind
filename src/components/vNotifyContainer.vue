<template>
    <ul class="block fixed" @mouseenter="handleContainerMouseEnter"
    @mouseleave="handleContainerMouseLeave">
      <transition-group name="fade">
        <li
          v-for="item in localNotifications"
          class="w-full"
          :key="item.id"
        >
          <v-notify class="w-full" :notify="item" v-bind="item.props" @close-button-clicked="handleCloseButton">
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
import { ref, computed, provide, inject } from "vue";
import useStyles from "./composition/use-styles";
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

let props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("notify", ["Notify"]),
  direction: {
    type: String,
    default: "new-on-bottom",
  },
  delay: {
    type: Number,
    default: 4000,
  },
  dismissable: {
    type: Boolean,
    default: true,
  },
  notify: {
    type: Object,
    default: defaultProps("notify-container", "notify", {})
  }
});

let { classes, states } = useStyles("notify", props, {
  notifyContainer: null,
  notify: null,
  header: null,
  icon: null,
  content: null,
});

let { notifications, setNotifyOptions, removeNotify } = inject("notify");

setNotifyOptions(props);

let localNotifications = computed(() => {
  return props.direction === "new-on-bottom"
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
  removeNotify(id)
}
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
