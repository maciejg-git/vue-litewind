<template>
  <select
    v-bind="$attrs"
    v-model="localModel"
    :class="[
      classes.select.value,
      states.select.value && states.select.value[state],
      attrs.disabled === '' || attrs.disabled === true
        ? states.select.disabled
        : '',
    ]"
  >
    <slot name="options-prepend"></slot>
    <option
      v-for="(o, i) in options"
      :key="i"
      :value="o.value"
      :disabled="isOptionDisabled(o)"
    >
      {{ o.label }}
    </option>
    <slot name="default"></slot>
  </select>
</template>

<script>
import { computed } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model"

export default {
  props: {
    modelValue: { type: [String, Number, Array, Boolean], default: undefined },
    options: { type: Array, default: undefined },
    state: { type: [String, Boolean], default: "" },
    name: { type: String, default: "select" },
    styleSelect: { type: [String, Array], default: "" },
  },
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("select", props, {
      select: {
        states: ["valid", "invalid", "disabled"],
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

    let isOptionDisabled = (o) => {
      return o.disabled == undefined || o.disabled == null ? false : o.disabled;
    };

    return {
      classes,
      states,
      state,
      isOptionDisabled,
      localModel,
      attrs,
    };
  },
};
</script>

<style scoped></style>
