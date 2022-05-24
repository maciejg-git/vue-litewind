<template>
  <div class="relative items-center" :class="wrapperClasses">
    <slot name="icon">
      <v-icon
        v-if="icon"
        :name="icon"
        class="absolute"
        :class="classes.icon.value"
      ></v-icon>
    </slot>

    <select
      v-bind="$attrs"
      v-model="localModel"
      :class="getSelectClasses()"
      @blur="handleBlur"
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
    modelValue: {
      type: [String, Number, Array, Boolean, Object],
      default: undefined,
    },
    block: { type: Boolean, default: false },
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

    let wrapperClasses = computed(() => {
      return props.block ? "flex" : "inline-flex";
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

    let state = computed(() => {
      if (props.modelValue._isValidateRef) {
        return props.modelValue.getValidStatus();
      }
    });

    let isOptionDisabled = (o) => {
      return o.disabled == undefined || o.disabled == null ? false : o.disabled;
    };

    let handleBlur = () => {
      if (props.modelValue._isValidateRef) {
        props.modelValue.touch();
      }
    };

    return {
      classes,
      wrapperClasses,
      states,
      variants,
      getSelectClasses,
      state,
      isOptionDisabled,
      localModel,
      handleBlur,
    };
  },
};
</script>

<style scoped></style>
