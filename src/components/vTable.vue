<template>
  <table
    :class="[
      classes.table.value,
      state == 'busy' ? [states.table.busy.value, 'pointer-events-none'] : '',
    ]"
    class="min-w-full"
  >
    <caption v-if="slots.caption" :class="classes.caption.value">
      <slot name="caption"></slot>
    </caption>
    <thead :class="classes.headerRow.value">
      <tr>
        <template v-for="(h, i) in headers">
          <th
            v-if="headers[i].visible !== false"
            @click="handleHeaderClick(h.key, i)"
            :class="[
              {
                sortable: h.sortable && sortField != h.key,
                'sort-asc': h.sortable && sortField == h.key && sortAsc == 1,
                'sort-desc': h.sortable && sortField == h.key && sortAsc == -1,
                'cursor-pointer': h.sortable,
              },
              ...classes.headerCell.value,
            ]"
          >
            {{ h.label }}
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-if="busy && slots.busy">
        <tr>
          <td :colspan="headersCount">
            <div class="flex justify-center">
              <slot name="busy"></slot>
            </div>
          </td>
        </tr>
      </template>
      <template v-else-if="!items.length">
        <tr>
          <td :colspan="headersCount" class="text-center py-2">
            {{ emptyText }}
          </td>
        </tr>
      </template>
      <template v-else-if="!itemsFiltered.length">
        <tr>
          <td :colspan="headersCount" class="text-center py-2">
            {{ emptyFilteredText }}
          </td>
        </tr>
      </template>
      <template v-else>
        <tr
          v-for="(item, i) in itemsPagination"
          :key="item[primaryKey] || i"
          :class="[...classes.row.value]"
          @click="handleRowClick(i)"
        >
          <template v-for="k in headers">
            <td v-if="k.visible !== false" :class="getCellClass(k, i, item)">
              <slot :name="'cell:' + k.key" :value="item[k.key]" :item="item">
                {{ getItemValue(item, k) }}
              </slot>
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
import { ref, computed, watch } from "vue";
import useStyles from "./composition/use-styles";
import {
  formatCase,
  compare,
  isDate,
  isRegexp,
  undefNullToStr,
} from "../tools/tools.js";

export default {
  props: {
    definition: { type: Array, default: () => [] },
    items: { type: Array, default: () => [] },
    filter: { type: [String, RegExp], default: "" },
    page: { type: [Number, String], default: 1 },
    itemsPerPage: { type: [Number, String], default: 0 },
    primaryKey: { type: [Number, String], default: undefined },
    captionTop: { type: Boolean, default: false },
    emptyText: { type: String, default: "Empty table" },
    emptyFilteredText: {
      type: String,
      default: "No records for current filter",
    },
    locale: { type: String, default: "en" },
    busy: { type: Boolean, default: false },
    selectionMode: { type: String, default: "" },
    state: { type: String, default: "" },
    name: { type: String, default: "table" },
    styleTable: { type: String, default: "" },
    styleHeaderRow: { type: String, default: "" },
    styleHeaderCell: { type: String, default: "" },
    styleRow: { type: String, default: "" },
    styleCell: { type: String, default: "" },
    styleSelected: { type: String, default: "" },
    styleCaption: { type: String, default: "" },
  },
  setup(props, { slots, emit }) {
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
        prop: computed(() =>
          props.selectionMode !== "" ? "cursor-pointer" : ""
        ),
      },
      selected: {
        prop: computed(() =>
          props.selectionMode !== "" ? "cursor-pointer" : ""
        ),
      },
      caption: {
        prop: computed(() =>
          props.captionTop ? "caption-top" : "caption-bottom"
        ),
      },
    });

    let getCellClass = (k, i, item) => {
      if (itemsSelected.value[i]) return classes.selected.value;
      return [
        classes.cell.value,
        k.class && typeof k.class === "function"
          ? k.class(k.key, item[k.key], item)
          : "",
      ];
    };

    let sortField = ref("");
    let sortAsc = ref(1);

    // DATA

    // clone data to avoid modifing data
    let items = computed(() => [...props.items]);

    let getItemValue = (i, k) => {
      return typeof k.f === "function" ? k.f(k.key, i[k.key], i) : i[k.key];
    };

    let itemCompare = (a, b, h, localeCompare) => {
      a = (h.sortByFunction && getItemValue(a, h)) || a[h.key];
      b = (h.sortByFunction && getItemValue(b, h)) || b[h.key];
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

    // return sorted items, if no sorting is active return local items
    let itemsSorted = computed(() => {
      if (!sortField.value) return items.value;
      let h = getHeaderKey(sortField.value);
      let c = new Intl.Collator(props.locale).compare;
      return items.value.sort((a, b) => itemCompare(a, b, h, c));
    });

    // if filter prop is regexp return it, if it is string
    // return new regexp from string
    let getFilterRegexp = () => {
      let f = props.filter;
      if (isRegexp(f)) return f;
      return new RegExp(f.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"), "i");
    };

    // return filtered items, if no filter is active return sorted items
    let itemsFiltered = computed(() => {
      if (!props.filter) return itemsSorted.value;
      let regexp = getFilterRegexp();
      let keys = getFilterableKeys();
      return itemsSorted.value.filter((item) => {
        for (let k of keys) {
          let s = (k.filterByFunction && getItemValue(item, k)) || item[k.key];
          s = undefNullToStr(s);
          if (("" + s).search(regexp) != -1) return item;
        }
      });
    });

    // after each filtering return new item count so external pagination
    // can update and reset current page to 1
    watch(
      itemsFiltered,
      () => {
        emit("update:page", 1);
        emit("update:filtered-count", itemsFiltered.value.length);
      },
      { immediate: true }
    );

    // return paginated items, if no pagination is used return filtered items
    let itemsPagination = computed(() => {
      if (!props.itemsPerPage) return itemsFiltered.value;
      return itemsFiltered.value.slice(
        (props.page - 1) * props.itemsPerPage,
        props.page * props.itemsPerPage
      );
    });

    // HEADERS

    let d = {
      sortable: false,
      filterable: true,
      visible: true,
      filterByFunction: true,
      sortByFunction: true,
    };

    let getHeaderKey = (k) => headers.value.find((i) => k === i.key);

    let getFilterableKeys = () => {
      return headers.value.filter(
        (k) => k.filterable !== false && k.visible !== false
      );
    };

    // no definition is provided, use first row to generate local definition
    let setHeaders = () => {
      if (!props.items || !props.items.length) return;
      return Object.keys(props.items[0]).map((item) => {
        return {
          key: item,
          label: formatCase(item),
          ...d,
        };
      });
    };

    let headersCount = computed(
      () => headers.value.filter((i) => i.visible !== false).length
    );

    // definition is provided, generate local definition and mix it
    // with defaults
    let headers = computed(() => {
      if (props.definition) {
        return props.definition.map((i) => {
          return {
            ...d,
            ...i,
            label: i.label || formatCase(i.key),
          };
        });
      } else return setHeaders();
    });

    // SELECTION

    let itemsSelected = ref({});

    let unselectRow = (i) => delete itemsSelected.value[i];

    let resetSelection = () => {
      for (let p of Object.keys(itemsSelected.value)) unselectRow(p);
    };

    let isValidSelectionMode = () =>
      props.selectionMode == "single" || props.selectionMode == "multiple";

    let selectRow = (i) => (itemsSelected.value[i] = itemsPagination.value[i]);

    // emit new selection
    watch(itemsSelected.value, () => {
      emit("input:selection", Object.values(itemsSelected.value));
    });

    // clear selection if selection mode or page changes
    watch([() => props.selectionMode, itemsPagination], () => resetSelection());

    // HANDLE TEMPLATE EVENTS

    // handle selection
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
      if (!headers.value[index].sortable) return;
      sortAsc.value = sortField.value == key ? -sortAsc.value : 1;
      sortField.value = key;
    };

    return {
      slots,
      classes,
      states,
      getCellClass,
      headers,
      sortField,
      sortAsc,
      getItemValue,
      items,
      itemsFiltered,
      itemsPagination,
      itemsSelected,
      headersCount,
      handleRowClick,
      handleHeaderClick,
    };
  },
};
</script>

<style scoped>
.sortable {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-dash' viewBox='0 0 16 16'%3E%3Cpath d='M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 3% center;
}
.sort-asc {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-up' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 3% center;
}
.sort-desc {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 3% center;
}

.caption-bottom {
  caption-side: bottom;
}
.caption-top {
  caption-side: top;
}
</style>
