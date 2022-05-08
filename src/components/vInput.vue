<template>
  <div class="relative inline-flex items-center">
    <v-icon
      v-if="icon"
      :name="icon"
      class="absolute h-6 w-6 text-gray-400 dark:text-gray-400 ml-2"
    ></v-icon>
    <input
      v-model="localModel"
      :type="type"
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
    type: { type: String, default: "text" },
    icon: { type: String, default: "" },
    state: { type: [String, Boolean], default: "" },
    styleInput: { type: [String, Array], default: "" },
    ...sharedStyleProps("input"),
  },
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
