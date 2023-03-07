import { ref, computed, watch, unref, isRef } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper(
  options,
  mods,
  { resizePopper = false } = {}
) {
  const resize = {
    name: "resize",
    enabled: resizePopper,
    phase: "beforeWrite",
    requires: ["computeStyles"],
    fn: ({ state }) => {
      state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    effect: ({ state }) => {
      state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
    },
  };

  let {
    placement = "auto",
    offsetX = 0,
    offsetY = 0,
    noFlip = false,
  } = options;

  let isPopperVisible = ref(false);
  let instance = null;
  let popper = ref(null);
  let localReference = ref(null);

  // localReference can by any template ref (component or element)
  // reference is always html element: components $el or exposed reference element
  let reference = computed({
    get() {
      return (
        (localReference.value && localReference.value.reference) ||
        (localReference.value && localReference.value.$el) ||
        localReference.value
      );
    },
    set(value) {
      localReference.value = value;
    },
  });

  let showPopper = async function () {
    if (isPopperVisible.value) return;
    isPopperVisible.value = true;

    // show v-show popper, v-show popper does not trigger popper watch
    if (popper.value) setPopper();
  };

  let hidePopper = function () {
    if (!isPopperVisible.value) return;
    isPopperVisible.value = false;
  };

  let togglePopper = function () {
    isPopperVisible.value ? hidePopper() : showPopper();
  };

  // lock is used for component transitions to prevent destring instance
  let isLocked = ref(false);

  let lockPopper = () => {
    isLocked.value = true;
  };

  // watch popper element and create new instance
  watch(popper, (value) => {
    if (value) {
      setPopper();
      return;
    }

    if (!isLocked.value) {
      destroyPopperInstance();
    }
  });

  let popperOptions = computed(() => {
    return {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [unref(offsetX), unref(offsetY)],
          },
        },
        {
          name: "flip",
          enabled: !unref(noFlip),
        },
        resize,
        ...(mods || []),
      ],
      placement: unref(placement),
    };
  });

  watch(popperOptions, () => {
    if (instance && popper.value) {
      instance.setOptions(popperOptions.value);
    }
  });

  let setPopper = () => {
    instance = createPopper(
      reference.value || virtualElement,
      popper.value,
      popperOptions.value
    );
  };

  let updatePopperInstance = () => {
    if (instance) instance.update();
  };

  let destroyPopperInstance = () => {
    if (instance) {
      instance.destroy();
      instance = null;
      isLocked.value = false;
    }
  };

  // optional virtual element can be used as reference instead of html element
  let getVirtualElement = ({ x, y }) => {
    return () => ({
      width: 0,
      height: 0,
      top: y,
      right: x,
      bottom: y,
      left: x,
    });
  };

  let virtualElement = {
    getBoundingClientRect: getVirtualElement({ x: 0, y: 0 }),
  };

  // call updateVirtualElement in your component before showing or updating position of virtual popper
  let updateVirtualElement = (value) => {
    virtualElement.getBoundingClientRect = getVirtualElement(value);

    if (instance) {
      instance.update();
    }
  };

  return {
    isPopperVisible,
    reference,
    referenceInstance: localReference,
    updatePopperInstance,
    popper,
    showPopper,
    hidePopper,
    togglePopper,
    lockPopper,
    destroyPopperInstance,
    updateVirtualElement,
  };
}
