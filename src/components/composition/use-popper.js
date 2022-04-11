import { ref, reactive, watch, nextTick } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper(
  { placement, offsetX, offsetY, noFlip, emit },
  { resizePopper = false } = {}
) {
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
  let reference = ref(null);
  let popper = ref(null);

  let showPopper = async function () {
    if (isPopperVisible.value) return;
    isPopperVisible.value = true;
    // for v-if
    await nextTick();
    // for v-show
    instance.update();
    emit("state:opened");
  };

  let showVirtualPopper = (e) => {
    updateVirtualElement({ x: e.clientX, y: e.clientY });
    showPopper();
  };

  let hidePopper = function () {
    if (!isPopperVisible.value) return;
    isPopperVisible.value = false;
    emit("state:closed");
  };

  let togglePopper = function () {
    isPopperVisible.value ? hidePopper() : showPopper();
  };

  watch([placement, offsetX, offsetY, noFlip], () => {
    if (instance && popper.value) {
      setPopper();
      instance.update();
    }
  });

  watch(popper, (value) => {
    if (value) setPopper()
    else instance.destroy()
  });

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
      resize,
    ];

    instance = createPopper(reference.value || virtualElement, popper.value, {
      modifiers,
      placement: placement.value,
    });
  };

  // optional virtual element as reference

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

  let updateVirtualElement = (value) => {
    virtualElement.getBoundingClientRect = getVirtualElement(value);
    if (instance) instance.update();
  };

  return {
    isPopperVisible,
    reference,
    popper,
    showPopper,
    hidePopper,
    togglePopper,
    setPopper,
    virtualElement,
    updateVirtualElement,
    showVirtualPopper,
  };
}
