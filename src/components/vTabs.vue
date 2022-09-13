<template>
  <div>
    <ul :class="classes.tabBar.value">
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        :class="fill ? 'flex flex-auto' : ''"
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
// vue
import { ref, toRef, onMounted, computed, provide, h, toRaw } from "vue";
// composition
import useStyles from "./composition/use-styles";
// props
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

export default {
  props: {
    ...sharedProps(),
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
    styleTabBar: {
      type: [String, Array],
      default: defaultProps("tabs", "styleTabBar", ""),
    },
    styleTab: {
      type: [String, Array],
      default: defaultProps("tabs", "styleTab", ""),
    },
    ...sharedStyleProps("tabs"),
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
        fixed: "flex flex-auto",
        prop: computed(() =>
          props.center ? "justify-center" : props.right ? "justify-end" : ""
        ),
      },
      tab: {
        fixed: "block",
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

    let getTab = (tab) => {
      return tabs.value.findIndex((t) => toRaw(t) === tab);
    }

    let getTabName = (tab) => {
      return (tab.slots.name && tab.slots.name()) || tab.name;
    }

    let activateTab = (index) => {
      if (index < 0 || !tabs.value.length || tabs.value.length < index) {
        return;
      }

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
      let index = getTab(tab);

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
</style>
