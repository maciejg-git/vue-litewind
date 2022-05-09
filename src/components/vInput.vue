<template>
  <div class="relative inline-flex items-center" :class="class" :style="style">
    <slot name="icon">
      <v-icon
        v-if="icon"
        :name="icon"
        class="absolute h-6 w-6 text-gray-400 dark:text-gray-400 ml-2"
      ></v-icon>
    </slot>

    <input
      v-model="localModel"
      v-bind="$attrs"
      class="grow"
      :class="[
        classes.input.value,
        states.input.value && states.input.value[state],
        attrs.disabled === '' || attrs.disabled === true
          ? states.input.disabled
          : '',
        icon ? variants.input.value['icon-variant'] : '',
      ]"
    />

    <div v-if="clearable" class="absolute flex right-0 mr-2">
      <v-close-button v-if="clearable" class="ml-2"></v-close-button>
    </div>
  </div>
</template>

<script>
// vue
import { computed } from "vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
// props
import { sharedStyleProps } from "../sharedProps";

export default {
  props: {
    modelValue: { type: [String, Number, Boolean, Array], default: undefined },
    class: { type: [String, Array], default: "" },
    style: { type: [String], default: "" },
    icon: { type: String, default: "" },
    clearable: { type: Boolean, default: false },
    state: { type: [String, Boolean], default: "" },
    styleInput: { type: [String, Array], default: "" },
    ...sharedStyleProps("input"),
  },
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    let { classes, states, variants } = useStyles("input", props, {
      input: {
        states: ["valid", "invalid", "disabled"],
        variants: ["icon-variant"],
      },
    });

    let localModel = useLocalModel(props, emit);

    let state = computed(() =>
      props.state === true
        ? "valid"
        : props.state === false
        ? "invalid"
        : props.state === null
        ? ""
        : props.state
    );

    return {
      classes,
      states,
      variants,
      state,
      localModel,
      attrs,
    };
  },
};
</script>

<style scoped></style>
