import { ref, computed, watch } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper(
  { placement, offsetX, offsetY, noFlip },
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

  let isPopperVisible = ref(false);
  let instance = null;
  let popper = ref(null);
  let localReference = ref(null);

  // reference can be element, template ref or reference prop
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

  // watch component props changes and update instance
  watch([placement, offsetX, offsetY, noFlip], () => {
    if (instance && popper.value) {
      setPopper();
      instance.update();
    }
  });

  // lock is used for component transitions
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
          offset: [offsetX.value, offsetY.value],
        },
      },
      {
        name: "flip",
        enabled: !noFlip.value,
      },
      {
        name: "preventOverflow",
        options: {
          // overflow hidden on cards
          // mainAxis: false,
        },
      },
      {
        name: "arrow",
        options: {
          padding: 6,
        },
      },
      resize,
    ];

    instance = createPopper(reference.value || virtualElement, popper.value, {
      modifiers,
      placement: placement.value,
    });
  };

  let updatePopperInstance = () => {
    if (instance) instance.update();
  };

  // optional virtual element can be used as reference
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
    if (instance) instance.update();
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
    setPopper,
    lockPopper,
    destroyPopperInstance,
    virtualElement,
    updateVirtualElement,
  };
}
