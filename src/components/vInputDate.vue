<template>
  <input type="text" :value="date" />
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    modelValue: { type: [String, Array], default: undefined },
    locale: { type: String, default: "en-GB" },
    format: {
      type: Object,
      default: () => ({
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  },
  setup(props) {
    let date = computed(() => {
      if (Array.isArray(props.modelValue)) {
        let from = new Date(props.modelValue[0]);
        let to = new Date(props.modelValue[1]);
        if (isNaN(from.getTime()) || isNaN(to.getTime())) return "";
        from = from.toLocaleString("en-GB", props.format);
        to = to.toLocaleString(props.locale, props.format);
        return `${from} - ${to}`;
      } else {
        let d = new Date(props.modelValue);
        if (isNaN(d.getTime())) return "";
        return d.toLocaleString(props.locale, props.format);
      }
    });

    return {
      date,
    };
  },
};
</script>
