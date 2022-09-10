<template>
  <v-select 
    v-bind="$attrs"
    ref="selectRef" 
    v-model="localModel" 
    :readonly="false" 
    :items="itemsFiltered" 
    @input="handleInput"
  >
    <template v-for="(name, slot) of $slots" #[slot]="slotProps">
      <slot :name="slot" v-bind="slotProps"></slot>
    </template>
  </v-select>
</template>

<script>
// vue
import { ref, computed, watch, toRefs, nextTick } from "vue";
// composition
import useLocalModel from "./composition/use-local-model";
import { isString } from "../tools"
// props
import { defaultProps } from "../defaultProps";

export default {
  props: {
    modelValue: {
      type: [String, Object],
      default: undefined,
    },
    items: {
      type: Array,
      default: [],
    },
    itemText: {
      type: String,
      default: "text",
    },
    filterKeys: {
      type: Array,
      default: [],
    },
    noFilter: {
      type: Boolean,
      default: defaultProps("autocomplete", "noFilter", false),
    },
  },
  emits: [
    "update:modelValue",
    "input:value",
  ],
  inheritAttrs: false,
  setup(props, { emit }) {
    let localModel = useLocalModel(props, emit);

    let selectRef = ref(null)

    let localText = ref("");
    let isNewSelection = ref(true);

    // show autocomplete menu

    watch(
      () => props.items,
      (value) => {
        if (props.noFilter && value) {
          nextTick(() => {
            selectRef.value.show();
          })
        }
      }
    );

    let getItemText = (item, key) => {
      return isString(item) || isBoolean(item)
        ? item
        : item[key !== undefined ? key : props.itemText];
    };

    // get text and value of item

    let itemsFiltered = computed(() => {
      if (props.isLoading || props.noFilter) return props.items;
      if (isNewSelection.value) return props.items;

      if (props.filterKeys.length) {
        return props.items.filter((item) => {
          return props.filterKeys.some((key) => {
            let i = getItemText(item, key);
            return (
              i && i.toLowerCase().indexOf(localText.value.toLowerCase()) !== -1
            );
          });
        });
      }

      return props.items.filter((item) => {
        let i = getItemText(item);
        return (
          i && i.toLowerCase().indexOf(localText.value.toLowerCase()) !== -1
        );
      });
    });

    let revert = () => {
      if (!selectedItem.value) {
        localText.value = "";
        return;
      }
      localText.value = getItemText(selectedItem.value);
    };

    // handle template events

    let handleInput = (value) => {
      localText.value = value
      isNewSelection.value = false;
      emit("input:value", localText.value);
    };

    return {
      selectRef,
      localText,
      localModel,
      itemsFiltered,
      handleInput,
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--autocomplete-transition-duration) ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
