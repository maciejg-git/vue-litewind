<template>
  <nav>
    <ol class="flex items-center">
      <li
        v-for="(i, index) in path"
        :key="index"
        class="inline-flex items-center"
      >
        <v-icon
          v-if="i.icon"
          :name="i.icon"
          class="mr-1 inline"
        />

        <!-- href -->
        <a
          v-if="i.href"
          :href="i.href"
          :class="[classes.item.value, variants.item.default]"
        >
          {{ i.label }}
        </a>
        <!-- to -->
        <router-link
          v-if="i.to"
          :to="i.to"
          :class="[classes.item.value, variants.item.default]"
        >
          {{ i.label }}
        </router-link>

        <span
          v-if="isActive(index)"
          :class="[classes.item.value, variants.item.active]"
        >
          {{ i.label }}
        </span>
        <span
          v-else
          :class="classes.separator.value"
        >
          {{ separator }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { inject } from "vue"
import useTailwindStyles from "./composition/use-tailwind-styles"
import { sharedProps, sharedModProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

let props = defineProps({
  ...sharedProps(),
  ...sharedModProps("breadcrumb", ["Item", "Separator", "Icon"]),
  path: {
    type: Array,
    default: [],
  },
  separator: {
    type: String,
    default: defaultProps("breadcrumb", "separator", "/"),
  },
});

let { breadcrumb } = inject("mods", {})

let elements = {
  item: {
    externalVariants: ["variant"]
  },
  separator: null,
  icon: null,
}

let { classes, variants } = useTailwindStyles(props, breadcrumb, elements)

let isActive = (index) => {
  return index == props.path.length - 1;
};
</script>

<style scoped></style>
