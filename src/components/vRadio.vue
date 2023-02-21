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
import { inject, useAttrs, toRef } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
import useValidation from "./composition/use-validation";
import {
  sharedProps,
  sharedStyleProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("radio"),
  modelValue: {
    type: [Array, Boolean, String],
    default: undefined,
  },
  rules: {
    type: Object,
    default: {},
  },
  validateMode: {
    type: String,
    default: "silent",
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
});

const emit = defineEmits([
  "update:modelValue",
  "update:status",
  "update:state",
  "update:messages",
]);

let attrs = useAttrs();

let { classes, states } = useStyles("radio", props, {
  radio: {
    states: ["valid", "invalid"],
  },
  label: null,
});

let getRadioClasses = () => {
  return [
    "tw-form-radio-reset",
    classes.radio.value,
    state.value === "valid" && states.radio.value.valid,
    state.value === "invalid" && states.radio.value.invalid,
    (attrs.disabled === "" || attrs.disabled === true) && "disabled",
  ];
};

let id = useUid("input", attrs);

let { groupModel, onUpdateGroupModel, isInGroup } = inject(
  "v-radio-group",
  {}
);

let localModel = useLocalModel(props, emit, groupModel, onUpdateGroupModel);

// validation

let emitValidationStatus = (status, state, messages) => {
  emit("update:status", status.value);
  emit("update:state", state.value);
  emit("update:messages", messages.value);
};

let resetInput = () => {
  localModel.value = "";
};

let externalState = toRef(props, "state");

let { rules, validateMode } = props;

// try to inject checkbox group validation or fallback to checkbox validation
let { status, state, messages, touch, formValidate, reset } = inject(
  "v-radio-group-validation",
  useValidation(
    rules,
    localModel,
    externalState,
    emitValidationStatus,
    resetInput,
    {
      validateOn: "form",
      validateMode,
    }
  )
);

// handle v-form

if (!isInGroup) {
  let { addFormInput } = inject("form", {});

  if (addFormInput) addFormInput({ status, formValidate, reset });
}

// handle template events

let handleBlur = () => {
  if (touch) touch();
};
</script>

<style>
</style>
