<template>
  <li :class="getItemClasses()" v-if="!isFiltered">
    <slot name="item" v-bind="{ item: items, isFolder, isOpen, toggle }">
      <div class="flex items-center">
        <!-- indicator -->
        <div v-if="showIndicators" class="w-5 order-first mr-2">
          <v-button
            v-if="isFolder"
            base="button-plain"
            @click="handleIndicatorClick"
          >
            <v-chevron
              :switch="isOpen"
              initial="right"
              v-bind="chevronAttrs"
              :class="{ disabled: items[itemDisabled] }"
            ></v-chevron>
          </v-button>
        </div>
        <!-- checkbox -->
        <transition :name="transition">
          <div v-if="showCheckboxes" class="flex items-center mr-2">
            <v-checkbox v-model="isSelected" @change="handleItemSelected" />
          </div>
        </transition>
        <!-- icon -->
        <div v-if="showIcons">
          <slot name="icon" v-bind="{ item: items, isFolder, isOpen }">
            <div
              v-if="
                items[itemIcon] || placeholderItemIcon || placeholderFolderIcon
              "
              class="mr-1.5"
            >
              <v-icon
                :name="getIcon()"
                :class="[{ disabled: items[itemDisabled] }, classes.icon.value]"
              ></v-icon>
            </div>
          </slot>
        </div>
        <!-- prepend slot -->
        <div>
          <slot
            name="item-prepend"
            v-bind="{ item: items, isFolder, isOpen, toggle }"
          ></slot>
        </div>
        <!-- item name -->
        <div
          @click="handleItemClick"
          :class="{
            'cursor-pointer': isFolder && openOnClick,
            disabled: items[itemDisabled],
          }"
        >
          <slot name="item-name" v-bind="{ item: items, isFolder, isOpen }">
            {{ items[itemName] }}
          </slot>
        </div>
        <!-- append slot -->
        <slot
          name="item-append"
          v-bind="{ item: items, isFolder, isOpen, toggle }"
        ></slot>
      </div>
    </slot>

    <transition :name="transition">
      <ul v-show="isOpen" v-if="isFolder">
        <v-tree-node
          v-for="(i, index) in items[itemChildren]"
          v-bind="{
            ...$attrs,
            ...$props,
            items: i,
            itemLevel: itemLevel + 1,
          }"
          :ref="(i) => (nodeList[index] = i)"
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
import { ref, computed, toRef, inject } from "vue";

export default {
  props: {
    items: { type: Object, default: [] },
    itemName: { type: String, default: "name" },
    itemChildren: { type: String, default: "children" },
    itemIcon: { type: String, default: "icon" },
    itemDisabled: { type: String, default: "disabled" },
    itemKey: { type: String, default: undefined },
    itemLevel: { type: Number, default: 0 },
    openOnClick: { type: Boolean, default: true },
    showIndicators: { type: Boolean, default: true },
    showIcons: { type: Boolean, default: true },
    showCheckboxes: { type: Boolean, default: false },
    placeholderItemIcon: { type: [String, Object], default: undefined },
    placeholderFolderIcon: { type: [String, Object], default: undefined },
    chevronAttrs: { type: Object, default: {} },
  },
  inheritAttrs: false,
  setup(props, { emit, slots, expose }) {
    let { classes, states, selectedItems, filter, transition } =
      inject("control-tree");

    // computed
    let getItemClasses = () => {
      return isFolder.value ? classes.folder.value : classes.item.value;
    };

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

    let itemLevel = toRef(props, "itemLevel");

    let nodeList = ref([]);

    const isOpen = ref(false);

    const isSelected = ref(false);

    const isDisabled = () => props.items[props.itemDisabled];

    const isFolder = computed(() => {
      return props.items.children && props.items.children.length;
    });

    const isFiltered = computed(() => {
      if (!filter.value || isFolder.value) return false;
      return (
        props.items[props.itemName]
          .toLowerCase()
          .indexOf(filter.value.toLowerCase()) === -1
      );
    });

    // control state

    let open = () => {
      if (isDisabled()) return;
      isOpen.value = true;
    };

    let close = () => {
      if (isDisabled()) return;
      isOpen.value = false;
    };

    let toggle = () => (isOpen.value ? close() : open());

    // handle template events

    let handleItemClick = () => {
      if (isFolder.value && props.openOnClick) toggle();
      emit("input:item", props.items);
    };

    let handleIndicatorClick = () => toggle();

    let handleItemSelected = () => {
      if (isSelected.value) {
        if (selectedItems.value.includes(props.items)) return;
        selectedItems.value.push(props.items);
      } else {
        selectedItems.value = selectedItems.value.filter(
          (i) => i !== props.items
        );
      }
    };

    expose({ open, close, toggle, isOpen, isFolder, nodeList, itemLevel });

    return {
      classes,
      getItemClasses,
      states,
      selectedItems,
      itemLevel,
      transition,
      isOpen,
      isFolder,
      isSelected,
      isFiltered,
      nodeList,
      getIcon,
      slots,
      toggle,
      handleItemClick,
      handleItemSelected,
      handleIndicatorClick,
    };
  },
};
</script>

<style scoped></style>
