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
          :class="getTabClasses(tab)"
          @click.prevent="handleClickTab(i)"
        >
          <render-vnode :vnodes="getTabName(tab)" />
        </a>
      </li>
    </ul>
    <slot name="default"></slot>
  </div>
</template>

<script>
import { ref, toRef, onMounted, computed, provide, h, toRaw } from "vue";
import useStyles from "./composition/use-styles";

export default {
  props: {
    fill: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
    transition: { type: String, default: "fade" },
    name: { type: String, default: "tabs" },
    styleTabBar: { type: [String, Array], default: "" },
    styleTab: { type: [String, Array], default: "" },
  },
  components: {
    // component to render content of child v-tab name slot
    renderVnode: (props) => {
      return h("span", props.vnodes);
    },
  },
  setup(props, { emit }) {
    let { classes, states } = useStyles("tabs", props, {
      tabBar: {
        name: "tab-bar",
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
    });

    let getTabClasses = (tab) => {
      return [classes.tab.value, tab.isActive && states.tab.value.active];
    };

    let tabs = ref([]);
    let activeTab = null;

    onMounted(() => activateTab(0));

    let getTab = (tab) => tabs.value.findIndex((t) => toRaw(t) === tab);

    let getTabName = (tab) => (tab.slots.name && tab.slots.name()) || tab.name;

    let activateTab = (index) => {
      if (index < 0 || tabs.value.length < index) return;

      let tab = tabs.value[index];

      if (tab.isActive) return;

      tab.isActive = true;
      if (activeTab) activeTab.isActive = false;

      activeTab = tab;

      emit("input:changed-tab", index);
    };

    // this is called by v-tab child after mounting
    let addTab = (tab) => tabs.value.push(tab);

    // this is called by v-tab child after unmounting
    let removeTab = (tab) => {
      let index = getTab(tab)

      if (index === -1) return;

      if (tab.isActive) activateTab(index - 1);

      tabs.value.splice(index, 1);
    };

    // handle template events
    let handleClickTab = (index) => activateTab(index);

    provide("control-tab", {
      addTab,
      removeTab,
      transition: toRef(props, "transition"),
    });

    return {
      classes,
      states,
      getTabClasses,
      tabs,
      getTabName,
      handleClickTab,
      activateTab,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-tab-bar {
  @apply flex flex-auto;
}
.fixed-tab {
  @apply block;
}
.fixed-tab-wrapper {
  @apply flex flex-auto;
}
</style>
