<template>
  <div class="relative" :class="wrapperClasses">
    <div ref="wrapper" class="form-input flex items-center" :class="getInputClasses">
      <slot name="icon">
        <div v-if="icon" @click="handleIconClick" class="mr-2">
          <v-icon :name="icon" :class="classes.icon.value"></v-icon>
        </div>
      </slot>

      <slot name="prepend"></slot>

      <input
        v-model="localModel"
        ref="inputRef"
        type="text"
        v-bind="$attrs"
        class="transparent-input"
        :class="{ 'w-full': !inline }"
        @blur="handleBlur"
      />

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
        <v-close-button
          v-if="clearable"
          style-close-button="small"
          v-bind="closeButton"
          aria-label="Close"
          class="ml-2"
          @click="handleClickClearButton"
        ></v-close-button>
        <div
          v-if="showIndicator"
          aria-label="Close"
          tabindex="-1"
          class="focus:outline-none ml-2"
          @click="handleClickIndicator"
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
    <slot name="form-text">
      <v-form-text
        :messages="messages"
        :state="state"
        :single-line-message="singleLineMessage"
        class="absolute"
      >
        <template #message="message">
          <slot name="message" v-bind="message"></slot>
        </template>
      </v-form-text>
    </slot>
  </div>
</template>

<script>
// vue
import { ref, computed, watch, inject } from "vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
// components
import vFormText from "./vFormText.vue";
// validators
import { globalValidators } from "../validators";
// props
import { sharedStyleProps, sharedFormProps } from "../shared-props";

export default {
  props: {
    modelValue: { type: [String, Number, Array], default: "" },
    inline: { type: Boolean, default: false },
    rules: { type: Object, default: {} },
    validateOn: { type: String, default: "blur" },
    validateMode: { type: String, default: "silent" },
    useLoader: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false },
    singleLineMessage: { type: Boolean, default: false },
    showIndicator: { type: Boolean, default: false },
    indicatorSwitch: { type: Boolean, default: false },
    spinner: { type: Object, default: {} },
    closeButton: { type: Object, default: {} },
    chevron: { type: Object, default: {} },
    styleInput: { type: [String, Array], default: "" },
    styleIcon: { type: [String, Array], default: "" },
    ...sharedFormProps(null, { icon: true, clearable: true }),
    ...sharedStyleProps(),
  },
  components: {
    vFormText,
  },
  emits: ["update:modelValue", "update:status", "update:state", "input:clear"],
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("input", props, {
      input: {
        states: ["valid", "invalid", "disabled"],
      },
      icon: null,
    });

    let getInputClasses = computed(() => {
      return [
        classes.input.value,
        state && states.input.value && states.input.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.input.disabled
          : "",
      ];
    });

    let wrapperClasses = computed(() => {
      return props.inline ? "inline-block" : "block";
    });

    let inputRef = ref(null)
    let wrapper = ref(null)

    // validate

    let { addInput } = inject("form", {});

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

    let updateState = () => {
      if (props.state !== null) return props.state;
      if (status.value.optional) return "";

      if (!status.value.valid) {
        if (validateMode === "eager" || wasInvalid.value) {
          return "invalid";
        }
      } else {
        if (validateMode === "eager" || wasInvalid.value) {
          return "valid";
        }
      }
      return state.value;
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
      emit("update:modelValue", v);

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
    };

    let touch = () => {
      validate(localModel.value);
      status.value.touched = true;

      if (!status.value.valid) {
        wasInvalid.value = true;
      }

      state.value = updateState();
    };

    let formValidate = () => {
      validate(localModel.value);
      status.value.validated = true;

      if (!status.value.valid) {
        wasInvalid.value = true;
      }

      state.value = updateState();
    };

    watch(status, () => emit("update:status", status.value), {
      immediate: true,
    });

    watch(state, () => emit("update:state", state.value), {
      immediate: true,
    });

    let getValidateStatus = (value) => {
      let newStatus = {
        valid: true,
        optional: false,
        touched: status.value.touched,
        validated: status.value.validated,
        dirty: status.value.dirty || !!(value && !!value.length),
      };

      let newMessages = {};

      let res = null;

      for (let [key, v] of Object.entries(props.rules)) {
        let validator = globalValidators[key] || typeof props.rules[key] === "function" && props.rules[key]

        if (validator) {
          res = validator(value, v)
          newStatus[key] = res === true;
          if (res !== true) newMessages[key] = res;
        }

        // if (globalValidators[key]) {
        //   res = globalValidators[key](value, v);
        //   newStatus[key] = res === true;
        //   if (res !== true) newMessages[key] = res;
        // } else if (typeof props.rules[key] === "function") {
        //   res = props.rules[key](value);
        //   newStatus[key] = res === true;
        //   if (res !== true) newMessages[key] = res;
        // }
        newStatus.valid = newStatus.valid && newStatus[key];
      }

      newStatus.optional = !props.rules.required && value === "";

      return { newStatus, newMessages };
    };

    if (addInput) {
      addInput({ status, formValidate, reset });
    }

    let localModel = useLocalModel(props, emit, updateValue);

    // handle template events

    let handleBlur = (ev) => {
      touch();

      let target = wrapper.value.contains(ev.relatedTarget)

      if (!target) {
        emit("input:blur", ev)
      } 
    }

    let handleClickIndicator = () => {
      emit("click:indicator", inputRef.value)
    }

    let handleClickClearButton = () => {
      if (localModel.value.length) {
        localModel.value = "";
      }
      emit("input:clear");
    };

    return {
      classes,
      wrapperClasses,
      getInputClasses,
      inputRef,
      state,
      wrapper,
      localModel,
      status,
      messages,
      handleBlur,
      handleClickIndicator,
      handleClickClearButton,
    };
  },
};
</script>

<style scoped>
.transparent-input {
  @apply block border-0 bg-transparent focus:outline-none focus:ring-0 outline-none p-0;
}
</style>
