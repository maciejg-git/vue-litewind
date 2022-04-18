<template>
  <div class="inline-flex relative items-center"
      v-bind="$attrs"
    >
    <input
      v-model="localText"
      type="text"
      ref="reference"
      class="block w-full pr-10"
      :class="[
        classes.autocomplete.value,
        states.autocomplete.value && states.autocomplete.value[state],
        attrs.disabled === '' || attrs.disabled === true
          ? states.autocomplete.disabled
          : '',
      ]"
      @input="handleInput"
      @focus="handleClickInput"
    />
  <div v-if="!noLoader" class="absolute flex right-0 mr-2">
    <v-spinner v-show="isLoading" type="svg"></v-spinner>
  </div>
  </div>

  <teleport to="body">
    <transition :name="transition" @after-leave="onPopperTransitionLeave">
      <div v-if="isPopperVisible" ref="popper" class="fixed-dropdown">
        <div :class="classes.dropdown.value" v-scroll-bottom="handlePagination">
          <div v-if="!itemsPagination.length && !isLoading" :class="classes.item.value">
            No data available
          </div>
          <div
            v-else
            v-for="item in itemsPagination"
            :key="item"
            :class="getItemClass(item)"
            @click="selectItem(item)"
          >
            <slot name="item" :item="item">
              <span
                v-html="
                  getHighligtedText(item)
                "
              ></span>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { ref, computed, watch, toRefs } from "vue";
import useStyles from "./composition/use-styles";
import useLocalModel from "./composition/use-local-model";
import usePopper from "./composition/use-popper.js";
import useClickOutside from "./composition/use-click-outside";
import vSpinner from "./vSpinner.vue"
import scrollBottom from "../directives/scroll-bottom";
import { sharedPopperProps, sharedStyleProps } from "../sharedProps";

export default {
  props: {
    modelValue: { type: String, default: undefined },
    ...sharedPopperProps({ offsetY: 10 }),
    items: { type: Array, default: [] },
    state: { type: [String, Boolean], default: "" },
    itemText: { type: String, default: "text" },
    itemValue: { type: String, default: "value" },
    isLoading: { type: Boolean, default: false },
    noFilter: { type: Boolean, default: false },
    noPagination: { type: Boolean, default: false },
    noLoader: { type: Boolean, default: false },
    itemsPerPage: { type: Number, default: 10 },
    transition: { type: String, default: "fade" },
    styleAutocomplete: { type: [String, Array], default: "" },
    styleDropdown: { type: [String, Array], default: "" },
    styleItem: { type: [String, Array], default: "" },
    styleMatch: { type: [String, Array], default: "" },
    ...sharedStyleProps("autocomplete"),
  },
  components: {
    vSpinner,
  },
  directives: {
    scrollBottom,
  },
  emits: [
    "update:modelValue",
    "update:page",
    "state:focus",
    "input:value",
    "state:opened",
    "state:closed",
  ],
  setup(props, { attrs, emit }) {
    let { classes, states } = useStyles("autocomplete", props, {
      autocomplete: {
        states: ["valid", "invalid", "disabled"],
      },
      dropdown: {
        fixed: "fixed-autocomplete-dropdown",
      },
      item: {
        fixed: "fixed-item",
        states: ["active", "disabled"],
      },
      match: null,
    });

    let getItemClass = (item) => {
      return [
        item.disabled
          ? [classes.item.value, states.item.value.disabled]
          : classes.item.value,
      ];
    };

    let localModel = useLocalModel(props, emit);

    const { offsetX, offsetY, noFlip, placement, modelValue } = toRefs(props);
    const {
      isPopperVisible,
      reference,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
      onPopperTransitionLeave,
      showVirtualPopper,
    } = usePopper(
      { placement, offsetX, offsetY, noFlip, modelValue, emit },
      { resizePopper: true }
    );

    let { onClickOutside } = useClickOutside();
    let clickOutsideElements = [popper, reference];
    onClickOutside(clickOutsideElements, cancelInput);

    let show = () => {
      isNewSelection.value = true
      showPopper();
    };

    let selected = ref(null);

    let localText = ref("");

    let isNewSelection = ref(true)

    let isVisible = ref(false)

    watch(() => props.isLoading, (value) => {
      isVisible.value && !value && show()
    })

    watch(isVisible, (value) => {
      value && !props.noFilter && show()
    })

    // filter

    let itemsFiltered = computed(() => {
      if (props.isLoading) return props.items
      // if (props.isLoading) return []
      if (isNewSelection.value || props.noFilter) return props.items;

      let regexp = new RegExp(localText.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

      return props.items.filter((i) => {
        return getItemText(i).search(regexp) !== -1;
      });
    });

    // pagination

    let page = ref(0);

    let itemsPagination = computed(() => {
      if (props.itemsPerPage === 0) return itemsFiltered.value;

      return itemsFiltered.value.slice(
        0,
        (page.value + 1) * props.itemsPerPage
      );
    });

    let getItemText = (item) => {
      return item[props.itemText] !== undefined ? item[props.itemText] : item;
    };

    let getItemValue = (item) => {
      return item[props.itemValue] !== undefined ? item[props.itemValue] : item;
    };

    let getHighligtedText = (item) => highlightString(getItemText(item));

    let highlightString = (string) => {
      return string.replace(
        new RegExp(`(${localText.value})`, 'i'),
        `<span class='${classes.match.value}'>$1</span>`
      );
    };

    // update local value and model after selecting option

    let update = (item) => {
      selected.value = item;
      localText.value = getItemText(item);
      localModel.value = getItemValue(item);
    };

    // revert to previous value

    let revert = () => {
      if (!selected.value) {
        localText.value = ""
        return
      }
      localText.value = getItemText(selected.value);
    };

    function cancelInput() {
      isVisible.value = false
      revert();
      hidePopper();
    }

    let selectItem = (item) => {
      isVisible.value = false
      update(item);
      hidePopper();
      console.log(selected)
    };

    let clearInput = () => {
      localText.value = ""
      selected.value = ""
      localModel.value = ""
      emit("update:modelValue", "")
    }

    let state = computed(() => {
      props.state === true
        ? "valid"
        : props.state === false
        ? "invalid"
        : props.state === null
        ? ""
        : props.state;
    });

    // handle template events

    let handlePagination = () => {
      page.value++
      emit("update:page")
    }

    let handleClickInput = () => {
      if (props.noFilter && selected.value) return
      isVisible.value =  true
      emit("state:focus")
    }

    let handleInput = () => {
      isVisible.value = true
      isNewSelection.value = false
      emit("input:value", localText.value);
    };

    return {
      classes,
      states,
      state,
      localText,
      localModel,
      attrs,
      itemsFiltered,
      itemsPagination,
      selectItem,
      getItemText,
      getItemValue,
      getHighligtedText,
      isNewSelection,
      show,
      getItemClass,
      onPopperTransitionLeave,
      page,
      highlightString,
      handleClickInput,
      handleInput,
      handlePagination,
      isPopperVisible,
      reference,
      popper,
      showPopper,
      hidePopper,
      togglePopper,
      showVirtualPopper,
    };
  },
};
</script>

<style scoped>
.fixed-autocomplete-dropdown {
  @apply max-h-[300px] overflow-y-auto overflow-x-hidden;
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
