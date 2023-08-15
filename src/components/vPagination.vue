<template>
  <nav
    :class="classes.paginationBar.value"
    role="navigation"
    aria-label="Pagination navigation"
  >
    <a
      href=""
      role="button"
      aria-label="Previous page"
      :aria-disabled="isOnFirstPage()"
      :class="getPrevButtonClass()"
      @click.prevent="handleClickPrev"
    >
      <chevron-left />
    </a>
    <a
      v-for="(page, index) in pages"
      href=""
      role="button"
      :aria-label="'Page ' + page"
      :aria-current="isCurrent(page)"
      :key="index"
      :class="getPageClass(page)"
      @click.prevent="handleClickPage(page)"
    >
      {{ page }}
    </a>
    <a
      href=""
      role="button"
      aria-label="Next page"
      :aria-disabled="isOnLastPage()"
      :class="getNextButtonClass()"
      @click.prevent="handleClickNext"
    >
      <chevron-right />
    </a>
  </nav>
</template>

<script setup>
import { ref, computed, watch, inject } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import ChevronLeft from "./icons/chevron-left.js";
import ChevronRight from "./icons/chevron-right.js";
import { clamp, getNumberRange, isNumber } from "../tools.js";
import { sharedProps, sharedModProps } from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("pagination", [
    "PaginationBar",
    "Page",
    "Dots",
    "Button",
  ]),
  modelValue: {
    type: Number,
    default: undefined,
  },
  itemsCount: {
    type: Number,
    default: undefined,
  },
  itemsPerPage: {
    type: Number,
    default: 0,
  },
  maxPages: {
    type: Number,
    default: undefined,
  },
});

const emit = defineEmits(["update:modelValue"]);

let { pagination } = inject("mods", {})

let elements = {
  paginationBar: {
    fixed: "relative z-0 flex w-auto",
  },
  page: {
    fixed: "z-10 cursor-pointer flex justify-center items-center transition-shadow flex-none",
    externalVariants: ["variant"],
  },
  dots: {
    fixed: "z-10 cursor-pointer flex justify-center items-center transition-shadow flex-none"
  },
  button: {
    fixed: "flex flex-col justify-center items-center",
    externalVariants: ["direction"],
  }
}

let { classes, variants } = useTailwindStyles(props, pagination, elements)

let isCurrent = (page) => currentPage.value === page;

let getPageClass = (page) => {
  if (page === "...") return classes.dots.value;
  if (isCurrent(page)) {
    return ["z-20", classes.page.value, variants.page.active];
  }
  return [classes.page.value, variants.page.default];
};

let getPrevButtonClass = () => {
  return [
    classes.button.value,
    variants.button.prev,
    isOnFirstPage() ? "pointer-events-none opacity-50" : "",
  ];
};

let getNextButtonClass = () => {
  return [
    classes.button.value,
    variants.button.next,
    isOnLastPage() ? "pointer-events-none opacity-50" : "",
  ];
};

let currentPage = ref(1);

let isOnFirstPage = () => {
  return currentPage.value === 1;
};

let isOnLastPage = () => {
  return currentPage.value === pagesCount.value;
};

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
  return isNumber(m) && m > 0 && m <= pagesCount.value;
};

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
  // add first, last and dots pages if needed
  if (maxPages >= 5) {
    if (p[0] != 1) {
      p[0] = 1;
      p[1] = "...";
    }
    if (p[p.length - 1] != pagesCount.value) {
      p[p.length - 1] = pagesCount.value;
      p[p.length - 2] = "...";
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
</script>

<style scoped></style>
