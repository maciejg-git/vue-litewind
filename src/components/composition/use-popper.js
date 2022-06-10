import { ref, computed, watch, nextTick } from "vue";
import { createPopper } from "@popperjs/core";

export default function usePopper(
  { placement, offsetX, offsetY, noFlip, emit },
  { resizePopper = false, destroyOnRemove = false } = {}
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
  let localReference = ref(null)

  // reference can be element or template ref
  let reference = computed({
    get() {
      return (localReference.value && localReference.value.$el) || localReference.value
    },
    set (value) {
      localReference.value = value
    }
  })

  let showPopper = async function () {
    console.log('show popper')
    if (isPopperVisible.value) return;
    isPopperVisible.value = true;
    // for v-if
    await nextTick();
    // for v-show
    instance.update();
    emit("state:opened");
  };

  let hidePopper = function () {
    console.log('hide popper')
    if (!isPopperVisible.value) return;
    isPopperVisible.value = false;
    emit("state:closed");
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

  // watch popper element and create new instance
  watch(popper, (value) => {
    if (value) setPopper();
    else if (destroyOnRemove) destroyInstance();
  });

  let destroyInstance = () => {
    if (instance) {
      instance.destroy();
      instance = null;
    }
  };

  let onPopperTransitionLeave = () => destroyInstance();

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

  // call updateVirtualElement before showing or updating position of virtual popper
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
    onPopperTransitionLeave,
    virtualElement,
    updateVirtualElement,
  };
}
