<template>
  <div>
    <ul :class="classes.tabBar.value">
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        :class="fill ? fixedClasses.tabWrapper: ''"
      >
        <a
          href=""
          :class="active == i ? classes.tabActive.value : classes.tab.value"
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
import {
  ref,
  toRef,
  onMounted,
  computed,
  provide,
  h,
  getCurrentInstance,
} from "vue";
import useStyles from "./composition/use-styles";
import { removeTailwindClasses } from "../tools/tools.js";

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
    let elements = ["tabBar", "tab", "tabActive"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClasses = {
      tabBar: ["flex", "flex-auto"],
      tab: ["block"],
      tabActive: ["block"],
      tabWrapper: ["flex flex-auto"],
    };

    let classes = {
      tabBar: computed(() => {
        let c = [
          ...fixedClasses.tabBar,
          ...styles.tabBar.value,
          props.center ? "justify-center" : props.right ? "justify-end" : "",
        ];
        return removeTailwindClasses(c);
      }),
      tab: computed(() => {
        let c = [
          ...fixedClasses.tab,
          ...styles.tab.value,
          props.fill ? "w-full" : "",
        ];
        return removeTailwindClasses(c);
      }),
      tabActive: computed(() => {
        let c = [
          ...fixedClasses.tabActive,
          ...styles.tabActive.value,
          props.fill ? "w-full" : "",
        ];
        return removeTailwindClasses(c);
      }),
    };

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
      fixedClasses,
      classes,
      tabs,
      tabName,
      active,
      handleClickTab,
    };
  },
};
</script>

<style scoped>
.v-border-b-transparent {
  border-bottom-color: transparent;
}
</style>
