<template>
  <div class="relative" :class="wrapperClasses">
    <div class="form-textarea block" :class="getTextareaClasses">
      <textarea
        v-model="localModel"
        v-bind="$attrs"
        class="transparent-textarea"
        :class="{'w-full': !inline}"
        @blur="handleBlur"
      ></textarea>
    </div>
    <slot name="form-text">
      <v-form-text
        :messages="messages"
        :state="state"
        :status="status"
        class="absolute"
      ></v-form-text>
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
    modelValue: { type: String, default: undefined },
    inline: { type: Boolean, default: false },
    rules: { type: Object, default: {} },
    validateOn: { type: String, default: "blur" },
    validateMode: { type: String, default: "silent" },
    styleTextarea: { type: [String, Array], default: "" },
    ...sharedFormProps(null),
    ...sharedStyleProps(),
  },
  components: {
    vFormText,
  },
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("textarea", props, {
      textarea: {
        states: ["valid", "invalid", "disabled"],
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
    let { validateOn, validateMode } = props

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

      return status.value.valid ? "valid" : "invalid"
    };

    watch(
      () => props.state,
      (newState) => (state.value = newState),
      { immediate: true },
    );

    let validate = (value) => {
      let { newStatus, newMessages } = getValidateStatus(value);
      status.value = newStatus;
      messages.value = newMessages;
    }

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

        if (!validator) return true;

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
    };

    emitValidationStatus();

    let { addFormInput } = inject("form", {});

    if (addFormInput) {
      addFormInput({ status, formValidate, reset });
    }

    let localModel = useLocalModel(props, emit, updateValue);

    // handle template events

    let handleBlur = () => touch();

    return {
      classes,
      wrapperClasses,
      state,
      localModel,
      getTextareaClasses,
      status,
      messages,
      handleBlur,
    };
  },
};
</script>

<style scoped>
.transparent-textarea {
  @apply block border-0 bg-transparent focus:outline-none focus:ring-0 outline-none p-0;
}
</style>
