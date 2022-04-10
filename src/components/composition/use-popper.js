import { ref, reactive, watch, nextTick } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper({
  placement,
  offsetX,
  offsetY,
  noFlip,
  emit,
}) {
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
    updateVirtualElement({ x: e.clientX, y: e.clientY })
    showPopper()
  }

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

  watch(popper, () => popper.value && setPopper());

  let setPopper = () => {
    instance = createPopper(reference.value || virtualElement, popper.value, {
      modifiers: [
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
      ],
      placement: placement.value,
    });

    instance.state.styles.popper.width = reference.value.clientWidth + "px"
  };

  // optional virtual element as reference

  let getVirtualElement = ({x, y}) => {
    return () => ({
      width: 0,
      height: 0,
      top: y,
      right: x,
      bottom: y,
      left: x,
    })
  }

  let virtualElement = {
    getBoundingClientRect: getVirtualElement({x: 0, y: 0}),
  };

  let updateVirtualElement = (value) => {
    virtualElement.getBoundingClientRect = getVirtualElement(value)
    if (instance) instance.update()
  }

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
