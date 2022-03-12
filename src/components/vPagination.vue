<template>
  <nav :class="classes.paginationBar.value">
    <a href="" :class="getPrevButtonClass()" @click.prevent="handleClickPrev">
      <chevron-left />
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
      <chevron-right />
    </a>
  </nav>
</template>

<script>
import { ref, computed, watch } from "vue";
import useStyles from "./composition/use-styles";
import { clamp, getNumberRange, isNumber } from "../tools.js";
import ChevronLeft from "./icons/chevron-left.js";
import ChevronRight from "./icons/chevron-right.js";

export default {
  props: {
    modelValue: { type: Number, default: undefined },
    itemsCount: { type: Number, default: undefined },
    itemsPerPage: { type: Number, default: undefined },
    maxPages: { type: Number, default: undefined },
    name: { type: String, default: "pagination" },
    stylePaginationBar: { type: [String, Array], default: "default" },
    stylePage: { type: [String, Array], default: "" },
    styleDots: { type: [String, Array], default: "" },
    styleNext: { type: [String, Array], default: "" },
    stylePrev: { type: [String, Array], default: "" },
    variant: { type: String, default: ""},
  },
  components: {
    ChevronLeft,
    ChevronRight,
  },
  setup(props, { emit }) {
    let { classes, states } = useStyles("pagination", props, {
      paginationBar: {
        name: "pagination-bar",
        fixed: "fixed-pagination-bar",
      },
      page: {
        fixed: "fixed-page",
        states: ["active"],
      },
      dots: {
        fixed: "fixed-page",
      },
      next: {
        fixed: "fixed-control",
      },
      prev: {
        fixed: "fixed-control",
      },
    });

    let getPageClass = (page) => {
      if (page === "...") return classes.dots.value;
      if (currentPage.value == page) {
        return ["z-20", classes.page.value, states.page.value.active];
      }
      return classes.page.value;
    };

    let getPrevButtonClass = () => {
      return [
        classes.prev.value,
        currentPage.value == 1 ? "pointer-events-none opacity-50" : "",
      ];
    };

    let getNextButtonClass = () => {
      return [
        classes.next.value,
        currentPage.value == pagesCount.value
          ? "pointer-events-none opacity-50"
          : "",
      ];
    };

    let currentPage = ref(1);

    // calculate total number of pages
    let pagesCount = computed(() => {
      // if itemsPerPage or itemsCount prop is 0 then show only single page
      if (props.itemsPerPage <= 0 || props.itemsCount <= 0) return 1;
      return Math.ceil(props.itemsCount / props.itemsPerPage);
    });

    // calculate number of pages do display
    let maxPagesCount = () => {
      return Math.min(pagesCount.value, Math.max(props.maxPages, 3));
    };

    let validateModel = () => {
      let m = +props.modelValue;
      return isNumber(m) && m > 0 && m <= pagesCount.value
    }

    // watch for model changes and update current page
    watch(
      () => props.modelValue,
      () => {
        if (validateModel()) currentPage.value = props.modelValue;
      },
      { immediate: true }
    );

    let pages = computed(() => {
      let maxPages = maxPagesCount();
      // calculate first page
      let first = currentPage.value - Math.ceil(maxPages / 2) + 1;
      first = clamp(first, 1, pagesCount.value - maxPages + 1);
      // generate following pages
      let p = getNumberRange(first, maxPages);
      // add dots pages if needed
      if (maxPages >= 5) {
        if (p[0] != 1) {
          p.splice(0, 2, 1, "...");
        }
        if (p[maxPages - 1] != pagesCount.value) {
          p.splice(maxPages - 2, 2, "...", pagesCount.value);
        }
      }
      return p;
    });

    // handle template events
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
  @apply relative z-0 flex flex-row w-min;
}
.fixed-page {
  @apply z-10 cursor-pointer flex justify-center items-center transition-all;
}
.fixed-control {
  @apply flex flex-col justify-center items-center;
}
</style>
