import { ref, watch, nextTick } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper({
  placement,
  offsetX,
  offsetY,
  noFlip,
  emit,
}) {
  let isPopperOpen = ref(false);
  let instance = null;
  let activator = ref(null);
  let popper = ref(null);

  let showPopper = async function () {
    if (isPopperOpen.value) return;
    isPopperOpen.value = true;
    // for v-if
    await nextTick();
    // for v-show
    instance.update();
    emit("state:opened");
  };

  let hidePopper = function () {
    if (!isPopperOpen.value) return;
    isPopperOpen.value = false;
    emit("state:closed");
  };

  let togglePopper = function () {
    isPopperOpen.value ? hidePopper() : showPopper();
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
    instance = createPopper(activator.value, popper.value, {
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

  return {
    isPopperOpen,
    activator,
    popper,
    showPopper,
    hidePopper,
    togglePopper,
    setPopper,
  };
}
