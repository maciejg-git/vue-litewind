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
import { inject, useAttrs, toRef, watch } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
import useValidation from "./composition/use-validation";
import {
  sharedProps,
  sharedModProps,
  sharedValidationProps,
  sharedFormProps,
} from "../shared-props";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("radio", ["Radio", "Label"]),
  ...sharedFormProps("radio"),
  ...sharedValidationProps("radio", {
    validateMode: "silent",
  }),
  modelValue: {
    type: [Array, Boolean, String],
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

let attrs = useAttrs();

let { radio } = inject("mods", {})

let elements = {
  radio: null,
  label: null,
}

let { classes, setState } = useTailwindStyles(props, radio, elements)

let getRadioClasses = () => {
  return [
    "form-radio",
    classes.radio.value,
    // validation.state.value === "valid" && states.radio.value.valid,
    // validation.state.value === "invalid" && states.radio.value.invalid,
    (attrs.disabled === "" || attrs.disabled === true) && "disabled",
  ];
};

let id = useUid("input", attrs);

let { groupModel, onUpdateGroupModel, isInGroup } = inject("v-radio-group", {});

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
  localModel.value = "";
};

let externalState = toRef(props, "validationState");

let { rules, validateMode } = props;

// try to inject checkbox group validation or fallback to checkbox validation
let validation =
  inject("v-radio-group-validation", null) ||
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

watch(validation.state, (value) => {
  setState(value)
})

// handle template events

let handleBlur = () => {
  if (validation.touch) validation.touch();
};
</script>

<style></style>
