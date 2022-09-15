<template>
  <div class="flex items-center">
    <input
      v-bind="$attrs"
      v-model="localModel"
      type="radio"
      :id="id"
      :class="getRadioClasses()"
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
import { inject, useAttrs } from "vue";
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
  modelValue: {
    type: [Array, Boolean, String],
    default: undefined,
  },
  label: {
    type: String,
    default: "",
  },
  styleRadio: {
    type: String,
    default: defaultProps("radio", "styleRadio", ""),
  },
  styleLabel: {
    type: String,
    default: defaultProps("radio", "styleLabel", ""),
  },
  ...sharedFormProps(null),
  ...sharedStyleProps("radio"),
});

const emit = defineEmits(["update:modelValue"]);

let attrs = useAttrs();

let { classes, states } = useStyles("radio", props, {
  radio: {
    states: ["valid", "invalid", "disabled"],
  },
  label: null,
});

let getRadioClasses = () => {
  return [
    "tw-form-radio-reset",
    classes.radio.value,
    states.radio.value && states.radio.value[state.value],
    attrs.disabled === "" || attrs.disabled === true
      ? states.radio.disabled
      : "",
  ];
};

let id = useUid("input", attrs);

let { value, updateValue, touch, state } = inject("radio-group", {
  state: "",
});

let localModel = useLocalModel(props, emit, updateValue, value);

let handleBlur = () => {
  if (touch) touch();
};
</script>

<style>
.tw-form-radio-reset {
  @apply form-radio;
}
</style>
