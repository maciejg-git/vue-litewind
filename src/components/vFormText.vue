<template>
  <transition name="fade">
    <div
      :class="[
        classes.formText.value,
        states.formText.value && states.formText.value.invalid,
      ]"
    >
      <slot name="default" :state="state">
        <transition-group name="fade">
          <div v-for="m in messages" :key="m">
            <slot name="prepend-message"></slot>
            <slot name="message" :message="m">
              {{ m }}
            </slot>
          </div>
        </transition-group>
      </slot>
    </div>
  </transition>
</template>

<script>
// vue
import { computed } from "vue";
// composition
import useStyles from "./composition/use-styles";
// props
import { sharedStyleProps } from "../shared-props";

export default {
  props: {
    state: { type: [String, Boolean], default: "" },
    status: { type: Object, default: {} },
    inline: { type: Boolean, default: false },
    visibleStates: { type: String, default: "default,valid,invalid" },
    messages: { type: Object, default: {} },
    styleFormText: { type: [String, Array], default: "" },
    ...sharedStyleProps("form-text"),
  },
  setup(props) {
    let { classes, states } = useStyles("form-text", props, {
      formText: {
        name: "form-text",
        fixed: "fixed-form-text",
        states: ["valid", "invalid", "disabled"],
        prop: computed(() => (props.inline ? "inline-flex" : "flex flex-col")),
      },
    });

    let state = computed(() =>
      props.state === true
        ? "valid"
        : props.state === false
        ? "invalid"
        : props.state === null
        ? ""
        : props.state
    );

    let visible = computed(() => {
      return props.visibleStates
        .split(",")
        .includes(state.value === "" ? "default" : state.value);
    });

    let messages = computed(() => {
      let status = props.status
      if (!status.value.isValidated()) return {};
      return Object.fromEntries(
        Object.entries(props.messages).filter(
          (m) => status.value[m[0]] === false
        )
      );
    });

    return {
      classes,
      states,
      state,
      visible,
      messages,
    };
  },
};
</script>

<style scoped lang="postcss">
.fixed-form-text {
  /* @apply items-center; */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
