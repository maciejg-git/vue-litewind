<template>
  <nav :class="classes.container.value">
    <a
      href=""
      :class="[classes.prev.value, { disabled: currentPage == 1 }]"
      @click.prevent="handleClickPage('previous')"
    >
      {{ icons ? "" : "Previous" }}
    </a>
    <a
      href=""
      v-for="i in pages"
      :key="i"
      :class="currentPage == i ? classes.pageActive.value : classes.page.value"
      @click.prevent="handleClickPage(i)"
      >{{ i }}</a
    >
    <a
      href=""
      :class="[classes.next.value, { disabled: currentPage == pages }]"
      @click.prevent="handleClickPage('next')"
    >
      {{ icons ? "" : "Next" }}
    </a>
  </nav>
</template>

<script>
import { ref, computed, getCurrentInstance } from "vue";
import useStyles from "../use-styles";
import { removeTailwindClasses } from "../tools.js";

export default {
  props: {
    modelValue: Number,
    itemsCount: { type: Number, default: undefined },
    itemsPerPage: { type: Number, default: undefined },
    icons: { type: Boolean, default: false },
    name: { type: String, default: "pagination" },
    container: { type: [String, Array], default: "default" },
    page: { type: [String, Array], default: "default" },
    pageActive: { type: [String, Array], default: "default" },
    next: { type: [String, Array], default: "default" },
    prev: { type: [String, Array], default: "default" },
  },
  setup(props, { emit }) {
    let elements = ["container", "page", "pageActive", "next", "prev"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClass = {
      container: ["relative", "z-0", "flex", "flex-row", "w-min"],
      page: ["z-10"],
      pageActive: ["z-20"],
      next: ["flex", "flex-col", "justify-center"],
      prev: ["flex", "flex-col", "justify-center"],
    };

    let currentPage = ref(1);

    let classes = {
      container: computed(() => {
        let c = [...fixedClass.container, ...styles.container.value];
        return removeTailwindClasses(c);
      }),
      page: computed(() => {
        let c = [...fixedClass.page, ...styles.page.value];
        return removeTailwindClasses(c);
      }),
      pageActive: computed(() => {
        let c = [...fixedClass.pageActive, ...styles.pageActive.value];
        return removeTailwindClasses(c);
      }),
      prev: computed(() => {
        let c = [
          ...fixedClass.prev,
          ...styles.prev.value,
          props.icons ? "btn-prev" : "",
        ];
        return removeTailwindClasses(c);
      }),
      next: computed(() => {
        let c = [
          ...fixedClass.next,
          ...styles.next.value,
          props.icons ? "btn-next" : "",
        ];
        return removeTailwindClasses(c);
      }),
    };

    let pages = computed(() => {
      let i = Math.ceil(props.itemsCount / props.itemsPerPage);
      return i <= 0 ? 1 : i;
    });

    let handleClickPage = function(index) {
      let i =
        index == "next"
          ? currentPage.value + 1
          : index == "previous"
          ? currentPage.value - 1
          : index;
      currentPage.value = i >= pages.value ? pages.value : i <= 1 ? 1 : i;
      emit("update:modelValue", currentPage.value);
    };

    return {
      classes,
      currentPage,
      pages,
      handleClickPage,
    };
  },
};
</script>

<style scoped>
.btn-next:before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-right' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
  max-height: 16px;
}
.btn-prev:before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-left' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E");
  max-height: 16px;
}
</style>
