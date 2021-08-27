<template>
  <div>
    <ul :class="classes.tabBar.value">
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        :class="fill ? 'fixed-tab-wrapper' : ''"
      >
        <a
          href=""
          :class="[classes.tab.value, active == i ? states.tab.active : '']"
          @click.prevent="handleClickTab(i)"
        >
          <VNodes :vnodes="tabName(tab)" />
        </a>
      </li>
    </ul>
    <slot name="default"></slot>
  </div>
</template>

<script>
import { ref, toRef, onMounted, computed, provide, h } from "vue";
import useStyles from "./composition/use-styles 2";

export default {
  props: {
    fill: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    transition: { type: String, default: "fade" },
    name: { type: String, default: "tabs" },
    theme: { type: String, default: "default" },
    styleTabBar: { type: [String, Array], default: "default" },
    styleTab: { type: [String, Array], default: "default" },
    styleTabActive: { type: [String, Array], default: "default" },
  },
  components: {
    VNodes: (props) => {
      return h("span", props.vnodes);
    },
  },
  setup(props, { emit }) {
    let { classes, states } = useStyles(props, {
      tabBar: {
        fixed: "fixed-tab-bar",
        prop: computed(() =>
          props.center ? "justify-center" : props.right ? "justify-end" : ""
        ),
      },
      tab: {
        fixed: "fixed-tab",
        states: ["active"],
        prop: computed(() => (props.fill ? "w-full" : "")),
      },
      tabActive: {
        fixed: "fixed-tab-active",
        prop: computed(() => (props.fill ? "w-full" : "")),
      },
    });

    let tabs = ref([]);
    let active = ref(0);

    onMounted(() => {
      if (tabs.value.length) switchTab(0);
    });

    let tabName = function (tab) {
      return tab.instance.slots.name
        ? tab.instance.slots.name()
        : tab.instance.props.name;
    };

    let switchTab = function (index) {
      tabs.value[active.value].active = false;
      tabs.value[index].active = true;
      active.value = index;
      emit("input:changed-tab", index);
    };

    let addTab = function (tab) {
      tabs.value.push(tab);
    };

    let removeTab = function (tab) {
      let index = tabs.value.findIndex((item) => item.instance == tab);
      if (active.value == index && index > 0) switchTab(index - 1);
      tabs.value.splice(index, 1);
    };

    let handleClickTab = function (index) {
      if (active.value == index) return;
      switchTab(index);
    };

    provide("controlTab", { addTab, removeTab });
    provide("transition", toRef(props, "transition"));

    return {
      classes,
      states,
      tabs,
      tabName,
      active,
      handleClickTab,
    };
  },
};
</script>

<style scoped>
.fixed-tab-bar {
  @apply flex flex-auto;
}
.fixed-tab {
  @apply block;
}
.fixed-tab-active {
  @apply block;
}
.fixed-tab-wrapper {
  @apply flex flex-auto;
}
</style>
