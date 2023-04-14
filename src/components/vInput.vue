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

  <div
    :class="wrapperClasses"
    :style="{ width: width + 'px' }"
    @mousedown="handleMousedown"
    @click="handleClickWrapper"
  >
    <div
      ref="wrapperRef"
      :class="getInputClasses"
      :role="role"
      data-testid="wrapper"
    >
      <!-- @slot icon -->
      <slot name="icon">
        <div
          v-if="icon"
          @click="handleClickIcon"
          class="mr-2"
          role="button"
        >
          <v-icon
            :name="icon"
            :class="classes.icon.value"
          ></v-icon>
        </div>
      </slot>

      <!-- @slot prepend -->
      <slot name="prepend"></slot>

      <div class="flex flex-wrap flex-1">
        <!-- @slot input-extra -->
        <slot name="input-extra"></slot>
        <input
          v-model="localModel"
          ref="inputRef"
          :id="id"
          type="text"
          v-bind="$attrs"
          class="flex-1 min-w-0 focus:min-w-[64px] border-0 bg-transparent focus:outline-none outline-none p-0"
          @blur="handleBlur"
        />
      </div>

      <!-- @slot append -->
      <slot name="append"></slot>

      <div class="flex items-center">
        <v-spinner
          v-if="useLoader"
          :class="{ visible: isLoading, invisible: !isLoading }"
          type="svg"
          style-spinner="small"
          v-bind="spinner"
          class="mx-0.5"
        />
        <div
          v-if="clearable || customClearable"
          :class="classes.closeButtonWrapper.value"
        >
          <v-close-button
            v-bind="closeButton"
            aria-label="Close"
            class="ml-2"
            @click.stop="handleClickClearButton"
          ></v-close-button>
        </div>
        <!-- @slot input-control-extra -->
        <slot name="input-control-extra"></slot>
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
      v-for="(_, slot) of $slots"
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
import { ref, computed, inject, useAttrs, toRef, nextTick } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
import useValidation from "./composition/use-validation";
import vFormText from "./vFormText.vue";
import vCloseButton from "./vCloseButton.vue";
import vSpinner from "./vSpinner.vue";
import vIcon from "./vIcon.vue";
import {
  sharedProps,
  sharedStyleProps,
  sharedValidationProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  ...sharedStyleProps("input"),
  modelValue: {
    type: [String, Number, Array, Boolean, Number],
    default: "",
  },
  externalModel: {
    type: [String, Number, Array, Boolean, Number],
    default: undefined,
  },
  ...sharedValidationProps("input", {
    validateOn: "blur",
    validateMode: "silent",
  }),
  inline: {
    type: Boolean,
    default: defaultProps("input", "inline", false),
  },
  useLoader: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  singleLineMessage: {
    type: Boolean,
    default: defaultProps("input", "singleLineMessage", false),
  },
  width: {
    type: String,
    default: defaultProps("input", "width", ""),
  },
  label: {
    type: String,
    default: "",
  },
  noMessages: {
    type: Boolean,
    default: false,
  },
  spinner: {
    type: Object,
    default: defaultProps("input", "spinner", {}),
  },
  closeButton: {
    type: Object,
    default: defaultProps("input", "closeButton", {}),
  },
  formText: {
    type: Object,
    default: defaultProps("input", "formText", { class: "absolute" }),
  },
  styleInput: {
    type: String,
    default: defaultProps("input", "styleInput", ""),
  },
  styleIcon: {
    type: String,
    default: defaultProps("input", "styleIcon", ""),
  },
  styleCloseButtonWrapper: {
    type: String,
    default: defaultProps("input", "styleLabel", ""),
  },
  styleLabel: {
    type: String,
    default: defaultProps("input", "styleLabel", ""),
  },
  ...sharedFormProps("input", null, { icon: true, clearable: true }),
  customClearable: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits([
  "update:modelValue",
  "validation:status",
  "validation:messages",
  "validation:state",
  "click:clear-button",
  "click:icon",
  "click:indicator",
]);

let attrs = useAttrs();

let { classes, states } = useStyles("input", props, {
  input: {
    states: ["valid", "invalid"],
  },
  icon: null,
  label: {
    fixed: "inline-block",
  },
  closeButtonWrapper: {
    name: "close-button-wrapper",
  },
});

let getInputClasses = computed(() => {
  return [
    "tw-form-input-reset flex items-center flex-1",
    classes.input.value,
    validation.state.value === "valid" && states.input.value.valid,
    validation.state.value === "invalid" && states.input.value.invalid,
    (attrs.disabled === "" || attrs.disabled === true) && "disabled",
  ];
});

let wrapperClasses = computed(() => {
  return props.inline ? "inline-block align-middle group" : "flex flex-1 group";
});

let id = useUid("input", attrs);

let inputRef = ref(null);

let wrapperRef = ref(null);

let focus = () => {
  inputRef.value.focus();
};

let blur = () => {
  inputRef.value.blur();
};

let selectInputText = () => {
  inputRef.value.setSelectionRange(0, localModel.value.length);
};

let localModel = useLocalModel(props, emit);

// handle v-form

let form = inject("form", {});

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

let externalModel = toRef(props, "externalModel");

let { rules, validateOn, validateMode } = props;

let currentValidationModel =
  externalModel.value !== undefined ? externalModel : localModel;

let validation = useValidation({
  form,
  value: currentValidationModel,
  rules,
  options: {
    validateOn,
    validateMode,
  },
  externalState,
  onUpdate: emitValidationStatus,
  onReset: resetInput,
});

// handle template events

let handleBlur = () => {
  nextTick(() => {
    validation.touch();
  });
};

let handleClickWrapper = () => {
  inputRef.value.focus();
};

let handleClickIcon = (ev) => {
  emit("click:icon", ev);
};

// prevent focus but allow inputRef to allow selection
let handleMousedown = (ev) => {
  if (ev.target === inputRef.value) {
    return;
  }
  ev.preventDefault();
};

let handleClickClearButton = () => {
  if (props.customClearable) {
    emit("click:clear-button");
    return;
  }

  if (localModel.value.length) {
    localModel.value = "";
  }
};

defineExpose({
  focus,
  blur,
  inputRef,
  selectInputText,
  reference: wrapperRef,
});
</script>

<style></style>
