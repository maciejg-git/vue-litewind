<template>
  <div class="mb-4 ml-2 mt-4 text-black dark:text-white">Contents</div>
  <ul class="text-text-600 dark:text-text-300/70">
    <li
      v-for="item in headers"
      :class="{
        'ml-4': item.level === '6',
        'font-bold text-black dark:text-white': item.el === currentHeader,
      }"
    >
      <a
        :href="item.path"
        class="transition-all"
      >
        {{ item.text }}
      </a>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, toRef } from "vue";
import { useRoute } from "vue-router";

let props = defineProps({
  contentElement: {
    type: Object,
    default: null,
  },
});

let route = useRoute();

// get new content headers on route change

let headers = ref([]);
let documentation = toRef(props, "contentElement");

let getHeaders = () => {
  if (!documentation.value) return [];
  return [...documentation.value.querySelectorAll("h4,h5,h6")];
};

watch(
  route,
  () => {
    nextTick(() => {
      headers.value = getHeaders().map((i) => {
        return {
          text: i.innerText,
          level: i.tagName[1],
          id: i.id,
          path: route.path + "#" + i.id,
          el: i,
        };
      });
    });
  },
  { immediate: true }
);

// simple scroll spy to highlight current content header

let currentHeader = ref(null);

let isPartiallyInViewport = (element, offsetBottom) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom - offsetBottom > 0 &&
    rect.top <= document.documentElement.clientHeight
  );
};

let handleScroll = () => {
  let visibleHeaders = getHeaders().filter((i) => {
    return isPartiallyInViewport(i.parentNode, 200);
  });

  if (
    window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight &&
    visibleHeaders.length
  ) {
    currentHeader.value = visibleHeaders[visibleHeaders.length - 1];
    return;
  }

  if (!visibleHeaders[0] || currentHeader.value === visibleHeaders[0]) {
    return;
  }

  currentHeader.value = visibleHeaders[0];
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<style scoped>
h3 {
  @apply mt-4 text-3xl font-semibold;
}
h4 {
  @apply mt-4 text-2xl font-semibold;
}
h5 {
  @apply mt-4 text-xl font-semibold;
}
h6 {
  @apply mb-2 mt-6 text-lg font-semibold;
}

a.active {
  @apply inline-block py-1 pl-4 pr-4 text-black dark:text-white;
}
a {
  @apply inline-block py-1 pl-2 pr-4;
}
a:hover {
  @apply text-black dark:text-white;
}
</style>
