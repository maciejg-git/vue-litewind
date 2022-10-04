<template>
  <div class="flex items-center">
    <input
      v-model="localModel"
      v-bind="$attrs"
      :id="id"
      type="checkbox"
      :class="getCheckBoxClasses()"
      @blur="handleBlur"
    />
    <label
      v-if="label"
      :for="id"
      :class="classes.label.value"
    >
      <slot
        name="default"
        :label="label"
      >
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { ref, watch, inject, useAttrs } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
import {
  sharedProps,
  sharedStyleProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("checkbox"),
  modelValue: {
    type: [Array, Boolean, Object],
    default: undefined,
  },
  rules: {
    type: Object,
    default: {},
  },
  label: {
    type: String,
    default: "",
  },
  styleCheckbox: {
    type: [String, Array],
    default: defaultProps("checkbox", "styleCheckbox", ""),
  },
  styleLabel: {
    type: [String, Array],
    default: defaultProps("checkbox", "styleInput", ""),
  },
  ...sharedFormProps(null),
});

const emit = defineEmits(["update:modelValue"]);

const attrs = useAttrs();

let { classes, states } = useStyles("checkbox", props, {
  checkbox: {
    states: ["valid", "invalid"],
  },
  label: null,
});

let getCheckBoxClasses = () => {
  return [
    "tw-form-checkbox-reset",
    classes.checkbox.value,
    states.checkbox.value && states.checkbox.value[state.value],
    attrs.disabled === "" || attrs.disabled === true
      ? 'disabled'
      : "",
  ];
};

let id = useUid("checkbox", attrs);

let { value, updateValue, touch, state } = inject("checkbox-group", {
  state: ref(""),
});

watch(
  () => props.state,
  (newState) => (state.value = newState),
  { immediate: true }
);

let localModel = useLocalModel(props, emit, updateValue, value);

let handleBlur = () => {
  if (touch) touch();
};
</script>

<style>
</style>
