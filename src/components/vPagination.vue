<template>
  <nav :class="classes.pagainationBar.value">
    <a
      href=""
      :class="[classes.prev.value, { disabled: currentPage == 1 }]"
      @click.prevent="handleClickPrev"
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
      @click.prevent="handleClickNext"
    >
      {{ icons ? "" : "Next" }}
    </a>
  </nav>
</template>

<script>
import { ref, computed, getCurrentInstance } from "vue";
import useStyles from "../use-styles";
import { clamp, removeTailwindClasses } from "../tools.js";

export default {
  props: {
    modelValue: Number,
    itemsCount: { type: Number, default: undefined },
    itemsPerPage: { type: Number, default: undefined },
    maxPages: { type: Number, default: undefined },
    icons: { type: Boolean, default: false },
    name: { type: String, default: "pagination" },
    pagainationBar: { type: [String, Array], default: "default" },
    page: { type: [String, Array], default: "default" },
    pageActive: { type: [String, Array], default: "default" },
    next: { type: [String, Array], default: "default" },
    prev: { type: [String, Array], default: "default" },
  },
  setup(props, { emit }) {
    let elements = ["pagainationBar", "page", "pageActive", "next", "prev"];

    let { styles } = useStyles(getCurrentInstance(), props, elements);

    let fixedClass = {
      pagainationBar: ["relative", "z-0", "flex", "flex-row", "w-min"],
      page: ["z-10", 
  "cursor-pointer",
  "flex",
  "justify-center",
  "items-center",
      ],
      pageActive: ["z-20",
  "cursor-pointer",
  "flex",
  "justify-center",
  "items-center",
      ],
      next: ["flex", "flex-col", "justify-center",
  "items-center",
      ],
      prev: ["flex", "flex-col", "justify-center",
  "items-center",
      ],
    };

    let classes = {
      pagainationBar: computed(() => {
        let c = [...fixedClass.pagainationBar, ...styles.pagainationBar.value];
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

    // 1 2 3 4 5 6 7
    // 1 2 3 4 . 7
    // 1 . 4 5 6 7
    // 1 2 3 4 5 6 7 8
    // 1 2 3 4 5 . 8  7
    // 1 . 4 5 6 7 8
    // 1 2 3 4 . 8
    // 1 . 5 6 7 8
    // 1 2 3 4 5 6 7 8
    // 1 . 4 5 6 7 8
    // 1 2 3 4 5 . 8
    // 1 . 4 5 6 7 8
    // 1 2 3 4 5 6 7 8
    // 1 2 3 4 . 8
    // 1 . 4 5 . 8
    // 1 . 5 6 7 8  6
    // 1 2 3 4 5 6 7
    // 1 2 3 4 5 6 7 8 9 10
    // 1     4 5         10
    // 1   3 4           10
    // 1 2 3 4           10
    // 1           7 8 9 10
    // 1 2 3 4 5 6 7 8 9 10
    // 1     4 5 6       10
    //   2 3 4 5 6 7 8   
    // 1   3 4 5         10
    // 1 2 3 4 5         10
    // 1         6 7 8 9 10
    // 1 2 3 4 5 6 7 8 9 10
    let currentPage = ref(1);

    let pagesCount = computed(() => Math.ceil(props.itemsCount / props.itemsPerPage))


    // let pages = computed(() => {
    //   let max = props.maxPages > 6 ? props.maxPages : 6;
    //   console.log(max)
    //   let i = Math.ceil(props.itemsCount / props.itemsPerPage);
    //   i = i <= 0 ? 1 : i;
    //   if (i > max) {
    //     let first = 1;
    //     let last = i;
    //     let fDots = currentPage.value > (max / 2)
    //     let lDots = currentPage.value < last - Math.ceil(max/2) + 1
    //     let j = max - 2 - (+fDots) - (+lDots)
    //     let p = Array.from({length: j}, (v, i) => i + 2 + (fDots ? currentPage.value-Math.ceil(j/2) - 1 : 0))
    //     if (fDots) p.unshift("...");
    //     if (lDots) p.push("...");
    //     return [first, ...p, last]
    //   }
    // });
    // let pages = computed(() => {
    //   let max = props.maxPages > 6 ? props.maxPages : 6;
    //   console.log(max)
    //   let i = Math.ceil(props.itemsCount / props.itemsPerPage);
    //   i = i <= 0 ? 1 : i;
    //   if (i >= max) {
    //     let f = currentPage.value > (max / 2)
    //     let l = currentPage.value <= i - Math.ceil(max/2) + 1
    //     let j = max - 2 - (+f) - (+l)
    //     // let p = Array.from({length: j}, (v, i) => i + 2 + currentPage.value-Math.ceil(j/2) - 1)
    //     let p = []
    //     let s = f ? currentPage.value-Math.ceil(j/2) : 2;
    //     // s = s > max - 2 ? max - 2 : s
    //     for (let y = s; y < j + s; y++) {
    //       p.push(y)
    //     }
    //     if (f) p.unshift("...");
    //     if (l) p.push("...");
    //     return [1, ...p, i]
    //   }
    // });
    let pages = computed(() => {
      let max = props.maxPages > 3 ? props.maxPages : 3;
      let i = pagesCount.value;
      max = max > i ? i : max;
      // i = i <= 0 ? 1 : i;
      // if (i >= max) {
        // let f = currentPage.value > (max / 2)
        // let l = currentPage.value <= i - Math.ceil(max/2) + 1
        // let j = max - 2 - (+f) - (+l)
        // let p = Array.from({length: j}, (v, i) => i + 2 + currentPage.value-Math.ceil(j/2) - 1)
        // let p = []
        let s = currentPage.value-Math.ceil(max/2) + 1;
        s = clamp(s, 1, i - max + 1);
        // s = s < 1 ? 1 : s >= i - max + 1 ? i - max + 1 : s;
        // s = s > max - 2 ? max - 2 : s
        // for (let y = s; y < max + s; y++) {
        //   p.push(y)
        // }
        let p = Array.from({length: max}, (v, i) => i + s)
        if (max >= 5) {
          if (p[0] != 1) p.splice(0, 2, 1, "...")
            // p[0] = 1;
            // p[1] = "..."
          if (p[max - 1] != i) p.splice(max - 2, 2, "...", i)
            // p[max - 1] = i;
            // p[max - 2] = "..."
        }
        // if (f) p.unshift("...");
        // if (l) p.push("...");
        return p
      // }
    });

    let handleClickNext = function() {
      let p = currentPage.value + 1;
      currentPage.value = p >= pagesCount.value ? pagesCount.value : p;
      emit("update:modelValue", currentPage.value);
    }

    let handleClickPrev = function() {
      let p = currentPage.value - 1;
      currentPage.value = p <= 1 ? 1 : p;
      emit("update:modelValue", currentPage.value);
    }

    let handleClickPage = function(p) {
      currentPage.value = p;
      emit("update:modelValue", currentPage.value);
    };

    return {
      classes,
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
.btn-next:before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-right' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
  max-height: 16px;
}
.btn-prev:before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-chevron-left' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3E%3C/svg%3E");
  max-height: 16px;
}
</style>
