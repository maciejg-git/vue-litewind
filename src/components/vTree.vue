<template>
  <li>
    <div @click="handleItemClick" @dblclick="changeType">
      <slot name="item" :item="items" :isFolder="isFolder" :isOpen="isOpen">
        <div :class="getItemClasses()" class="flex items-center">
          <slot
            name="item-prepend"
            :isFolder="isFolder"
            :isOpen="isOpen"
          ></slot>
          <div class="w-5">
            <v-chevron
              v-if="isFolder"
              :switch="isOpen"
              initial="right"
            ></v-chevron>
          </div>
          <div>
            {{ items.name }}
          </div>
          <slot name="item-append" :isFolder="isFolder" :isOpen="isOpen"></slot>
        </div>
      </slot>
    </div>

    <transition name="fade-m">
      <!-- <ul v-if="isFolder &#38;&#38; isOpen"> -->
      <ul v-show="isOpen" v-if="isFolder">
        <v-tree class="item" v-for="i in items.children" :items="i" v-bind="$attrs">
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
// props
import { sharedStyleProps } from "../shared-props";

export default {
  props: {
    items: { type: Object, default: {} },
    styleFolder: { type: String, default: "" },
    styleItem: { type: String, default: "" },
    ...sharedStyleProps("tree"),
  },
  setup(props, { emit, slots }) {
    let { classes, states } = useStyles("tree", props, {
      folder: {
        states: ["opened"],
      },
      item: null,
    });

    // computed
    let getItemClasses = () => {
      return isFolder.value ? classes.folder.value : classes.item.value;
    };

    const isOpen = ref(false);

    let changeType = () => {
      if (!isFolder.value) {
        props.items.children = [];
        addChild();
        isOpen.value = true;
      }
    };

    let addChild = () => {
      props.items.children.push({ name: "new stuff" });
    };

    const isFolder = computed(() => {
      return props.items.children && props.items.children.length;
    });

    let handleItemClick = () => {
      isOpen.value = !isOpen.value;
      emit("input:item", props.items);
    };

    return {
      classes,
      getItemClasses,
      states,
      isOpen,
      isFolder,
      changeType,
      addChild,
      slots,
      handleItemClick,
    };
  },
};
</script>
<style scoped>
.item {
  @apply pl-4;
}
</style>
