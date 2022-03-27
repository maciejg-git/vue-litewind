<template>
  <transition :name="transition" mode="out-in">
    <component :is="icon" :class="classes"></component>
  </transition>
</template>

<script>
import { computed, inject } from "vue";

export default {
  props: {
    name: { type: [String, Object], default: "" },
    icon: { type: [String, Object], default: "" },
    transition: { type: String, default: "" },
    iconType: { type: String, default: "" },
  },
  setup(props) {
    let iconTypes = inject("icon-types", {});

    let icon = computed(() => {
      return iconTypes[props.iconType] || props.name || props.icon;
    });

    let classes = computed(() => {
      return props.iconType ? "icon-type--" + props.iconType : "";
    });

    return {
      icon,
      classes,
    };
  },
};
</script>

<style scoped lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-scale-down-enter-active,
.fade-scale-down-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-scale-down-enter-from,
.fade-scale-down-leave-to {
  opacity: 0;
  transform: scale(0.2)
}
.fade-scale-up-enter-active,
.fade-scale-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-scale-up-enter-from,
.fade-scale-up-leave-to {
  opacity: 0;
  transform: scale(2.5)
}
</style>
