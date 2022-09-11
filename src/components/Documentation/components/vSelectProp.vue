<template>
  <v-select
    v-model="localModel"
    :items="[true, false]"
    style-icon="true:valid false:invalid"
    :input="{ variant: localModel }"
    :card="{ styleCard: 'menu shadow' }"
    :icon="localModel ? 'b-check-lg' : 'b-x'"
    @click:icon="localModel = !localModel"
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

    return {
      localModel
    }
  }
};
</script>
