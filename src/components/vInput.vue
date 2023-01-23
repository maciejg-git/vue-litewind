<template>
  <div
    :class="wrapperClasses"
    :style="{ width: width }"
    @mousedown="handleMousedown"
    @click="handleClickWrapper"
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
      ref="wrapperRef"
      :class="getInputClasses"
    >
      <slot name="icon">
        <div
          v-if="icon"
          @click="handleClickIcon"
          class="mr-2"
        >
          <v-icon
            :name="icon"
            :class="classes.icon.value"
          ></v-icon>
        </div>
      </slot>

      <slot name="prepend"></slot>

      <div class="flex flex-wrap flex-1">
        <slot name="multi-value"></slot>

        <input
          v-model="localModel"
          ref="inputRef"
          :id="id"
          type="text"
          v-bind="$attrs"
          class="flex-1 min-w-0 focus:min-w-[64px] border-0 bg-transparent focus:outline-none focus:ring-0 outline-none p-0"
          @blur="handleBlur"
          @focus="handleFocus"
        />
      </div>

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
            @focus="blur"
          ></v-close-button>
        </div>
        <button
          v-if="showIndicator"
          aria-label="Close"
          tabindex="-1"
          class="focus:outline-none ml-2"
          @click.stop="handleClickIndicator"
        >
          <v-chevron
            initial="down"
            rotate-180
            :switch="indicatorSwitch"
            v-bind="chevron"
          />
        </button>
      </div>
    </div>
    <v-form-text
      v-if="!noMessages"
      :messages="messages"
      :state="state"
      :single-line-message="singleLineMessage"
      v-bind="formText"
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
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { ref, computed, inject, useAttrs, toRef } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
import useValidation from "./composition/use-validation";
import vFormText from "./vFormText.vue";
import vChevron from "./vChevron.vue";
import vCloseButton from "./vCloseButton.vue";
import vSpinner from "./vSpinner.vue";
import {
  sharedProps,
  sharedStyleProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

const props = defineProps({
  ...sharedProps(),
  modelValue: {
    type: [String, Number, Array, Boolean, Number],
    default: "",
  },
  externalModel: {
    type: [String, Number, Array, Boolean, Number],
    default: undefined,
  },
  inline: {
    type: Boolean,
    default: defaultProps("input", "inline", false),
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
  showIndicator: {
    type: Boolean,
    default: false,
  },
  indicatorSwitch: {
    type: Boolean,
    default: false,
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
  chevron: {
    type: Object,
    default: defaultProps("input", "chevron", {}),
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
  ...sharedFormProps(null, { icon: true, clearable: true }),
  customClearable: {
    type: Boolean,
    default: false,
  },
  ...sharedStyleProps("input"),
});

const emit = defineEmits([
  "update:modelValue",
  "update:status",
  "update:messages",
  "update:state",
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
    "tw-form-input-reset flex items-center",
    classes.input.value,
    state.value === 'valid' && states.input.value.valid,
    state.value === 'invalid' && states.input.value.invalid,
    (attrs.disabled === "" || attrs.disabled === true) && "disabled"
  ];
});

let wrapperClasses = computed(() => {
  return props.inline
    ? "inline-block align-middle group"
    : "block flex-auto group";
});

// input label

let id = useUid("input", attrs);

// template refs

let inputRef = ref(null);
let wrapperRef = ref(null);

let focus = () => inputRef.value.focus();

let blur = () => inputRef.value.blur();

let selectAll = () => {
  inputRef.value.setSelectionRange(0, localModel.value.length);
}

let isFocused = ref(false)

let localModel = useLocalModel(props, emit);

// validate

let emitValidationStatus = (status, state, messages) => {
  emit("update:status", status.value);
  emit("update:state", state.value);
  emit("update:messages", messages.value);
};

let externalState = toRef(props, "state");

let externalModel = toRef(props, "externalModel")

let { rules, validateOn, validateMode } = props;

let { status, state, messages, touch, formValidate, reset } = useValidation(
  rules,
  validateOn,
  validateMode,
  externalModel.value !== undefined ? externalModel : localModel,
  externalState,
  emitValidationStatus
);

let { addFormInput } = inject("form", {});

if (addFormInput) {
  addFormInput({ status, formValidate, reset });
}

// handle template events

let handleBlur = () => {
  touch();

  isFocused.value = false
};

let handleFocus = () => {
  isFocused.value = true
}

let handleClickWrapper = () => {
  inputRef.value.focus();
};

let handleClickIndicator = () => {
  emit("click:indicator");
};

let handleClickIcon = (ev) => {
  emit("click:icon", ev);
};

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

defineExpose({ focus, blur, selectAll, isFocused });
</script>

<style></style>
