import { ref, computed, watch, unref, isRef, customRef } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper(
  options,
  mods,
  { resizePopper = false } = {}
) {
  // resize modifier to make popper the same width as reference element
  const resize = {
    name: "resize",
    enabled: resizePopper,
    phase: "main",
    fn({ state }) {
      state.styles.popper.width = reference.value.clientWidth + "px";
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

  let popper = customRef((track, trigger) => {
    let popper = null

    return {
      get() {
        track()
        return popper
      },
      set(value) {
        popper = value
        if (value) {
          setPopper();
        } else if (!isLocked.value) {
          destroyPopperInstance();
        }
        trigger()
      }
    }
  })

  let showPopper = async function () {
    if (isPopperVisible.value) return;
    isPopperVisible.value = true;

    // show v-show popper, v-show popper would not trigger popper watch
    if (popper.value) setPopper();
  };

  let hidePopper = function () {
    if (!isPopperVisible.value) return;
    isPopperVisible.value = false;
  };

  let togglePopper = function () {
    isPopperVisible.value ? hidePopper() : showPopper();
  };

  let watchableOptions = [placement, offsetX, offsetY, noFlip].filter((opt) => {
    return isRef(opt);
  });

  // watch component props changes and update instance
  watch(watchableOptions, () => {
    if (instance && popper.value) {
      setPopper();
      instance.update();
    }
  });

  // lock is used for component transitions to prevent destring instance
  let isLocked = ref(false);

  let lockPopper = () => {
    isLocked.value = true;
  };

  let destroyPopperInstance = () => {
    if (instance) {
      instance.destroy();
      instance = null;
      isLocked.value = false;
    }
  };

  let setPopper = () => {
    let modifiers = [
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
    ];

    instance = createPopper(reference.value || virtualElement, popper.value, {
      modifiers,
      placement: unref(placement),
    });
  };

  let updatePopperInstance = () => {
    if (instance) instance.update();
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
