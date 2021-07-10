import { ref, watch, nextTick } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper({
  placement,
  offsetX,
  offsetY,
  noFlip,
  clickOutside,
}) {
  let isOpen = ref(false);
  let instance = null;
  let activator = ref(null);
  let popper = ref(null);

  let show = async function () {
    isOpen.value = true;
    if (clickOutside) {
      setTimeout(() => {
        document.body.addEventListener("click", clickOutside);
      }, 0);
    }
    // for v-if
    await nextTick();
    // for v-show
    instance.update();
  };

  let hide = function () {
    isOpen.value = false;
    if (clickOutside) {
      document.body.removeEventListener("click", clickOutside);
    }
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
          name: "arrow",
        }
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
