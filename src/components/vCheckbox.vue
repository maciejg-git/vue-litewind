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
      <!-- @slot label -->
      <slot
        name="label"
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
  ...sharedStyleProps("checkbox"),
  modelValue: {
    type: [Array, Boolean, Object],
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
  styleCheckbox: {
    type: [String, Array],
    default: defaultProps("checkbox", "styleCheckbox", ""),
  },
  styleLabel: {
    type: [String, Array],
    default: defaultProps("checkbox", "styleInput", ""),
  },
  ...sharedFormProps("checkbox", null),
});

const emit = defineEmits([
  "update:modelValue",
  "validation:status",
  "validation:state",
  "validation:messages",
]);

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
    state.value === "valid" && states.checkbox.value.valid,
    state.value === "invalid" && states.checkbox.value.invalid,
    (attrs.disabled === "" || attrs.disabled === true) && "disabled",
  ];
};

let id = useUid("checkbox", attrs);

let { groupModel, onUpdateGroupModel, isInGroup } = inject(
  "v-checkbox-group",
  {}
);

let localModel = useLocalModel(props, emit, groupModel, onUpdateGroupModel);

// validation

let emitValidationStatus = (status, state, messages) => {
  emit("validation:status", status.value);
  emit("validation:state", state.value);
  emit("validation:messages", messages.value);
};

let resetInput = () => {
  localModel.value = false;
};

let externalState = toRef(props, "state");

let { rules, validateMode } = props;

// try to inject checkbox group validation or fallback to checkbox validation
let { status, state, messages, touch, formValidate, reset } = inject(
  "v-checkbox-group-validation",
  useValidation(
    localModel,
    rules,
    {
      validateOn: "form",
      validateMode,
    },
    externalState,
    emitValidationStatus,
    resetInput,
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

<style></style>
