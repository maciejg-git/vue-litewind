<template>
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

  <div :class="wrapperClasses">
    <div
      :class="getTextareaClasses"
      data-testid="wrapper"
    >
      <div class="flex flex-wrap flex-1">
        <textarea
          v-model="localModel"
          v-bind="$attrs"
          :id="id"
          class="flex-1 border-0 bg-transparent focus:outline-none focus:ring-0 outline-none p-0"
          @blur="handleBlur"
        ></textarea>
      </div>
    </div>
  </div>

  <v-form-text
    v-if="!noMessages && Object.keys(messages).length"
    :messages="messages"
    :state="state"
    :single-line-message="singleLineMessage"
    v-bind="formText"
    data-testid="error-messages"
  >
    <template
      v-for="(name, slot) of $slots"
      #[slot]="slotProps"
    >
      <slot
        :name="slot"
        v-bind="slotProps"
      ></slot>
    </template>
  </v-form-text>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { computed, toRef, inject, useAttrs, nextTick } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
import useValidation from "./composition/use-validation";
import vFormText from "./vFormText.vue";
import {
  sharedProps,
  sharedStyleProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("textarea"),
  modelValue: {
    type: String,
    default: undefined,
  },
  inline: {
    type: Boolean,
    default: defaultProps("textarea", "inline", false),
  },
  rules: {
    type: Object,
    default: {},
  },
  validateOn: {
    type: String,
    default: "blur",
  },
  validateMode: {
    type: String,
    default: "silent",
  },
  singleLineMessage: {
    type: Boolean,
    default: defaultProps("textarea", "singleLineMessage", false),
  },
  label: {
    type: String,
    default: "",
  },
  noMessages: {
    type: Boolean,
    default: false,
  },
  formText: {
    type: Object,
    default: defaultProps("textarea", "formText", { class: "absolute" }),
  },
  styleTextarea: {
    type: [String, Array],
    default: defaultProps("textarea", "styleTextarea", ""),
  },
  styleLabel: {
    type: [String, Array],
    default: defaultProps("textarea", "styleLabel", ""),
  },
  ...sharedFormProps("textarea", null),
});

const emit = defineEmits([
  "update:modelValue",
  "validation:status",
  "validation:messages",
  "validation:state",
]);

let attrs = useAttrs();

let { classes, states } = useStyles("textarea", props, {
  textarea: {
    states: ["valid", "invalid"],
  },
  label: {
    fixed: "inline-block",
  },
});

let getTextareaClasses = computed(() => {
  return [
    "tw-form-textarea-reset flex items-center",
    classes.textarea.value,
    state.value === "valid" && states.textarea.value.valid,
    state.value === "invalid" && states.textarea.value.invalid,
    (attrs.disabled === "" || attrs.disabled === true) && "disabled",
  ];
});

let wrapperClasses = computed(() => {
  return props.inline
    ? "inline-block align-middle group"
    : "block flex-auto group";
});

let id = useUid("textarea", attrs);

let localModel = useLocalModel(props, emit);

// validate

let emitValidationStatus = (status, state, messages) => {
  emit("validation:status", status.value);
  emit("validation:state", state.value);
  emit("validation:messages", messages.value);
};

let resetInput = () => {
  localModel.value = "";
};

let externalState = toRef(props, "validationState");

let { rules, validateOn, validateMode } = props;

let { status, state, messages, touch, formValidate, reset } = useValidation(
  localModel,
  rules,
  {
    validateOn,
    validateMode,
  },
  externalState,
  emitValidationStatus,
  resetInput,
);

// handle v-form

let { addFormInput } = inject("form", {});

if (addFormInput) {
  addFormInput({ status, formValidate, reset });
}

// handle template events

let handleBlur = () => {
  nextTick(() => {
    touch();
  });
};
</script>

<style></style>
