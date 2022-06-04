<template>
  <li :class="getItemClasses()">
    <slot name="item" v-bind="{ item: items, isFolder, isOpen }">
      <div class="flex items-center">
        <div>
          <slot
            name="item-prepend"
            :isFolder="isFolder"
            :isOpen="isOpen"
          ></slot>
        </div>
        <div class="w-5 mr-1">
          <v-button base="button-plain" @click="handleIndicatorClick">
            <v-chevron
              v-if="isFolder"
              :switch="isOpen"
              initial="right"
              v-bind="chevronAttrs"
            ></v-chevron>
          </v-button>
        </div>
        <div
          @click="handleItemClick"
          :class="{ 'cursor-pointer': isFolder && openOnClick }"
        >
          {{ items[itemName] }}
        </div>
        <slot name="item-append" :isFolder="isFolder" :isOpen="isOpen"></slot>
      </div>
    </slot>

    <transition :name="transition">
      <ul v-show="isOpen" v-if="isFolder">
        <v-tree-node
          v-for="i in items[itemChildren]"
          :items="i"
          v-bind="{...$attrs, chevronAttrs}"
        >
          <template v-for="(_, slot) of slots" #[slot]="i">
            <slot :name="slot" v-bind="i"></slot>
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
    itemName: { type: String, default: "name" },
    itemChildren: { type: String, default: "children" },
    openOnClick: { type: Boolean, default: true },
    indicators: { type: Boolean, default: true },
    chevronAttrs: { type: Object, default: {} },
  },
  // inheritAttrs: false,
  setup(props, { emit, slots }) {
    let { classes, states, transition } = inject("tree");

    // computed
    let getItemClasses = () => {
      return isFolder.value ? classes.folder.value : classes.item.value;
    };

    const isOpen = ref(false);

    const isFolder = computed(() => {
      return props.items.children && props.items.children.length;
    });

    let toggleItem = () => {
      isOpen.value = !isOpen.value;
      if (isOpen.value) emit("input:opened-item", props.items);
      else emit("input:closed-item", props.items);
    };

    let handleItemClick = () => {
      if (isFolder.value && props.openOnClick) toggleItem();
      emit("input:item", props.items);
    };

    let handleIndicatorClick = () => {
      if (isFolder.value) toggleItem();
    };

    return {
      classes,
      getItemClasses,
      states,
      transition,
      isOpen,
      isFolder,
      slots,
      handleItemClick,
      handleIndicatorClick,
    };
  },
};
</script>

<style scoped></style>
