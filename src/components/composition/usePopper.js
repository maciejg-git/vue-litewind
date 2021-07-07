import { ref, watch, nextTick } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper({
  placement,
  offsetX,
  offsetY,
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

  watch([placement, offsetX, offsetY], () => {
    if (popper.value) {
      setPopper();
      instance.update();
    }
  });

  watch(
    popper,
    () => {
      if (popper.value) setPopper();
    },
    { flush: "post" }
  );

  let setPopper = () => {
    let options = {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [offsetX.value, offsetY.value],
          },
        },
        {
          name: "flip",
        },
      ],
      placement: placement.value,
    }
    instance = createPopper(activator.value, popper.value, options);
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
