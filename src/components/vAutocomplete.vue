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
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import usePopper from "./composition/use-popper.js";
// components
import vInput from "./vInput.vue";
// directives
import detectScrollBottom from "../directives/detect-scroll-bottom";
// tools
import { isString, highlightMatch } from "../tools";
// props
import {
  sharedPopperProps,
  sharedStyleProps,
  sharedFormProps,
} from "../shared-props";
import { defaultProps } from "../defaultProps";

export default {
  props: {
    modelValue: {
      type: [String, Object],
      default: undefined,
    },
    // v-input props
    useLoader: {
      type: Boolean,
      default: defaultProps("autocomplete", "useLoader", true),
    },
    // v-autocomplete props
    ...sharedPopperProps("autocomplete"),
    items: {
      type: Array,
      default: [],
    },
    itemText: {
      type: String,
      default: "text",
    },
    itemValue: {
      type: String,
      default: "value",
    },
    filterKeys: {
      type: Array,
      default: [],
    },
    noFilter: {
      type: Boolean,
      default: defaultProps("autocomplete", "noFilter", false),
    },
    noPagination: {
      type: Boolean,
      default: defaultProps("autocomplete", "noPagination", false),
    },
    emptyDataMessage: {
      type: String,
      default: defaultProps(
        "autocomplete",
        "emptyDataMessage",
        "No data available"
      ),
    },
    noHighlight: {
      type: Boolean,
      default: false,
    },
    input: {
      type: Object,
      default: defaultProps("autocomplete", "input", {}),
    },
    card: {
      type: Object,
      default: defaultProps("autocomplete", "card", {}),
    },
    chevron: {
      type: Object,
      default: defaultProps("autocomplete", "chevron", {}),
    },
    itemsPerPage: {
      type: Number,
      default: defaultProps("autocomplete", "itemsPerPage", 10),
    },
    transition: {
      type: String,
      default: defaultProps("autocomplete", "transition", "fade"),
    },
    styleMenu: {
      type: String,
      default: defaultProps("autocomplete", "styleMenu", ""),
    },
    styleItem: {
      type: String,
      default: defaultProps("autocomplete", "styleItem", ""),
    },
    styleMatch: {
      type: String,
      default: defaultProps("autocomplete", "styleMatch", ""),
    },
    ...sharedStyleProps("autocomplete"),
  },
  components: {
    vInput,
  },
  directives: {
    detectScrollBottom,
  },
  emits: [
    "update:modelValue",
    "update:page",
    "input:value",
    "state:opened",
    "state:closed",
  ],
  inheritAttrs: false,
  setup(props, { emit }) {
    let localModel = useLocalModel(props, emit);

    let selectRef = ref(null)

    let selectedItem = ref(null);
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

    let getItemText = (item, key) => {
      return isString(item)
        ? item
        : item[key !== undefined ? key : props.itemText];
    };

    let getHighligtedText = (item) => {
      return highlightMatch(
        getItemText(item),
        localText.value,
        classes.match.value
      );
    };

    let highlight = (string, match) => {
      return highlightMatch(string, match, classes.match.value);
    };

    let revert = () => {
      if (!selectedItem.value) {
        localText.value = "";
        return;
      }
      localText.value = getItemText(selectedItem.value);
    };

    let cancelInput = () => {
      revert();
      hidePopper();
    };

    let clearInput = () => {
      localText.value = "";
      selectedItem.value = "";
      localModel.value = "";
    };

    // handle template events

    let handleInput = (value) => {
      localText.value = value
      isNewSelection.value = false;
      emit("input:value", localText.value);
    };

    let handleBlurInput = (ev) => {
      if (!isPopperVisible.value) {
        return;
      }

      if (!isPopperChild(ev.relatedTarget)) {
        cancelInput();
      }
    };

    return {
      selectRef,
      localText,
      localModel,
      itemsFiltered,
      getHighligtedText,
      highlight,
      handleBlurInput,
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
