import { ref, computed, watch, unref, nextTick, reactive } from "vue"
import {computePosition, offset, autoUpdate, autoPlacement, flip} from '@floating-ui/dom';

let defaultStyles = {
  position: "absolute",
  width: "max-content",
  top: 0,
  left: 0,
}

export default function usePopper(
  opts
) {
  let options = {
    placement: "bottom-start",
    offsetX: 0,
    offsetY: 0,
    flip: false,
    autoPlacement: false,
    ...opts,
  }

  let isFloatingVisible = ref(false);
  let floating = ref(null);
  let localReference = ref(null);
  let destroyFloating = null

  // localReference can by any template ref (component or element)
  // reference is always html element: components $el or exposed reference element
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

  let showPopper = function () {
    if (isFloatingVisible.value) return;
    isFloatingVisible.value = true;

    // show v-show popper, v-show popper does not trigger popper watch
    if (floating.value) setAutoUpdateFloating();
  };

  let hidePopper = function () {
    if (!isFloatingVisible.value) return;
    isFloatingVisible.value = false;

    // v-show popper
    nextTick(() => {
      floating.value && destroyFloating()
    })
  };

  let togglePopper = function () {
    isFloatingVisible.value ? hidePopper() : showPopper();
  };

  let initPopper = () => {
    Object.assign(floating.value.style, defaultStyles)
  }

  let setAutoUpdateFloating = () => {
    destroyFloating = autoUpdate(
      reference.value || virtualElement,
      floating.value,
      setFloating,
    )
  }

  let setFloating = async () => {
    let {x, y} = await computePosition(reference.value || virtualElement, floating.value, {
      placement: unref(options.placement),
      middleware: [
        offset({
          mainAxis: unref(options.offsetY),
          crossAxis: unref(options.offsetX),
        }),
        unref(options.autoPlacement) && autoPlacement(),
        unref(options.flip) && flip(),
      ]
    })
      Object.assign(floating.value.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  }

  watch(floating, (value) => {
    if (value) {
      initPopper()
      setAutoUpdateFloating()
      return;
    }

    destroyFloating()
    destroyFloating = null
  });

  // optional virtual element can be used as reference instead of html element
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
  };

  return {
    isFloatingVisible,
    reference,
    rawReference: localReference,
    floating,
    showPopper,
    hidePopper,
    togglePopper,
    updateVirtualElement,
  };
}
