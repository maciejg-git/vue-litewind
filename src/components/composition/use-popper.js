import { ref, watch, nextTick } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper({
  placement,
  offsetX,
  offsetY,
  noFlip,
  modelValue,
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

  let hidePopper = function () {
    if (!isPopperVisible.value) return;
    isPopperVisible.value = false;
    if (modelValue) emit('update:modelValue', false)
    emit("state:closed");
  };

  let togglePopper = function (ev) {
    isPopperVisible.value ? hidePopper() : showPopper();
  };

  watch([placement, offsetX, offsetY, noFlip], () => {
    if (popper.value) {
      setPopper();
      instance.update();
    }
  });

  watch(popper, () => {
    if (popper.value) setPopper();
  });

  let setPopper = () => {
    instance = createPopper(reference.value, popper.value, {
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
    getBoundingClientRect: getVirtualElement({x: 0, y:0}),
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
  };
}
