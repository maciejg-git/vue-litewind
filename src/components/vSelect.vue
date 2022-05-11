<template>
  <div class="relative inline-flex items-center">
    <slot name="icon">
      <v-icon
        v-if="icon"
        :name="icon"
        class="absolute"
        :class="classes.icon.value"
      ></v-icon>
    </slot>

    <select v-bind="$attrs" v-model="localModel" :class="getSelectClasses()">
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
  </div>
</template>

<script>
// vue
import { computed } from "vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
// props
import { sharedStyleProps, sharedFormProps } from "../shared-props";

export default {
  props: {
    modelValue: { type: [String, Number, Array, Boolean], default: undefined },
    options: { type: Array, default: undefined },
    styleSelect: { type: [String, Array], default: "" },
    styleIcon: { type: [String, Array], default: "" },
    ...sharedFormProps(null, { icon: true }),
    ...sharedStyleProps("select"),
  },
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    let { classes, states, variants } = useStyles("select", props, {
      select: {
        states: ["valid", "invalid", "disabled"],
        variants: ["icon-variant"],
      },
      icon: null,
    });

    let localModel = useLocalModel(props, emit);

    let getSelectClasses = () => {
      return [
        classes.select.value,
        states.select.value && states.select.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.select.disabled
          : "",
        props.icon ? variants.select.value["icon-variant"] : "",
      ];
    };

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
      variants,
      getSelectClasses,
      state,
      isOptionDisabled,
      localModel,
      attrs,
    };
  },
};
</script>

<style scoped></style>
