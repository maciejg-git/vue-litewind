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
          :class="[
            classes.tab.value,
            active == i ? states.tab.value.active : '',
          ]"
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
import { ref, toRef, onMounted, computed, provide, h } from "vue";
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

    let tabs = ref([]);
    let active = ref(null);
    let lastActive = ref(null);

    onMounted(() => {
      if (tabs.value.length) activateTab(0);
    });

    // tab name can be set in name slot of child v-tab
    let getTabName = (tab) => {
      return tab.slots.name ? tab.slots.name() : tab.name;
    };

    let activateTab = (index) => {
      if (index < 0 || tabs.value.length < index || active.value == index) {
        return;
      }

      let currentTab = tabs.value[active.value];
      let newTab = tabs.value[index];

      newTab.active = true;
      if (currentTab) currentTab.active = false;

      lastActive.value = active.value;
      active.value = index;

      emit("input:changed-tab", index);
    };

    // this is called by v-tab child after mounting
    let addTab = (tab) => {
      tabs.value.push(tab);
    };

    // this is called by v-tab child after unmounting
    let removeTab = (uid) => {
      let index = tabs.value.findIndex((tab) => tab.uid == uid);
      if (index === -1) return;

      tabs.value.splice(index, 1);

      if (active.value == index) activateTab(index - 1);
      else activateTab(index);
    };

    let handleClickTab = (index) => {
      activateTab(index);
    };

    provide("controlTab", { addTab, removeTab });
    provide("transition", toRef(props, "transition"));

    return {
      classes,
      states,
      tabs,
      getTabName,
      active,
      handleClickTab,
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
