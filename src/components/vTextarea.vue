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
import { ref, computed, watch, inject, useAttrs } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
import vFormText from "./vFormText.vue";
import { globalValidators } from "../validators";
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
    states: ["valid", "invalid", "disabled"],
  },
  label: {
    fixed: "inline-block",
  },
});

let getTextareaClasses = computed(() => {
  return [
    classes.textarea.value,
    states.textarea.value && states.textarea.value[state.value],
    attrs.disabled === "" || attrs.disabled === true
      ? states.textarea.disabled
      : "",
  ];
});

let wrapperClasses = computed(() => {
  return props.inline ? "inline-block" : "block";
});

let id = useUid("textarea", attrs);

// validate

let defaultStatus = {
  touched: false,
  dirty: false,
  valid: false,
  validated: false,
};

let status = ref({ ...defaultStatus });
let state = ref("");
let messages = ref({});
let wasValid = ref(false);
let wasInvalid = ref(false);
let { validateOn, validateMode } = props;

let reset = () => {
  status.value = { ...defaultStatus };
  state.value = "";
  wasInvalid.value = false;
  wasValid.value = false;
  emit("update:modelValue", "");
  messages.value = {};
};

let canUpdateState = () => {
  return validateMode === "eager" || wasInvalid.value;
};

let updateState = () => {
  if (props.state !== null) return props.state;
  if (status.value.optional) return "";

  if (!canUpdateState()) return state.value;

  return status.value.valid ? "valid" : "invalid";
};

watch(
  () => props.state,
  (newState) => (state.value = newState),
  { immediate: true }
);

let validate = (value) => {
  let { newStatus, newMessages } = getValidateStatus(value);
  status.value = newStatus;
  messages.value = newMessages;
};

let updateValue = (v) => {
  validate(v);

  if (
    validateOn === "blur" &&
    !status.value.touched &&
    !status.value.validated
  ) {
    return;
  }

  if (status.value.valid) {
    wasValid.value = true;
  }
  if (!status.value.valid && wasValid.value) {
    wasInvalid.value = true;
  }

  state.value = updateState();

  emitValidationStatus();
};

let touch = () => {
  validate(localModel.value);
  status.value.touched = true;

  if (status.value.valid) {
    wasValid.value = true;
  } else {
    wasInvalid.value = true;
  }

  state.value = updateState();

  emitValidationStatus();
};

let formValidate = () => {
  validate(localModel.value);
  status.value.validated = true;

  if (status.value.valid) {
    wasValid.value = true;
  } else {
    wasInvalid.value = true;
  }

  state.value = updateState();

  emitValidationStatus();
};

let getValidateStatus = (value) => {
  let newStatus = {
    touched: status.value.touched,
    validated: status.value.validated,
    dirty: status.value.dirty || !!(value && !!value.length),
  };

  let newMessages = {};
  let rules = Object.entries(props.rules);

  newStatus.valid = rules.reduce((valid, [key, v]) => {
    let validator =
      globalValidators[key] ||
      (isFunction(props.rules[key]) && props.rules[key]);

    if (!validator) return valid;

    let res = validator(value, v);

    if (res === true) {
      newStatus[key] = true;
    } else {
      newStatus[key] = false;
      newMessages[key] = res;
    }

    return valid && newStatus[key];
  }, true);

  newStatus.optional = !props.rules.required && value === "";

  return { newStatus, newMessages };
};

let emitValidationStatus = () => {
  emit("update:status", status.value);
  emit("update:state", state.value);
  emit("update:messages", messages.value);
};

emitValidationStatus();

let { addFormInput } = inject("form", {});

if (addFormInput) {
  addFormInput({ status, formValidate, reset });
}

let localModel = useLocalModel(props, emit, updateValue);

// handle template events

let handleBlur = () => touch();
</script>

<style>
.tw-form-textarea-reset {
  @apply form-textarea;
}
</style>
