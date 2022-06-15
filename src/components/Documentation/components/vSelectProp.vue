<template>
  <v-select
    v-model="localModel"
    style-icon="true:valid false:invalid"
    :variant="localModel"
    :icon="localModel ? 'b-check-lg' : 'b-x'"
    @input:icon-click="localModel = !localModel"
  >
    <option :value="true">true</option>
    <option :value="false">false</option>
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
