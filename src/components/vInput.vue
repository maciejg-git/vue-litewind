<template>
  <div class="relative items-center" :class="wrapperClasses">
    <slot name="icon">
      <button v-if="icon" class="absolute" @click="handleIconClick">
        <v-icon :name="icon" :class="classes.icon.value"></v-icon>
      </button>
    </slot>

    <input
      v-model="localModel"
      type="text"
      v-bind="$attrs"
      :class="getInputClasses()"
      @blur="handleBlur"
    />

    <div v-if="clearable" class="absolute flex right-0 mr-3">
      <button
        class="focus:outline-none"
        aria-label="Close"
        @click="handleClickClearButton"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          :class="classes.clearButton.value"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"
          />
        </svg>
      </button>
    </div>
    <v-form-text v-if="modelValue._isValidateRef" :state="state" :status="modelValue.status" :messages="modelValue.messages"></v-form-text>
  </div>
</template>

<script>
// vue
import { ref, computed, watch, inject } from "vue";
import vFormText from "./vFormText.vue"
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
// props
import { sharedStyleProps, sharedFormProps } from "../shared-props";

export default {
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: "",
    },
    block: { type: Boolean, default: false },
    validate: { type: String, default: "on-blur silent" },
    styleInput: { type: [String, Array], default: "" },
    styleIcon: { type: [String, Array], default: "" },
    styleClearButton: { type: [String, Array], default: "" },
    ...sharedFormProps(null, { icon: true, clearable: true }),
    ...sharedStyleProps("input"),
  },
  components: {
    vFormText,
  },
  emits: ["update:modelValue"],
  inheritAttrs: false,
  setup(props, { attrs, emit }) {
    let { classes, states, variants } = useStyles("input", props, {
      input: {
        states: ["valid", "invalid", "disabled"],
        variants: ["icon-variant"],
      },
      clearButton: {
        name: "clear-button",
      },
      icon: null,
    });

    let wrapperClasses = computed(() => {
      return props.block ? "flex" : "inline-flex";
    });

    let { updateFormFieldValue, status, touch } = inject("form-field", {})

    let localModel = useLocalModel(props, emit, updateFormFieldValue);

    let getInputClasses = () => {
      return [
        classes.input.value,
        states.input.value && states.input.value[state.value],
        attrs.disabled === "" || attrs.disabled === true
          ? states.input.disabled
          : "",
        props.icon ? variants.input.value["icon-variant"] : "",
        props.clearable ? variants.input.value["clearable-variant"] : "",
      ];
    };

    let state = ref("");

    if (props.modelValue._isValidateRef) {
      let { status } = props.modelValue;

      let [validateOn, validateMode] = props.validate.split(" ")

      watch(
        status,
        (s, prev) => {
          let touched = (s.touched !== prev.touched) && !s.validated;
          let validated = s.validated !== prev.validated;
          let immediate =
            s.touched || s.validated || validateOn === "immediate";

          if (validated) {
            if (!s.valid) {
              state.value = "invalid";
            } else {
              if (validateMode === "eager") {
                state.value = "valid";
              }
            }
            return;
          }

          if (touched) {
            if (!s.valid) {
              state.value = "invalid";
            } else {
              if (validateMode === "eager") {
                state.value = "valid";
              }
            }
            return;
          }

          if (immediate) {
            if (!s.valid) {
              if (validateMode === "silent") {
                if (s.wasValid || s.wasInvalid) {
                  state.value = "invalid";
                }
                return;
              }
              if (validateMode === "eager") {
                state.value = "invalid";
              }
            } else {
              if (validateMode === "silent") {
                if (s.wasInvalid) {
                  state.value = "valid";
                }
                return;
              }
              if (validateMode === "eager") {
                state.value = "valid";
              }
            }
          }
        },
        { deep: true }
      );
    }

    let handleBlur = () => {
      touch()
      if (props.modelValue._isValidateRef) {
        // if (status.value.touched) return
        props.modelValue.touch();
      }
    };

    let handleClickClearButton = () => (localModel.value = "");

    return {
      classes,
      wrapperClasses,
      states,
      variants,
      getInputClasses,
      state,
      localModel,
      handleBlur,
      handleClickClearButton,
    };
  },
};
</script>

<style scoped></style>
