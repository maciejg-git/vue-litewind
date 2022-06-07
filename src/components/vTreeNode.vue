<template>
  <li :class="getItemClasses()">
    <slot name="item" v-bind="{ item: items, isFolder, isOpen, toggleItem }">
      <div class="flex items-center">
        <!-- indicator -->
        <div class="w-5 order-first mr-2">
          <v-button
            v-if="isFolder"
            base="button-plain"
            @click="handleIndicatorClick"
          >
            <v-chevron
              :switch="isOpen"
              initial="right"
              v-bind="chevronAttrs"
            ></v-chevron>
          </v-button>
        </div>
        <!-- checkbox -->
        <div v-if="checkboxes">
          <v-checkbox v-model="isSelected"></v-checkbox>
        </div>
        <!-- icon -->
        <div>
          <slot name="icon" v-bind="{ item: items, isFolder, isOpen }">
            <div
              v-if="
                items[itemIcon] || placeholderItemIcon || placeholderFolderIcon
              "
              class="mr-1.5"
            >
              <v-icon
                :name="getIcon()"
                :class="[{ disabled: items.disabled }, classes.icon.value]"
              ></v-icon>
            </div>
          </slot>
        </div>
        <!-- prepend slot -->
        <div>
          <slot
            name="item-prepend"
            v-bind="{ item: items, isFolder, isOpen, toggleItem }"
          ></slot>
        </div>
        <!-- item name -->
        <div
          @click="handleItemClick"
          :class="{
            'cursor-pointer': isFolder && openOnClick,
            disabled: items.disabled,
          }"
        >
          <slot name="item-name" v-bind="{ item: items, isFolder, isOpen }">
            {{ items[itemName] }}
          </slot>
        </div>
        <!-- append slot -->
        <slot
          name="item-append"
          v-bind="{ item: items, isFolder, isOpen, toggleItem }"
        ></slot>
      </div>
    </slot>

    <transition :name="transition">
      <ul v-show="isOpen" v-if="isFolder">
        <v-tree-node
          v-for="i in items[itemChildren]"
          v-bind="{ ...$attrs, ...$props, items: i }"
        >
          <template v-for="(name, slot) of slots" #[slot]="i">
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
    itemIcon: { type: String, default: "icon" },
    openOnClick: { type: Boolean, default: true },
    indicators: { type: Boolean, default: true },
    icons: { type: Boolean, default: true },
    checkboxes: { type: Boolean, default: false },
    placeholderItemIcon: { type: [String, Object], default: undefined },
    placeholderFolderIcon: { type: [String, Object], default: undefined },
    chevronAttrs: { type: Object, default: {} },
  },
  inheritAttrs: false,
  setup(props, { emit, slots }) {
    let { classes, states, transition } = inject("control-tree");

    // computed
    let getItemClasses = () => {
      return isFolder.value ? classes.folder.value : classes.item.value;
    };

    const isOpen = ref(false);
    const isSelected = ref(false);
    const isFolder = computed(() => {
      return props.items.children && props.items.children.length;
    });

    const getIcon = () => {
      let icon = props.items[props.itemIcon];

      if (Array.isArray(icon)) {
        return isOpen.value ? icon[1] : icon[0];
      }
      return (
        icon ||
        (isFolder.value
          ? Array.isArray(props.placeholderFolderIcon)
            ? isOpen.value
              ? props.placeholderFolderIcon[1]
              : props.placeholderFolderIcon[0]
            : props.placeholderFolderIcon
          : props.placeholderItemIcon)
      );
    };

    let toggleItem = () => {
      isOpen.value = !isOpen.value;
      if (isOpen.value) emit("input:opened-item", props.items);
      else emit("input:closed-item", props.items);
    };

    // handle template events

    let handleItemClick = () => {
      if (isFolder.value && props.openOnClick) toggleItem();
      emit("input:item", props.items);
    };

    let handleIndicatorClick = () => {
      if (isFolder.value) toggleItem();
    };

    let handleItemSelected = () => {
      isSelected.value = true;
      emit("input:selected");
    };

    return {
      classes,
      getItemClasses,
      states,
      transition,
      isOpen,
      isFolder,
      isSelected,
      getIcon,
      slots,
      toggleItem,
      handleItemClick,
      handleIndicatorClick,
    };
  },
};
</script>

<style scoped></style>
