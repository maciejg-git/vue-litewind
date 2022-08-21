<template>
  <div class="relative items-center" :class="wrapperClasses">
    <slot name="icon">
      <button v-if="icon" class="absolute" @click="handleIconClick">
        <v-icon :name="icon" :class="classes.icon.value"></v-icon>
      </button>
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
import { defaultProps } from "../defaultProps";

export default {
  props: {
    modelValue: {
      type: [String, Number, Array, Boolean, Object],
      default: undefined,
    },
    block: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: undefined,
    },
    styleSelect: {
      type: String,
      default: defaultProps("select", "styleSelect", ""),
    },
    styleIcon: {
      type: String,
      default: defaultProps("select", "styleIcon", ""),
    },
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
      // if (props.modelValue._isValidateRef) {
      // }
    });

    let isOptionDisabled = (o) => {
      return o.disabled == undefined || o.disabled == null ? false : o.disabled;
    };

    let handleIconClick = () => emit("input:icon-click");

    let handleBlur = () => {
      // if (props.modelValue._isValidateRef) {
      //   props.modelValue.touch();
      // }
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
      handleIconClick,
      handleBlur,
    };
  },
};
</script>

<style scoped></style>
