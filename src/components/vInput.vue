<template>
  <div
    :class="wrapperClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <label v-if="label" :for="id" :class="classes.label.value">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div ref="wrapperRef" :class="getInputClasses">
      <div :class="{ invisible: !isElementVisible('icon') }">
        <slot name="icon">
          <div v-if="icon" @click="handleClickIcon" class="mr-2">
            <v-icon :name="icon" :class="classes.icon.value"></v-icon>
          </div>
        </slot>
      </div>

      <div :class="{ invisible: !isElementVisible('prepend') }">
        <slot name="prepend"></slot>
      </div>

      <input
        v-model="localModel"
        ref="inputRef"
        :id="id"
        type="text"
        v-bind="$attrs"
        class="block border-0 bg-transparent focus:outline-none focus:ring-0 outline-none p-0"
        :class="{ 'w-full': !inline }"
        @blur="handleBlur"
        @focus="handleFocus"
      />

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
        <div
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
        </div>
      </div>
    </div>
    <v-form-text
      v-if="!noMessages"
      :messages="messages"
      :state="state"
      :single-line-message="singleLineMessage"
      v-bind="formText"
    >
      <template v-for="(name, slot) of $slots" #[slot]="slotProps">
        <slot :name="slot" v-bind="slotProps"></slot>
      </template>
    </v-form-text>
  </div>
</template>

<script>
// vue
import { ref, computed, watch, inject } from "vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import useUid from "./composition/use-uid";
// components
import vFormText from "./vFormText.vue";
import vChevron from "./vChevron.vue";
import vCloseButton from "./vCloseButton.vue";
import vSpinner from "./vSpinner.vue";
// validators
import { globalValidators } from "../validators";
// tools
import { isFunction } from "../tools";
// props
import { sharedStyleProps, sharedFormProps } from "../shared-props";
import { defaultProps } from "../defaultProps";

export default {
  props: {
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
  },
  components: {
    vFormText,
    vChevron,
    vCloseButton,
    vSpinner,
  },
  emits: [
    "update:modelValue",
    "update:status",
    "update:messages",
    "update:state",
    "input:blur",
    "click:clear-button",
    "click:icon",
    "click:indicator",
  ],
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
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
      return props.inline ? "inline-block align-middle" : "block";
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

    // form validation

    let { addFormInput } = inject("form", {});

    if (addFormInput) {
      addFormInput({ status, formValidate, reset });
    }

    let localModel = useLocalModel(props, emit, updateValue);

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

    return {
      classes,
      wrapperClasses,
      getInputClasses,
      wrapperRef,
      inputRef,
      isElementVisible,
      id,
      state,
      localModel,
      status,
      messages,
      blur,
      handleFocus,
      handleBlur,
      handleMouseEnter,
      handleMouseLeave,
      handleClickIndicator,
      handleClickIcon,
      handleClickClearButton,
    };
  },
};
</script>

<style>
.tw-form-input-reset {
  @apply form-input
}
</style>
