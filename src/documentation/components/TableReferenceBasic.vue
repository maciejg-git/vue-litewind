<template>
  <div class="bg-[#1e1e1e] rounded-lg shadow p-4 mt-10 mb-10">
    <div
      v-for="(prop, index) in items"
      class="group mt-4 first:mt-0"
    >
      <div class="flex items-center">
        <code class="dark:text-text-300 group-hover:underline">
          {{ prop[reference] }}
        </code>
        <code class="code-text mr-6 ml-auto">{{ prop.default }}</code>
        <code
          v-for="type in prop.type"
          class="code-word"
        >
          {{ type }}
        </code>
      </div>
      <div
        class="ml-[200px] mb-4 mt-2"
        v-html="template(prop.description)"
      ></div>
      <v-divider v-if="index < items.length - 1"></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    reference: { 
      type: String,
      default: "prop" 
    },
    items: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    let template = (string) => {
      return string
        .replace(
          new RegExp("('[^']*')|(\\bv-\\w+\\S+)|`([^`]*)`", "ig"),
          `<code class="code-text">$1$2$3</code>`
        )
        .replace(
          new RegExp("@(\\S*)", "ig"),
          `<code class="code-word">$1</code>`
        );
    };

    return {
      template,
    };
  },
};
</script>
