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
    // visibleStates: { type: String, default: "default,valid,invalid" },
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
        prop: computed(() =>
          props.inline ? "inline-flex flex-col" : "flex flex-col"
        ),
      },
    });

    let visible = computed(() => {
      // return props.visibleStates
      //   .split(",")
      //   .includes(props.state === "" ? "default" : props.state);
    });

    let messages = computed(() => {
      if (props.state === "invalid")
      return props.messages
      // let status = props.status;
      // if (!(status.value.dirty && status.value.touched)) return {};
      //
      // return Object.fromEntries(
      //   Object.entries(props.messages).reduce((pm, m) => {
      //     if (status.value[m[0]] === false) {
      //       pm.push(m);
      //       return pm;
      //     }
      //     return pm;
      //   }, [])
      // );
    });

    return {
      classes,
      states,
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
