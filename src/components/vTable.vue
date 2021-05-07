<template>
  <table :class="classes.table.value" class="min-w-full text-left">
    <caption :class="classes.caption.value">
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
      <template v-if="!items.length">
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
        <transition-group :name="transition">
          <tr
            v-for="(item, i) in itemsPagination"
            :key="i"
            :class="classes.row.value"
          >
            <template v-for="k in headers">
              <td
                v-if="k.visible !== false"
                :class="[
                  k.class && typeof k.class === 'function'
                    ? k.class(k.key, item[k.key], item)
                    : '',
                  ...classes.cell.value,
                ]"
              >
                <slot :name="'cell:' + k.key" :value="item[k.key]" :item="item">
                  {{ getItemValue(item, k) }}
                </slot>
              </td>
            </template>
          </tr>
        </transition-group>
      </template>
    </tbody>
  </table>
</template>

<script>
import { ref, computed, watch, onMounted, getCurrentInstance } from "vue";
import useStyles from "../use-styles";
import {
  formatCase,
  compare,
  isDate,
  undefNullToStr,
  removeTailwindClasses,
} from "../tools.js";

export default {
  props: {
    definition: { type: Array, default: () => [] },
    items: { type: Array, default: () => [] },
    filter: { type: String, default: "" },
    page: { type: Number, default: 1 },
    itemsPerPage: { type: Number, default: 0 },
    captionTop: { type: Boolean, default: false },
    emptyText: { type: String, default: "Empty table" },
    emptyFilteredText: {
      type: String,
      default: "No records for current filter",
    },
    locale: { type: String, default: "en" },
    transition: { type: String, default: "fade-slide" },
    name: { type: String, default: "table" },
    table: { type: String, default: "default" },
    headerRow: { type: String, default: "default" },
    headerCell: { type: String, default: "default" },
    row: { type: String, default: "default" },
    cell: { type: String, default: "default" },
    caption: { type: String, default: "default" },
  },
  setup(props, { emit }) {
    let elements = [
      "table",
      "headerRow",
      "headerCell",
      "row",
      "cell",
      "caption",
    ];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let classes = {
      table: computed(() => {
        let c = [...styles.table.value];
        return removeTailwindClasses(c);
      }),
      headerRow: computed(() => {
        let c = [...styles.headerRow.value];
        return removeTailwindClasses(c);
      }),
      headerCell: computed(() => {
        let c = [...styles.headerCell.value];
        return removeTailwindClasses(c);
      }),
      row: computed(() => {
        let c = [...styles.row.value];
        return removeTailwindClasses(c);
      }),
      cell: computed(() => {
        let c = [...styles.cell.value];
        return removeTailwindClasses(c);
      }),
      caption: computed(() => {
        let c = [
          ...styles.caption.value,
          props.captionTop ? "caption-top" : "caption-bottom",
        ];
        return removeTailwindClasses(c);
      }),
    };

    let sortField = ref("");
    let sortAsc = ref(1);

    onMounted(() => {
      if (props.items) emit("update:itemsFilteredCount", props.items.length);
    });

    let items = computed(() => [...props.items]);

    let getItemValue = (i, k) => {
      return typeof k.f === "function" ? k.f(k.key, i[k.key], i) : i[k.key];
    };

    let itemCompare = (a, b, h, localeCompare) => {
      a = (h.sortByFunction && getItemValue(a, h)) || a[h.key];
      b = (h.sortByFunction && getItemValue(b, h)) || b[h.key];
      a = undefNullToStr(a);
      b = undefNullToStr(b);
      if (
        (isDate(a) && isDate(b)) ||
        (typeof a == "number" && typeof b == "number")
      ) {
        return compare(a, b) * sortAsc.value;
      } else return localeCompare(a, b) * sortAsc.value;
    };

    let itemsSorted = computed(() => {
      if (!sortField.value) return items.value;
      let h = getHeaderKey(sortField.value);
      let c = new Intl.Collator(props.locale).compare;
      return items.value.sort((a, b) => itemCompare(a, b, h, c));
    });

    let itemsFiltered = computed(() => {
      let regexp = null;
      let validFilter = true;
      try {
        regexp = new RegExp(props.filter, "i");
        validFilter = true;
      } catch (e) {
        validFilter = false;
      }
      if (!props.filter || !validFilter) return itemsSorted.value;
      let keys = headers.value.filter(
        (k) => k.filterable !== false && k.visible !== false
      );
      return itemsSorted.value.filter((item) => {
        let s = null;
        for (let k of keys) {
          s = (k.filterByFunction && getItemValue(item, k)) || item[k.key];
          s = undefNullToStr(s);
          if (("" + s).search(regexp) != -1) return item;
        }
      });
    });

    let itemsPagination = computed(() => {
      if (!props.itemsPerPage) return itemsFiltered.value;
      return itemsFiltered.value.slice(
        (props.page - 1) * props.itemsPerPage,
        props.page * props.itemsPerPage
      );
    });

    let getHeaderKey = (k) => headers.value.find(i => k === i.key)

    let setHeaders = () => {
      if (!props.items || !props.items.length) return;
      return Object.keys(props.items[0]).map((item) => {
        return {
          key: item,
          label: formatCase(item),
        };
      });
    };

    let headersCount = computed(
      () => headers.value.filter((i) => i.visible !== false).length
    );

    let headers = computed(() => {
      if (props.definition) {
        return props.definition.map((item) => {
          return {
            ...item,
            label: item.label || formatCase(item.key),
          };
        });
      } else return setHeaders();
    });

    watch(itemsFiltered, () => {
      emit("update:page", 1);
      emit("update:itemsFilteredCount", itemsFiltered.value.length);
    });

    let handleHeaderClick = function (key, index) {
      if (!headers.value[index].sortable) return;
      sortAsc.value = sortField.value == key ? -sortAsc.value : 1;
      sortField.value = key;
    };

    return {
      classes,
      headers,
      sortField,
      sortAsc,
      getItemValue,
      handleHeaderClick,
      itemsFiltered,
      itemsPagination,
      headersCount,
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
