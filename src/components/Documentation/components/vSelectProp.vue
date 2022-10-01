<template>
  <v-select
    v-model="localModel"
    :items="[true, false]"
    style-icon="true:valid false:invalid"
    :input="{ variant: localModel }"
    :card="{ styleCard: 'menu shadow', base: 'flat' }"
    :icon="localModel ? 'b-check-lg' : 'b-x'"
    @click:icon="handleClickIcon"
    :offsetY="5"
    inline
  >
  </v-select>
</template>

<script>
import { computed } from "vue"

export default {
  props: {
    modelValue: { type: Boolean, default: undefined },
  },
  setup(props, { emit }) {
    let localModel = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit("update:modelValue", value)
      }
    })

    let handleClickIcon = (ev) => {
      ev.stopPropagation()
      localModel.value = !localModel.value
    }

    return {
      localModel,
      handleClickIcon,
    }
  }
};
</script>
