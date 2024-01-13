<template>
  <table
    :class="[
      classes.table.value,
      state == 'busy' ? ['pointer-events-none'] : '',
    ]"
  >
    <caption
      v-if="$slots.caption"
      :class="classes.caption.value"
    >
      <!-- @slot caption -->
      <slot name="caption"></slot>
    </caption>

    <thead
      v-if="!noHeader"
      :class="classes.headerRow.value"
    >
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
                  class="ml-3 h-4 w-4 opacity-30"
                ></v-icon>
                <v-icon
                  v-else-if="sortKey == h.key && sortAsc == 1"
                  :name="CaretUpIcon"
                  class="ml-3 h-4 w-4 opacity-70"
                ></v-icon>
                <v-icon
                  v-else-if="sortKey == h.key && sortAsc == -1"
                  :name="CaretDownIcon"
                  class="ml-3 h-4 w-4 opacity-70"
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
            <!-- @slot busy -->
            <slot name="busy"></slot>
          </td>
        </tr>
      </template>
      <template v-else-if="!items.length">
        <tr>
          <td
            :colspan="headersCount"
            class="py-4 text-center"
          >
            <!-- @slot empty-table-message -->
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
            class="py-4 text-center"
          >
            <!-- @slot empty-filtered-table-message -->
            <slot name="empty-filtered-table-message">
              {{ emptyFilteredText }}
            </slot>
          </td>
        </tr>
      </template>
      <template v-else>
        <template
          v-for="(item, index) in itemsPaginated"
          :key="item[primaryKey] || index"
        >
          <tr
            :class="classes.row.value"
            @click="handleRowClick(index)"
          >
            <template v-for="k in definition">
              <td
                v-if="k.visible !== false"
                :class="getCellClass(k, index, item)"
              >
                <!-- @slot cell:[key] -->
                <slot
                  :name="'cell:' + k.key"
                  :value="item[k.key]"
                  :item="item"
                >
                  {{ getRecordPropertyByKey(item, k) }}
                </slot>
              </td>
            </template>
          </tr>
          <tr
            v-if="item.colspan"
            :class="[...classes.row.value]"
          >
            <td :colspan="headersCount">
              <!-- @slot colspan -->
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
import { ref, computed, watch, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import vIcon from "./vIcon.vue";
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
import { sharedProps, sharedModProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("table", [
    "Table",
    "HeaderRow",
    "HeaderCell",
    "Row",
    "Cell",
    "Caption",
  ]),
  definition: {
    type: Array,
    default: undefined,
  },
  items: {
    type: Array,
    default: undefined,
    required: true,
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
  noHeader: {
    type: Boolean,
    default: false,
  },
  primaryKey: {
    type: String,
    default: undefined,
    required: true,
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
});

let emit = defineEmits([
  "update:page",
  "update:filtered-count",
  "input:selection",
]);

let { table } = inject("mods", {})

let elements = {
  table: null,
  headerRow: null,
  headerCell: null,
  row: null,
  cell: {
    computed: computed(() => (props.selectionMode !== "" ? "cursor-pointer" : "")),
    dataStyle: true,
  },
  caption: {
    computed: computed(() => (props.captionTop ? "caption-top" : "caption-bottom"))
  }
}

let { classes, setState, dataStyle } = useTailwindStyles(props, table, elements)

let getCellClass = (k, index, item) => {
  return [
    classes.cell.value,
    k.class &&
      typeof k.class === "function" &&
      k.class(k.key, item[k.key], item),
    dataStyle.cell && dataStyle.cell(index, item)
  ];
};

watch(() => props.state, (value) => {
  setState(value)
})

/* table definition */

let definitionDefaults = {
  sortable: false,
  filterable: true,
  visible: true,
  filterByFunction: true,
  sortByFunction: true,
};

let getDefinitionByKey = (k) => {
  return definition.value.find((i) => k === i.key);
};

let headersCount = computed(() => {
  return definition.value.filter((i) => i.visible !== false).length;
});

// use first row of data to generate default definition
let generateDefinitionFromData = () => {
  if (!props.items || !props.items.length) return [];

  return Object.keys(props.items[0])
    .filter((i) => i !== "colspan")
    .map((item) => {
      return { key: item };
    });
};

// check if user definition is valid
let getUserDefinition = () => {
  if (!Array.isArray(props.definition)) return false;
  return props.definition.every((i) => i.key) && props.definition;
};

// compute final definition
// first try to get user definition, if it is not provided or invalid
// generate definition from data.
let definition = computed(() => {
  let definition = getUserDefinition() || generateDefinitionFromData();

  return definition.map((i) => {
    return {
      ...definitionDefaults,
      ...i,
      label: i.label || formatCase(i.key),
    };
  });
});

/* data */

// clone data
let items = computed(() => [...props.items]);

let getRecordPropertyByKey = (record, definition, skipFunction) => {
  return skipFunction || typeof definition.f !== "function"
    ? record[definition.key]
    : definition.f(definition.key, record[definition.key], record);
};

let sortKey = ref("");
let sortAsc = ref(1);

// compare function for sort
let itemCompare = (a, b, definition, localeCompare) => {
  a = getRecordPropertyByKey(a, definition, !definition.sortByFunction);
  b = getRecordPropertyByKey(b, definition, !definition.sortByFunction);
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

// final array to display is a result of three computed properties run in order
// itemsPaginated, itemsFiltered, itemsSorted.
// sort: return sorted items, if no sorting is active return unmodified data
let itemsSorted = computed(() => {
  if (!sortKey.value) return items.value;

  let key = getDefinitionByKey(sortKey.value);
  let compare = new Intl.Collator(props.locale).compare;

  return items.value.sort((a, b) => itemCompare(a, b, key, compare));
});

// return filter regexp or generate regexp from filter string
let getFilterRegexp = () => {
  let f = props.filter;

  if (isRegexp(f)) return f;

  // escape special characters
  return new RegExp(f.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"), "i");
};

let getFilterableKeys = () => {
  return definition.value.filter(
    (k) => k.filterable !== false && k.visible !== false
  );
};

// filter: return filtered items, if filter prop is empty return sorted items
let itemsFiltered = computed(() => {
  if (!props.filter) return itemsSorted.value;

  let regexp = getFilterRegexp();
  let keys = getFilterableKeys();

  return itemsSorted.value.filter((item) => {
    return keys.some((key) => {
      let s = getRecordPropertyByKey(item, key, !key.filterByFunction);
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

// pagination: return paginated items, if no pagination is used return filtered items
let itemsPaginated = computed(() => {
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

/* row selection */

let validSelectionModes = ["single", "multiple"];

let isValidSelectionMode = () => {
  return validSelectionModes.includes(props.selectionMode);
};

let itemsSelected = ref({});

let selectRow = (i) => {
  itemsSelected.value[i] = itemsPaginated.value[i];
};

let unselectRow = (i) => delete itemsSelected.value[i];

let resetSelection = () => {
  for (let i of Object.keys(itemsSelected.value)) unselectRow(i);
};

// emit new selection
watch(itemsSelected.value, () => {
  emit("input:selection", Object.values(itemsSelected.value));
});

// reset selection if selectionMode, items or sorting changes
watch([() => props.selectionMode, itemsPaginated, sortKey, sortAsc], () =>
  resetSelection()
);

/* template events */

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
</style>
