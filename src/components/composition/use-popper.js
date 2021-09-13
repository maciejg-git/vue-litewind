import { ref, watch, nextTick } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper({
  placement,
  offsetX,
  offsetY,
  noFlip,
  emit,
}) {
  let isOpen = ref(false);
  let instance = null;
  let activator = ref(null);
  let popper = ref(null);

  let show = async function () {
    if (isOpen.value) return;
    isOpen.value = true;
    // for v-if
    await nextTick();
    // for v-show
    instance.update();
    emit("state:opened");
  };

  let hide = function () {
    if (!isOpen.value) return;
    isOpen.value = false;
    emit("state:closed");
  };

  let toggle = function () {
    isOpen.value ? hide() : show();
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
    isOpen,
    activator,
    popper,
    show,
    hide,
    toggle,
    setPopper,
  };
}
