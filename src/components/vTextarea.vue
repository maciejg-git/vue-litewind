<template>
  <div
    class="relative"
    :class="wrapperClasses"
  >
    <label
      v-if="label"
      :for="id"
      :class="classes.label.value"
    >
      <slot
        name="label"
        :label="label"
      >
        {{ label }}
      </slot>
    </label>
    <div
      class="tw-form-textarea-reset block"
      :class="getTextareaClasses"
    >
      <textarea
        v-model="localModel"
        v-bind="$attrs"
        :id="id"
        class="block border-0 bg-transparent focus:outline-none focus:ring-0 outline-none p-0"
        :class="{ 'w-full': !inline }"
        @blur="handleBlur"
      ></textarea>
    </div>
    <slot name="form-text">
      <v-form-text
        :messages="messages"
        :state="state"
        :single-line-message="singleLineMessage"
        v-bind="formText"
      >
        <template #message="message">
          <slot
            name="message"
            v-bind="message"
          ></slot>
        </template>
      </v-form-text>
    </slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { computed, watch, toRef, inject, useAttrs } from "vue";
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
  ...sharedFormProps(null),
});

const emit = defineEmits(["update:modelValue"]);

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
    classes.textarea.value,
    state.value === "valid" && states.textarea.value.valid,
    state.value === "invalid" && states.textarea.value.invalid,
    (attrs.disabled === "" || attrs.disabled === true) && "disabled",
  ];
});

let wrapperClasses = computed(() => {
  return props.inline ? "inline-block" : "block";
});

let id = useUid("textarea", attrs);

let localModel = useLocalModel(props, emit);

// validate

let emitValidationStatus = (status, state, messages) => {
  emit("update:status", status);
  emit("update:state", state);
  emit("update:messages", messages);
};

let externalState = toRef(props, "state");

let { rules, validateOn, validateMode } = props;

let { status, state, messages, touch, formValidate, reset } = useValidation(
  rules,
  validateOn,
  validateMode,
  localModel,
  externalState,
  emitValidationStatus
);

let { addFormInput } = inject("form", {});

if (addFormInput) {
  addFormInput({ status, formValidate, reset });
}

// handle template events

let handleBlur = () => touch();
</script>

<style></style>
