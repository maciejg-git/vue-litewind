<template>
  <div>
    <ul :class="classes.tabBar.value">
      <li v-for="(tab, i) in tabs" :class="{ 'flex flex-auto': fill }">
        <a
          href=""
          :class="active == i ? classes.tabActive.value : classes.tab.value"
          class=""
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
import { ref, onMounted, computed, provide, h, getCurrentInstance } from "vue";
import useStyles from "../use-styles";
import { removeTailwindClasses } from "../tools.js";

export default {
  props: {
    modelValue: Number,
    fill: { type: Boolean, default: false },
    justified: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    noTransition: { type: Boolean, default: false },
    name: { type: String, default: "tabs" },
    tabBar: { type: [String, Array], default: "default" },
    tab: { type: [String, Array], default: "default" },
    tabActive: { type: [String, Array], default: "default" },
  },
  components: {
    VNodes: (props) => {
      return h("span", props.vnodes);
    },
  },
  setup(props, { emit }) {
    let elements = ["tabBar", "tab", "tabActive"];
    let tabs = ref([]);
    let active = ref(0);

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClasses = {
      tabBar: ["flex", "flex-auto"],
      tab: ["block", "p-2", "px-4"],
      tabActive: ["block", "p-2", "px-4"],
    };

    let classes = {
      tabBar: computed(() => {
        let c = [
          ...fixedClasses.tabBar,
          ...styles.tabBar.value,
          props.center ? "justify-center" : "",
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

    onMounted(() => {
      if (tabs.value.length) switchTab(0);
    });

    let tabName = function (tab) {
      return tab.instance.slots.name
        ? tab.instance.slots.name()
        : tab.instance.ctx.name;
    };

    let handleClickTab = function (index) {
      if (active.value == index) return;
      switchTab(index);
    };

    let switchTab = function (index) {
      tabs.value[active.value].active = false;
      tabs.value[index].active = true;
      active.value = index;
      emit("state:changedTab", index);
    };

    let addTab = function (tab) {
      tabs.value.push(tab);
    };

    let removeTab = function (tab) {
      let index = tabs.value.findIndex((item) => item.instance == tab);
      if (active.value == index && index > 0) switchTab(index - 1);
      tabs.value.splice(index, 1);
    };

    provide("controlTab", { addTab, removeTab });
    provide("sharedProps", { noTransition: props.noTransition });

    return {
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
