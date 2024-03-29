<template>
  <div>
    <ul
      :class="classes.tabBar.value"
      role="tablist"
    >
      <li
        v-for="(tab, i) in tabsData"
        :key="i"
        :class="fill ? 'flex flex-auto' : ''"
      >
        <a
          href=""
          :class="getTabClasses(tab)"
          @click.prevent="handleClickTab(i)"
          role="tab"
          :aria-selected="tab.isActive"
        >
          <render-vnode :vnodes="getTabName(tab)" />
        </a>
      </li>
      <!-- @slot tab-bar-append -->
      <li v-if="$slots['tab-bar-append']">
        <slot name="tab-bar-append"></slot>
      </li>
    </ul>
    <!-- @slot default -->
    <slot name="default"></slot>
  </div>
</template>

<script setup>
import { ref, toRef, onMounted, computed, provide, h, toRaw, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import { sharedProps, sharedModProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("tabs", ["TabBar", "Tab"]),
  fill: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  right: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: String,
    default: defaultProps("tabs", "transition", "fade"),
  },
});

const emit = defineEmits(["input:changed-tab"]);

let renderVnode = (props) => {
  return h("span", null, props.vnodes);
};

let { tabs } = inject("mods", {})

let elements = {
  tabBar: {
    fixed: "flex flex-auto items-center",
    computed: computed(() =>
      props.center ? "justify-center" : props.right ? "justify-end" : ""
    )
  },
  tab: {
    fixed: "block",
    computed: computed(() => (props.fill ? "w-full" : "")),
    externalVariants: ["variant"],
  }
}

let { classes, variants } = useTailwindStyles(props, tabs, elements)

let getTabClasses = (tab) => {
  return [classes.tab.value, (tab.isActive && variants.tab.active) || variants.tab.default];
};

let tabsData = ref([]);
let activeTab = null;

onMounted(() => activateTab(0));

let getTab = (tab) => {
  return tabsData.value.findIndex((t) => toRaw(t) === tab);
};

let getTabName = (tab) => {
  return (tab.slots.name && tab.slots.name()) || tab.name;
};

let activateTab = (index) => {
  if (index < 0 || !tabsData.value.length || tabsData.value.length < index) {
    return;
  }

  let tab = tabsData.value[index];

  if (tab.isActive) return;

  tab.isActive = true;
  if (activeTab) activeTab.isActive = false;

  activeTab = tab;

  emit("input:changed-tab", index);
};

// this is called by v-tab child after mounting
let addTab = (tab) => {
  tabsData.value.push(tab);
};

// this is called by v-tab child after unmounting
let removeTab = (tab) => {
  let index = getTab(tab);

  if (index === -1) return;

  if (tab.isActive) activateTab(index - 1);

  tabsData.value.splice(index, 1);
};

// handle template events

let handleClickTab = (index) => activateTab(index);

provide("_control-tab", {
  addTab,
  removeTab,
  transition: toRef(props, "transition"),
});
</script>

<style scoped lang="postcss"></style>
