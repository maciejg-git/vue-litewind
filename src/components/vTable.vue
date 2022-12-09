<template>
  <table
    :class="[
      classes.table.value,
      state == 'busy' ? [states.table.value.busy, 'pointer-events-none'] : '',
    ]"
  >
    <caption
      v-if="$slots.caption"
      :class="classes.caption.value"
    >
      <slot name="caption"></slot>
    </caption>

    <thead :class="classes.headerRow.value">
      <tr>
        <template v-for="(h, i) in definition">
          <th
            v-if="definition[i].visible !== false"
            @click="handleHeaderClick(h.key, i)"
            :class="classes.headerCell.value"
          >
            <div
              class="flex items-center"
              :class="{ 'cursor-pointer': h.sortable }"
            >
              {{ h.label }}
              <template v-if="h.sortable">
                <v-icon
                  v-if="sortKey != h.key"
                  :name="SortIcon"
                  class="h-4 w-4 ml-3 opacity-30"
                ></v-icon>
                <v-icon
                  v-else-if="sortKey == h.key && sortAsc == 1"
                  :name="CaretUpIcon"
                  class="h-4 w-4 ml-3 opacity-70"
                ></v-icon>
                <v-icon
                  v-else-if="sortKey == h.key && sortAsc == -1"
                  :name="CaretDownIcon"
                  class="h-4 w-4 ml-3 opacity-70"
                ></v-icon>
              </template>
            </div>
          </th>
        </template>
      </tr>
    </thead>

    <tbody>
      <template v-if="state === 'busy' && $slots.busy">
        <tr>
          <td :colspan="headersCount">
            <slot name="busy"></slot>
          </td>
        </tr>
      </template>
      <template v-else-if="!items.length">
        <tr>
          <td
            :colspan="headersCount"
            class="text-center py-4"
          >
            <slot name="empty-table-message">
              {{ emptyText }}
            </slot>
          </td>
        </tr>
      </template>
      <template v-else-if="!itemsFiltered.length">
        <tr>
          <td
            :colspan="headersCount"
            class="text-center py-4"
          >
            <slot name="empty-filtered-table-message">
              {{ emptyFilteredText }}
            </slot>
          </td>
        </tr>
      </template>
      <template v-else>
        <template
          v-for="(item, index) in itemsPagination"
          :key="item[primaryKey] || index"
        >
          <tr
            :class="[...classes.row.value]"
            @click="handleRowClick(index)"
          >
            <template v-for="k in definition">
              <td
                v-if="k.visible !== false"
                :class="getCellClass(k, index, item)"
              >
                <slot
                  :name="'cell:' + k.key"
                  :value="item[k.key]"
                  :item="item"
                >
                  {{ getKeyValue(item, k) }}
                </slot>
              </td>
            </template>
          </tr>
          <tr
            v-if="item.colspan"
            :class="[...classes.row.value]"
          >
            <td :colspan="headersCount">
              <slot
                name="colspan"
                :item="item"
              ></slot>
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import useStyles from "./composition/use-styles";
import SortIcon from "./icons/sort-solid.js";
import CaretUpIcon from "./icons/caret-up-solid.js";
import CaretDownIcon from "./icons/caret-down-solid.js";
import {
  formatCase,
  compare,
  isDate,
  isRegexp,
  undefNullToStr,
} from "../tools.js";
import { sharedProps, sharedStyleProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("table"),
  definition: {
    type: Array,
    default: undefined,
  },
  items: {
    type: Array,
    default: undefined,
  },
  filter: {
    type: [String, RegExp],
    default: "",
  },
  page: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    default: defaultProps("table", "itemsPerPage", 0),
  },
  primaryKey: {
    type: String,
    default: undefined,
  },
  captionTop: {
    type: Boolean,
    default: defaultProps("table", "captionTop", false),
  },
  emptyText: {
    type: String,
    default: defaultProps("table", "emptyText", "Empty table"),
  },
  emptyFilteredText: {
    type: String,
    default: defaultProps(
      "table",
      "emptyFilteredText",
      "No records for current filter"
    ),
  },
  locale: {
    type: String,
    default: defaultProps("table", "locale", "en-GB"),
  },
  selectionMode: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  styleTable: {
    type: String,
    default: defaultProps("table", "styleTable", ""),
  },
  styleHeaderRow: {
    type: String,
    default: defaultProps("table", "styleHeaderRow", ""),
  },
  styleHeaderCell: {
    type: String,
    default: defaultProps("table", "styleHeaderCell", ""),
  },
  styleRow: {
    type: String,
    default: defaultProps("table", "styleRow", ""),
  },
  styleCell: {
    type: String,
    default: defaultProps("table", "styleCell", ""),
  },
  styleCaption: {
    type: String,
    default: defaultProps("table", "styleCaption", ""),
  },
});

let emit = defineEmits([
  "update:page",
  "update:filtered-count",
  "input:selection",
]);

let { classes, states } = useStyles("table", props, {
  table: {
    states: ["busy"],
  },
  headerRow: {
    name: "header-row",
  },
  headerCell: {
    name: "header-cell",
  },
  row: null,
  cell: {
    states: ["selected"],
    prop: computed(() => (props.selectionMode !== "" ? "cursor-pointer" : "")),
  },
  caption: {
    prop: computed(() => (props.captionTop ? "caption-top" : "caption-bottom")),
  },
});

let getCellClass = (k, index, item) => {
  return [
    classes.cell.value,
    itemsSelected.value[index] && states.cell.value.selected,
    k.class &&
      typeof k.class === "function" &&
      k.class(k.key, item[k.key], item),
  ];
};

// DATA

// clone data
let items = computed(() => [...props.items]);

let getKeyValue = (i, k, skipFunction) => {
  return skipFunction || typeof k.f !== "function"
    ? i[k.key]
    : k.f(k.key, i[k.key], i);
};

// sort

let sortKey = ref("");
let sortAsc = ref(1);

// compare function for sort
let itemCompare = (a, b, key, localeCompare) => {
  a = getKeyValue(a, key, !key.sortByFunction);
  b = getKeyValue(b, key, !key.sortByFunction);
  a = undefNullToStr(a);
  b = undefNullToStr(b);

  if (isDate(a) && isDate(b)) return compare(a, b) * sortAsc.value;

  if (typeof a == "number" && typeof b == "number") {
    if (isNaN(a) && !isNaN(b)) return -1;
    if (!isNaN(a) && isNaN(b)) return 1;
    return compare(a, b) * sortAsc.value;
  }

  return localeCompare(a, b) * sortAsc.value;
};

// return sorted items, if no sorting is active return unmodified data
let itemsSorted = computed(() => {
  if (!sortKey.value) return items.value;

  let key = getDefinitionByKey(sortKey.value);
  let compare = new Intl.Collator(props.locale).compare;

  return items.value.sort((a, b) => itemCompare(a, b, key, compare));
});

// filter

// return filter regexp or generate regexp from filter string
let getFilterRegexp = () => {
  let f = props.filter;

  if (isRegexp(f)) return f;

  return new RegExp(f.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"), "i");
};

let getFilterableKeys = () => {
  return definition.value.filter(
    (k) => k.filterable !== false && k.visible !== false
  );
};

// return filtered items, if no filter is active return sorted items
let itemsFiltered = computed(() => {
  if (!props.filter) return itemsSorted.value;

  let regexp = getFilterRegexp();
  let keys = getFilterableKeys();

  return itemsSorted.value.filter((item) => {
    return keys.some((key) => {
      let s = getKeyValue(item, key, !key.filterByFunction);
      s = undefNullToStr(s) + "";
      return s.search(regexp) !== -1;
    });
  });
});

// after each filtering return new item count and reset current page to 1
watch(
  itemsFiltered,
  () => {
    emit("update:page", 1);
    emit("update:filtered-count", itemsFiltered.value.length);
  },
  { immediate: true }
);

// pagination

// return paginated items, if no pagination is used return filtered items
let itemsPagination = computed(() => {
  if (!props.itemsPerPage) return itemsFiltered.value;

  return itemsFiltered.value.slice(
    (props.page - 1) * props.itemsPerPage,
    props.page * props.itemsPerPage
  );
});

// watch itemsPerPage and reset current page
watch(
  () => props.itemsPerPage,
  () => emit("update:page", 1)
);

// TABLE DEFINITION

let definitionDefaults = {
  sortable: false,
  filterable: true,
  visible: true,
  filterByFunction: true,
  sortByFunction: true,
};

let getDefinitionByKey = (k) => definition.value.find((i) => k === i.key);

let headersCount = computed(() => {
  return definition.value.filter((i) => i.visible !== false).length;
});

// if no definition is provided use first row of data to
// generate local definition
let getDefinition = () => {
  if (!props.items || !props.items.length) return [];

  return Object.keys(props.items[0])
    .filter((i) => i !== "colspan")
    .map((item) => {
      return { key: item };
    });
};

let validateDefinition = () => {
  if (!Array.isArray(props.definition)) return false;
  return props.definition.every((i) => i.key);
};

// generate local definition
let definition = computed(() => {
  let d = (validateDefinition() && props.definition) || getDefinition();

  return d.map((i) => {
    return {
      ...definitionDefaults,
      ...i,
      label: i.label || formatCase(i.key),
    };
  });
});

// row selection
let validSelectionModes = ["single", "multiple"];

let isValidSelectionMode = () => {
  return validSelectionModes.includes(props.selectionMode);
};

let itemsSelected = ref({});

let selectRow = (i) => (itemsSelected.value[i] = itemsPagination.value[i]);

let unselectRow = (i) => delete itemsSelected.value[i];

let resetSelection = () => {
  for (let i of Object.keys(itemsSelected.value)) unselectRow(i);
};

// emit new selection
watch(itemsSelected.value, () => {
  emit("input:selection", Object.values(itemsSelected.value));
});

// reset selection if some variables changes
watch([() => props.selectionMode, itemsPagination, sortKey, sortAsc], () =>
  resetSelection()
);

// HANDLE TEMPLATE EVENTS

// handle row selection
let handleRowClick = function (i) {
  if (!isValidSelectionMode()) return;
  if (itemsSelected.value[i]) {
    unselectRow(i);
    return;
  }
  if (props.selectionMode == "single") {
    if (Object.keys(itemsSelected.value).length) resetSelection();
  }
  selectRow(i);
};

// handle sorting
let handleHeaderClick = function (key, index) {
  if (!definition.value[index].sortable) return;
  sortAsc.value = sortKey.value == key ? -sortAsc.value : 1;
  sortKey.value = key;
};
</script>

<style scoped>
.caption-bottom {
  caption-side: bottom;
}
.caption-top {
  caption-side: top;
}
</style>
