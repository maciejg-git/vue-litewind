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
  sharedValidationProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("checkbox", ["Checkbox", "Label"]),
  ...sharedFormProps("checkbox"),
  ...sharedValidationProps("checkbox", {
    validateOn: "blur",
    validateMode: "silent",
  }),
  modelValue: {
    type: [Array, Boolean, Object],
    default: undefined,
  },
  label: {
    type: String,
    default: "",
  },
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
    validation.state.value === "valid" && states.checkbox.value.valid,
    validation.state.value === "invalid" && states.checkbox.value.invalid,
    (attrs.disabled === "" || attrs.disabled === true) && "disabled",
  ];
};

let id = useUid("checkbox", attrs);

let { groupModel, onUpdateGroupModel, isInGroup } = inject(
  "v-checkbox-group",
  {}
);

let localModel = useLocalModel(props, emit, groupModel, onUpdateGroupModel);

// handle v-form

let form = !isInGroup && inject("form", {});

// validation

let emitValidationStatus = (status, state, messages) => {
  emit("validation:status", status.value);
  emit("validation:state", state.value);
  emit("validation:messages", messages.value);
};

let resetInput = () => {
  localModel.value = false;
};

let externalState = toRef(props, "validationState");

let { rules, validateMode } = props;

// try to inject checkbox group validation or fallback to checkbox validation
let validation =
  inject("v-checkbox-group-validation", null) ||
  useValidation({
    form,
    value: localModel,
    rules,
    options: {
      validateOn: "form",
      validateMode,
    },
    externalState,
    onUpdate: emitValidationStatus,
    onReset: resetInput,
  });

// handle template events

let handleBlur = () => {
  if (validation.touch) validation.touch();
};
</script>

<style></style>
