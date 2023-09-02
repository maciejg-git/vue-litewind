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
      <div class="flex flex-1 flex-wrap">
        <textarea
          v-model="localModel"
          v-bind="$attrs"
          :id="id"
          class="flex-1 border-0 bg-transparent p-0 outline-none focus:outline-none focus:ring-0"
          @blur="handleBlur"
        ></textarea>
      </div>
    </div>
  </div>

  <v-form-text
    v-if="!noMessages && Object.keys(validation.messages.value).length"
    :messages="validation.messages.value"
    :state="validation.state.value"
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
import { computed, toRef, inject, useAttrs, nextTick, watch } from "vue";
import useTailwindStyles from "./composition/use-tailwind-styles"
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
import useValidation from "./composition/use-validation";
import vFormText from "./vFormText.vue";
import {
  sharedProps,
  sharedModProps,
  sharedValidationProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedModProps("textarea", ["Textarea", "Label"]),
  ...sharedFormProps("textarea"),
  ...sharedValidationProps("textarea", {
    validateOn: "blur",
    validateMode: "silent",
  }),
  modelValue: {
    type: String,
    default: undefined,
  },
  inline: {
    type: Boolean,
    default: defaultProps("textarea", "inline", false),
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
});

const emit = defineEmits([
  "update:modelValue",
  "validation:status",
  "validation:messages",
  "validation:state",
]);

let attrs = useAttrs();

let { textarea } = inject("mods", {})

let elements = {
  textarea: null,
  label: {
    fixed: "inline-block"
  }
}

let { classes, setState } = useTailwindStyles(props, textarea, elements)

let getTextareaClasses = computed(() => {
  return [
    "form-textarea flex items-center",
    classes.textarea.value,
    // validation.state.value === "valid" && states.textarea.value.valid,
    // validation.state.value === "invalid" && states.textarea.value.invalid,
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

// handle v-form

let form = inject("_form", {});

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

let validation = useValidation({
  form,
  value: localModel,
  rules,
  options: {
    validateOn,
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
  nextTick(() => {
    validation.touch();
  });
};
</script>

<style></style>
