import { ref, computed, watch } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper({ placement, offsetX, offsetY, clickOutside }) {
  let isOpen = ref(false);
  let instance = null;
  let activator = ref(null);
  let popper = ref(null);

  let show = function () {
    console.log("show");
    isOpen.value = true;
    setTimeout(() => {
      document.body.addEventListener("mouseup", clickOutside);
    }, 0);
    instance.update();
  };

  let hide = function () {
    console.log("hide");
    isOpen.value = false;
    document.body.removeEventListener("mouseup", clickOutside);
  };

  let toggle = function () {
    console.log("toggle");
    isOpen.value ? hide() : show();
  };

  watch(
    [placement, offsetX, offsetY],
    () => {
      console.log('watch')
      setPopper();
      instance.update();
    }
  );

  let setPopper = () => {
    console.log('set popper')
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
