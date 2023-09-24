<template>
  <div
    v-if="filterable && items.length > 5"
    class="flex mt-10"
  >
    <div class="w-full">
      <v-input
        v-model="store.filter"
        placeholder="Filter"
        base="underlinedInput"
        clearable
      ></v-input>
    </div>
  </div>
  <div
    v-if="referenceItems.length"
    class="bg-[#fbfbfb] dark:bg-[#1e1e1e] rounded-lg p-4 mt-4 mb-6 border dark:border-0"
    v-bind="$attrs"
  >
    <div
      v-for="(prop, index) in referenceItems"
      class="group mt-4 first:mt-0"
    >
      <div class="flex items-center">
        <!-- prop -->
        <code class="dark:text-text-300">
          <span class="group-hover:underline">{{ prop.prop }}</span>
          <div
            v-if="prop.required"
            class="text-xs text-danger-400"
          >
            (required)
          </div>
          <div
            v-if="prop.tags"
            class="text-xs text-info-500"
          >
          ({{ prop.tags }})
          </div>
        </code>
        <!-- default value -->
        <code class="code-text mr-6 ml-auto">{{ prop.default }}</code>
        <!-- types -->
        <div class="flex flex-col gap-y-1 md:flex-row md:gap-y-0">
          <code
            v-for="type in prop.type"
            class="code-word"
          >
            {{ type }}
          </code>
        </div>
      </div>
      <div
        class="ml-[20px] md:ml-[200px] mb-4 mt-4 md:mt-2"
        v-html="template(prop.description)"
      ></div>
      <v-divider v-if="index < items.length - 1"></v-divider>
    </div>
  </div>
  <div
    v-else
    class="my-10"
  ></div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "../../store.js";

export default {
  inheritAttrs: false,
  props: {
    items: {
      type: Array,
      default: [],
    },
    filterable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    let store = useStore();

    let referenceItems = computed(() => {
      return props.items.filter((i) => {
        return (
          i.prop.toLowerCase().indexOf(store.filter.toLowerCase()) > -1 ||
          i.description.toLowerCase().indexOf(store.filter.toLowerCase()) > -1
        );
      });
    });

    let template = (string) => {
      return string
        .replace(
          new RegExp("(?<!<[^>]*)('[^']*')|(\\bv-\\w+\\S+)|`([^`]*)`", "ig"),
          `<code class="code-text">$1$2$3</code>`
        )
        .replace(
          new RegExp("@(\\S*)", "ig"),
          `<code class="code-word">$1</code>`
        );
    };

    return {
      store,
      referenceItems,
      template,
    };
  },
};
</script>
