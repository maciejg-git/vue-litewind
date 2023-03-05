<template>
  <li
    :class="itemClasses"
    v-if="!isFilteredOut"
    role="treeitem"
    :aria-expanded="isOpen ? 'true' : 'false'"
  >
  <!-- @slot item -->
    <slot
      name="item"
      v-bind="{ item: items, isFolder, isOpen, toggle }"
    >
      <div class="flex items-center">
        <!-- indicator -->
        <div
          v-if="showIndicators"
          class="w-5 mr-2 order-first"
        >
          <v-button
            v-if="isFolder"
            base="plain-button"
            @click="handleIndicatorClick"
          >
            <v-chevron
              :switch="isOpen"
              rotate90
              clockwise
              initial="right"
              v-bind="chevron"
              :class="{ disabled: isDisabled }"
            ></v-chevron>
          </v-button>
        </div>
        <!-- checkbox -->
        <transition name="fade">
          <div
            v-if="showCheckboxes"
            class="flex items-center mr-2 order-1"
          >
            <v-checkbox-simple
              :checked="isSelected"
              @change="handleItemSelected"
              :disabled="isDisabled && !allowSelectDisabled"
            />
          </div>
        </transition>
        <!-- icon -->
        <div
          v-if="showIcons"
          class="order-3"
        >
        <!-- @slot icon -->
          <slot
            name="icon"
            v-bind="{ item: items, isFolder, isOpen }"
          >
            <div
              v-if="
                items[itemIcon] || placeholderItemIcon || placeholderFolderIcon
              "
              class="mr-1.5"
            >
              <v-icon
                :name="getIcon()"
                :class="[{ disabled: isDisabled }, classes.icon.value]"
              ></v-icon>
            </div>
          </slot>
        </div>
        <!-- prepend slot -->
        <div class="order-5">
          <!-- @slot item-prepend -->
          <slot
            name="item-prepend"
            v-bind="{ item: items, isFolder, isOpen, toggle }"
          ></slot>
        </div>
        <!-- item name -->
        <div
          @click="handleItemClick"
          class="order-7"
          :class="{
            'cursor-pointer': isFolder && openOnClick,
            disabled: isDisabled,
          }"
          role="button"
        >
        <!-- @slot name -->
          <slot
            name="name"
            v-bind="{ item: items, isFolder, isOpen }"
          >
            {{ items[itemName] }}
          </slot>
        </div>
        <!-- append slot -->
        <div class="order-last flex">
          <!-- @slot item-append -->
          <slot
            name="item-append"
            v-bind="{ item: items, isFolder, isOpen, toggle }"
          ></slot>
        </div>
      </div>
    </slot>

    <transition :name="transition">
      <ul
        v-show="isOpen"
        v-if="isFolder"
        role="group"
      >
        <v-tree-node
          v-for="i in items[itemChildren]"
          :key="i[itemKey]"
          v-bind="{
            ...$attrs,
            ...$props,
            items: i,
            itemLevel: itemLevel + 1,
          }"
          :ref="(i) => i && nodeList.push(i)"
          :disabled="isDisabled"
          @children-selected="handleChildrenSelected"
        >
          <template
            v-for="(name, slot) of $slots"
            #[slot]="i"
          >
            <slot
              :name="slot"
              v-bind="i"
            ></slot>
          </template>
        </v-tree-node>
      </ul>
    </transition>
  </li>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { ref, computed, toRef, inject, onBeforeUpdate } from "vue";
import vChevron from "./vChevron.vue";
import vIcon from "./vIcon.vue";
import vCheckboxSimple from "./vCheckboxSimple.vue";
import vButton from "./vButton.vue";

const props = defineProps({
  items: {
    type: Object,
    default: [],
  },
  itemLevel: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["children-selected"]);

let {
  classes,
  variants,
  forNode,
  selectedItems,
  filter,
  transition,
  itemName,
  itemChildren,
  itemIcon,
  itemDisabled,
  itemKey,
  showIcons,
  showCheckboxes,
  showIndicators,
  selectIndependent,
  openOnClick,
  allowSelectDisabled,
  allowOpenDisabled,
  placeholderItemIcon,
  placeholderFolderIcon,
  chevron,
  parentEmit,
} = inject("control-tree");

let itemClasses = computed(() => {
  return [
    isFolder.value &&
      itemLevel.value === 0 &&
      variants.folder.value["root-variant"],
    (isFolder.value && classes.folder.value) || classes.item.value,
  ];
});

const getIcon = () => {
  let icon = props.items[itemIcon.value];

  if (Array.isArray(icon)) {
    return isOpen.value ? icon[1] : icon[0];
  }

  if (icon) {
    return icon;
  }

  if (isFolder.value) {
    if (Array.isArray(placeholderFolderIcon.value)) {
      return isOpen.value
        ? placeholderFolderIcon.value[1]
        : placeholderFolderIcon.value[0];
    }

    return placeholderFolderIcon.value;
  }

  return placeholderItemIcon.value;
};

// let prependSlotOrder = ["order-0", "order-2", "order-5"]

let itemLevel = toRef(props, "itemLevel");

let nodeList = ref([]);

onBeforeUpdate(() => {
  nodeList.value = []
});

// check state of item

const isOpen = ref(false);

const isSelected = ref(false);

const isDisabled = computed(() => {
  return props.items[itemDisabled.value] || props.disabled;
});

const isSelectable = () => {
  return !isDisabled.value || allowSelectDisabled.value;
};

const isOpenable = () => {
  return !isDisabled.value || allowOpenDisabled.value;
};

const isFolder = computed(() => {
  return props.items.children && props.items.children.length;
});

const isFilteredOut = computed(() => {
  if (!filter.value || isFolder.value) return false;

  return (
    props.items[itemName.value]
      .toLowerCase()
      .indexOf(filter.value.toLowerCase()) === -1
  );
});

// control state

let open = () => {
  if (!isOpenable()) {
    return;
  }

  isOpen.value = true;
};

let close = () => {
  isOpen.value = false;
};

let toggle = () => {
  isOpen.value ? close() : open();
};

// item selection

let isEveryChildrenSelected = () => {
  return nodeList.value.every((i) => i.isSelected);
}

let selectChildren = () => {
  nodeList.value.forEach((i) =>
    forNode(i, (i) => i.select(isSelected.value, true))
  );
};

let select = (value, isFolderSelect) => {
  if (!isSelectable() || value === isSelected.value) {
    return;
  }

  isSelected.value = value !== undefined ? value : !isSelected.value;

  if (isSelected.value) {
    selectedItems.value.push(props.items);
  } else {
    selectedItems.value = selectedItems.value.filter((i) => i !== props.items);
  }

  if (isFolderSelect === true || selectIndependent.value) {
    return;
  }

  emit("children-selected");
};

// handle template events

let handleItemClick = () => {
  if (isFolder.value && openOnClick.value) {
    toggle();
  }

  parentEmit("input:click", props.items)
};

let handleChildrenSelected = () => {
  if (!isEveryChildrenSelected()) {
    select(false);

    return;
  }

  select(true);
};

let handleIndicatorClick = () => {
  toggle();
}

let handleItemSelected = () => {
  select();

  if (selectIndependent.value) {
    return;
  }

  selectChildren();
};

defineExpose({
  open,
  close,
  toggle,
  isOpen,
  isFolder,
  isSelected,
  nodeList,
  itemLevel,
  select,
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--tree-transition-duration) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity var(--tree-transition-duration) ease,
    transform var(--tree-transition-duration) ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
