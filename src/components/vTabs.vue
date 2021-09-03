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
          :class="[classes.tab.value, active == i ? states.tab.active.value : '']"
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
    // minimal component to render content of child v-tab name slot
    VNodes: (props) => {
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
    let active = ref(0);

    onMounted(() => {
      if (tabs.value.length) switchTab(0);
    });

    // tab name can be set in name slot of child v-tab 
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

    // this is called by v-tab child after mounting
    let addTab = function (tab) {
      tabs.value.push(tab);
    };

    // this is called by v-tab child after unmounting
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
