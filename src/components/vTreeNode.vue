<template>
  <li :class="getItemClasses()">
    <div @click="handleItemClick" @dblclick="changeType">
      <slot name="item" :item="items" :isFolder="isFolder" :isOpen="isOpen">
        <div class="flex items-center">
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
      <ul v-show="isOpen" v-if="isFolder">
        <v-tree-node
          v-for="i in items.children"
          :items="i"
          v-bind="$attrs"
        >
          <template v-for="(_, slot) of slots" #[slot]="item">
            <slot :name="slot" v-bind="item"></slot>
          </template>
        </v-tree-node>
      </ul>
    </transition>
  </li>
</template>

<script>
// vue
import { ref, computed, inject } from "vue";

export default {
  props: {
    items: { type: Object, default: {} },
  },
  inheritAttrs: false,
  setup(props, { emit, slots }) {
    let { classes, states } = inject("tree")

    // computed
    let getItemClasses = () => {
      return isFolder.value ? classes.folder.value : classes.item.value;
    };

    const isOpen = ref(false);

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
      slots,
      handleItemClick,
    };
  },
};
</script>

<style scoped>
</style>
