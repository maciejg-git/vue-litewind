<template>
  <div class="relative inline-flex items-center">
    <slot name="icon">
      <v-icon
        v-if="icon"
        :name="icon"
        class="absolute"
        :class="classes.icon.value"
      ></v-icon>
    </slot>

    <input
      v-model="localModel"
      type="text"
      v-bind="$attrs"
      class="grow"
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
  </div>
</template>

<script>
// vue
import { computed } from "vue";
// composition
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
// props
import { sharedStyleProps, sharedFormProps } from "../shared-props";

export default {
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array, Object],
      default: undefined,
    },
    styleInput: { type: [String, Array], default: "" },
    styleIcon: { type: [String, Array], default: "" },
    styleClearButton: { type: [String, Array], default: "" },
    ...sharedFormProps(null, { icon: true, clearable: true }),
    ...sharedStyleProps("input"),
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

    let localModel = useLocalModel(props, emit);

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

    let state = computed(() => {
      if (props.modelValue._isValidateRef) {
        return props.modelValue.getValidStatus()
      }
    });

    let handleBlur = () => {
      if (props.modelValue._isValidateRef) {
        props.modelValue.touch();
      }
    };

    let handleClickClearButton = () => (localModel.value = "");

    return {
      classes,
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
