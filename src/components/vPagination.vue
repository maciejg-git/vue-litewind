<template>
  <nav :class="classes.paginationBar.value">
    <a href="" :class="getPrevButtonClass()" @click.prevent="handleClickPrev">
      {{ icons ? "" : "Previous" }}
    </a>
    <a
      href=""
      v-for="(i, index) in pages"
      :key="index"
      :class="getPageClass(i)"
      @click.prevent="handleClickPage(i)"
    >
      {{ i }}
    </a>
    <a href="" :class="getNextButtonClass()" @click.prevent="handleClickNext">
      {{ icons ? "" : "Next" }}
    </a>
  </nav>
</template>

<script>
import { ref, computed, watch, inject } from "vue";
import useStyles from "./composition/use-styles 2";
import { clamp } from "../tools/tools.js";

export default {
  props: {
    modelValue: { type: Number, default: undefined },
    itemsCount: { type: [Number, String], default: undefined },
    itemsPerPage: { type: [Number, String], default: undefined },
    maxPages: { type: [Number, String], default: undefined },
    icons: { type: Boolean, default: false },
    name: { type: String, default: "pagination" },
    theme: { type: String, default: "default" },
    stylePaginationBar: { type: [String, Array], default: "default" },
    stylePage: { type: [String, Array], default: "default" },
    stylePageActive: { type: [String, Array], default: "default" },
    styleDots: { type: [String, Array], default: "default" },
    styleNext: { type: [String, Array], default: "default" },
    stylePrev: { type: [String, Array], default: "default" },
  },
  setup(props, { emit }) {
    let { classes } = useStyles(props, {
      paginationBar: {
        fixed: "fixed-pagination-bar"
      },
      page: {
        fixed: "fixed-page"
      },
      pageActive: {
        fixed: "fixed-page-active"
      },
      dots: {
        fixed: "fixed-page"
      },
      next: {
        fixed: "fixed-control",
        prop: computed(() => props.icons ? "btn-next" : "")
      },
      prev: {
        fixed: "fixed-control",
        prop: computed(() => props.icons ? "btn-prev" : "")
      },
    })

    let getPageClass = (p) => {
      if (p == "...") return classes.dots.value;
      if (currentPage.value == p) return classes.pageActive.value;
      return classes.page.value;
    };

    let getPrevButtonClass = () => {
      if (currentPage.value == 1) {
        return [...classes.prev.value, "pointer-events-none", "opacity-50"];
      }
      return classes.prev.value;
    };

    let getNextButtonClass = () => {
      if (currentPage.value == pagesCount.value) {
        return [...classes.next.value, "pointer-events-none", "opacity-50"];
      }
      return classes.next.value;
    };

    let currentPage = ref(1);

    watch(
      () => props.modelValue,
      () =>
        (currentPage.value =
          typeof props.modelValue === "number" && props.modelValue),
      { immediate: true }
    );

    let pagesCount = computed(() =>
      Math.ceil(props.itemsCount / props.itemsPerPage)
    );

    let pages = computed(() => {
      let max = props.maxPages > 3 ? props.maxPages : 3;
      max = max > pagesCount.value ? pagesCount.value : max;
      let s = currentPage.value - Math.ceil(max / 2) + 1;
      s = clamp(s, 1, pagesCount.value - max + 1);
      let p = Array.from({ length: max }, (v, i) => i + s);
      if (max >= 5) {
        if (p[0] != 1) p.splice(0, 2, 1, "...");
        if (p[max - 1] != pagesCount.value)
          p.splice(max - 2, 2, "...", pagesCount.value);
      }
      return p;
    });

    let handleClickNext = function () {
      let p = currentPage.value + 1;
      currentPage.value = p >= pagesCount.value ? pagesCount.value : p;
      emit("update:modelValue", currentPage.value);
    };

    let handleClickPrev = function () {
      let p = currentPage.value - 1;
      currentPage.value = p <= 1 ? 1 : p;
      emit("update:modelValue", currentPage.value);
    };

    let handleClickPage = function (p) {
      if (p == "...") return;
      currentPage.value = p;
      emit("update:modelValue", currentPage.value);
    };

    return {
      classes,
      getPageClass,
      getPrevButtonClass,
      getNextButtonClass,
      currentPage,
      pagesCount,
      pages,
      handleClickNext,
      handleClickPrev,
      handleClickPage,
    };
  },
};
</script>

<style scoped>
.fixed-pagination-bar {
  @apply relative z-0 flex flex-row w-min
}
.fixed-page {
  @apply z-10 cursor-pointer flex justify-center items-center
}
.fixed-page-active {
  @apply z-20 cursor-pointer flex justify-center items-center
}
.fixed-control {
  @apply flex flex-col justify-center items-center
}
.btn-next:before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-right' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
  max-height: 16px;
}
.btn-prev:before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-left' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E");
  max-height: 16px;
}
</style>
