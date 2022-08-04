<template>
  <div class="relative w-min" :class="wrapperClasses">
    <div class="form-textarea" :class="getTextareaClasses">
      <textarea
        v-model="localModel"
        v-bind="$attrs"
        class="transparent-textarea"
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
    block: { type: Boolean, default: false },
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
      return props.block ? "block" : "inline-block";
    });

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
    let { validateOn, validateMode } = props

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
        if (validateMode === 'eager' || wasInvalid.value) {
          return "invalid";
        }
      } else {
        if (validateMode === 'eager' || wasInvalid.value) {
          return "valid";
        }
      }
      return state.value
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
      validate(localModel.value)

      status.value.touched = true;

      if (!status.value.valid) {
        wasInvalid.value = true;
      }

      state.value = updateState();
    };

    let formValidate = () => {
      validate(localModel.value)

      status.value.validated = true;

      if (!status.value.valid) {
        wasInvalid.value = true;
      }

      state.value = updateState();
    };

    watch(status, () => emit("update:status", status.value), {
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
        if (globalValidators[key]) {
          res = globalValidators[key](value, v);
          newStatus[key] = res === true;
          if (res !== true) newMessages[key] = res;
        } else if (typeof props.rules[key] === "function") {
          res = props.rules[key](value);
          newStatus[key] = res === true;
          if (res !== true) newMessages[key] = res;
        }
        newStatus.valid = newStatus.valid && newStatus[key];
      }

      newStatus.optional = !props.rules.required && value === "";

      return { newStatus, newMessages };
    };

    if (addInput) addInput({ status, formValidate, reset });

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
