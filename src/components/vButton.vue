<template>
  <component
    :is="tag"
    :href="tagHref"
    type="button"
    :class="[
      classes.button.value,
      disabled ? states.button.value.disabled : '',
    ]"
  >
    <slot name="default"></slot>
  </component>
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles";
import { sharedStyleProps } from "../sharedProps";

export default {
  props: {
    disabled: { type: Boolean, default: false },
    tag: { type: String, default: "button" },
    block: { type: Boolean, default: false },
    styleButton: { type: String, default: "" },
    ...sharedStyleProps("button"),
  },
  setup(props) {
    let { classes, states } = useStyles("button", props, {
      button: {
        fixed: "fixed-button",
        prop: computed(() => {
          return [props.block ? "w-full" : ""];
        }),
        states: ["disabled"],
      },
    });

    // do not include href is element is button
    let tagHref = computed(() => (props.tag == "a" ? "#" : null));

    return {
      classes,
      states,
      tagHref,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-button {
  @apply inline-flex justify-center items-center;
}
</style>
