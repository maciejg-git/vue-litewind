<template>
  <div
    :class="wrapperClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
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
      <div :class="{ invisible: !isElementVisible('icon') }">
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
      </div>

      <div :class="{ invisible: !isElementVisible('prepend') }">
        <slot name="prepend"></slot>
      </div>

      <div class="flex flex-wrap flex-1">
        <slot
          name="multi-value"
        >
        </slot>
        
        <input
          v-model="localModel"
          ref="inputRef"
          :id="id"
          type="text"
          v-bind="$attrs"
          class="flex-1 min-w-[100px] border-0 bg-transparent focus:outline-none focus:ring-0 outline-none p-0"
          @blur="handleBlur"
          @focus="handleFocus"
        />
      </div>

      <div :class="{ invisible: !isElementVisible('append') }">
        <slot name="append"></slot>
      </div>

      <div class="flex items-center">
        <v-spinner
          v-if="useLoader"
          :class="{ visible: isLoading, invisible: !isLoading }"
          type="svg"
          style-spinner="small"
          v-bind="spinner"
          class="mx-0.5"
        />
        <v-close-button
          v-if="clearable || customClearable"
          style-close-button="small"
          v-bind="closeButton"
          aria-label="Close"
          class="ml-2"
          :class="{ invisible: !isElementVisible('clearButton') }"
          @click="handleClickClearButton"
          @focus="blur"
        ></v-close-button>
        <button
          v-if="showIndicator"
          aria-label="Close"
          tabindex="-1"
          class="focus:outline-none ml-2"
          @click="handleClickIndicator"
          @focus="blur"
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
import { ref, computed, watch, inject, useAttrs, toRefs, toRef } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
import useValidation from "./composition/use-validation"
import vFormText from "./vFormText.vue";
import vChevron from "./vChevron.vue";
import vCloseButton from "./vCloseButton.vue";
import vSpinner from "./vSpinner.vue";
import { globalValidators } from "../validators";
import { isFunction, isString } from "../tools";
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
  value: {
    type: [Array, String],
    default: undefined,
  },
  valueDisplay: {
    type: String,
    default: 'text',
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
  label: {
    type: String,
    default: "",
  },
  visibleCondition: {
    type: Object,
    default: defaultProps("input", "visibleCondition", {}),
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
  "input:blur",
  "click:clear-button",
  "click:icon",
  "click:indicator",
]);

let attrs = useAttrs();

let { classes, states } = useStyles("input", props, {
  input: {
    states: ["valid", "invalid", "disabled"],
  },
  icon: null,
  label: {
    fixed: "inline-block",
  },
});

let getInputClasses = computed(() => {
  return [
    "tw-form-input-reset flex items-center",
    classes.input.value,
    state && states.input.value && states.input.value[state.value],
    attrs.disabled === "" || attrs.disabled === true
      ? states.input.disabled
      : "",
  ];
});

let wrapperClasses = computed(() => {
  return props.inline ? "inline-block align-middle" : "block flex-auto";
});

let isElementVisible = (element) => {
  let condition = props.visibleCondition[element];

  if (!condition) return true;

  return (
    (condition === "hover" && isMouseOver.value) ||
    (condition === "focus" && isFocused.value) ||
    (condition === "hasvalue" && localModel.value.length)
  );
};

// input label

let id = useUid("input", attrs);

// template refs

let inputRef = ref(null);
let wrapperRef = ref(null);

let isMouseOver = ref(false);
let isFocused = ref(false);

let blur = (ev) => ev.target.blur();

// validate

let localModel = useLocalModel(props, emit);

// form validation

let emitValidationStatus = (status, state, messages) => {
  emit("update:status", status);
  emit("update:state", state);
  emit("update:messages", messages);
};

let externalState = toRef(props, "state")

let { rules, validateOn, validateMode } = props

let { status, state, messages, touch, formValidate, reset } = useValidation(rules, validateOn, validateMode, localModel, emitValidationStatus)

let { addFormInput } = inject("form", {});

if (addFormInput) {
  addFormInput({ status, formValidate, reset });
}

// handle template events

let handleBlur = (ev) => {
  touch();

  isFocused.value = false;

  if (wrapperRef.value.contains(ev.relatedTarget)) {
    return;
  }

  emit("input:blur", ev);
};

let handleFocus = () => (isFocused.value = true);

let handleMouseEnter = () => (isMouseOver.value = true);

let handleMouseLeave = () => (isMouseOver.value = false);

let handleClickIndicator = () => {
  emit("click:indicator", inputRef.value);
};

let handleClickIcon = () => {
  emit("click:icon", inputRef.value);
};

let handleClickClearButton = () => {
  if (props.clearable && localModel.value.length) {
    localModel.value = "";
    return;
  }

  if (props.customClearable) {
    emit("click:clear-button", inputRef.value);
  }
};
</script>

<style>
.tw-form-input-reset {
  @apply form-input;
}
</style>
