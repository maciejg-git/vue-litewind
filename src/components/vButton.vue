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
// vue
import { computed } from "vue";
// composition
import useStyles from "./composition/use-styles";
// props
import { defaultProps } from "../defaultProps";
import { sharedProps, sharedStyleProps } from "../shared-props";

export default {
  props: {
    ...sharedProps(),
    disabled: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: "button",
    },
    block: {
      type: Boolean,
      default: false,
    },
    styleButton: {
      type: String,
      default: defaultProps("button", "styleButton", ""),
    },
    ...sharedStyleProps("button"),
  },
  setup(props) {
    let { classes, states } = useStyles("button", props, {
      button: {
        fixed: "justify-center items-center",
        prop: computed(() => {
          return [props.block ? "flex" : "inline-flex"];
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

<style scoped lang="postcss"></style>
