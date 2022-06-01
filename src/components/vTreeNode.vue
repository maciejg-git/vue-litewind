<template>
  <li>
    <div @click="toggle" @dblclick="changeType">
      <slot name="item" :item="items">
        {{ items.name }}
      </slot>
      <span v-if="isFolder">[{{ isOpen ? "-" : "+" }}]</span>
    </div>
    <transition name="fade-m">
      <ul v-show="isOpen" v-if="isFolder">
        <v-tree
          class="item"
          v-for="i in items.children"
          :items="i"
        >
          <template v-for="(_, slot) of slots" #[slot]="item">
            <slot :name="slot" v-bind="item"></slot>
          </template>
        </v-tree>
      </ul>
    </transition>
  </li>
</template>

<script>
// vue
import { ref, computed } from "vue";
// composition
import useStyles from "./composition/use-styles";

export default {
  props: {
    items: { type: Object, default: {} },
    styleFolder: { type: String, default: "" },
    styleItem: { type: String, default: "" },
    ...sharedStyleProps("dropdown"),
  },
  setup(props, { slots }) {
    let { classes, states } = useStyles("tree-node", props, {
      folder: {
        states: ["opened"],
      },
      item: null,
    });

    const isOpen = ref(false);

    let toggle = () => {
      isOpen.value = !isOpen.value;
    }

    let changeType = () => {
      if (!isFolder.value) {
        props.items.children = [];
        addChild();
        isOpen.value = true;
      }
    }

    let addChild = () => {
      props.items.children.push({ name: "new stuff" });
    }

    const isFolder = computed(() => {
      return props.items.children && props.items.children.length;
    });

    return {
      classes,
      states,
      isOpen,
      isFolder,
      toggle,
      changeType,
      addChild,
      slots,
    }
  },
};
</script>
<style scoped>
.item {
  @apply pl-4
}
</style>
