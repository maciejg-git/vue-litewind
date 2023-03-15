import { ref, computed, watch, unref, nextTick } from "vue";
import {
  computePosition,
  autoPlacement,
  flip,
  offset,
  autoUpdate,
} from "@floating-ui/dom";

let defaultStyle = {
  placement: "absolute",
  width: "min-content",
  top: 0,
  left: 0,
};

export default function useFloating(opts) {
  let options = {
    placement: "bottom-start",
    offsetX: 0,
    offsetY: 0,
    flip: false,
    autoPlacement: false,
    ...opts,
  };

  let isFloatingVisible = ref(false);
  let localReference = ref(null);
  let floating = ref(null);
  let destroyFloating = null;

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

  let showPopper = () => {
    if (isFloatingVisible.value) return;
    isFloatingVisible.value = true;

    if (floating.value) setAutoUpdateFloating();
  };

  let hidePopper = () => {
    if (!isFloatingVisible.value) return;
    isFloatingVisible.value = false;

    nextTick(() => {
      floating.value && destroyFloating();
    });
  };

  let togglePopper = () => {
    isFloatingVisible.value ? hidePopper() : showPopper();
  };

  let initFloating = () => {
    Object.assign(floating.value.style, defaultStyle);
  };

  let setAutoUpdateFloating = () => {
    destroyFloating = autoUpdate(
      reference.value || virtualElement,
      floating.value,
      setFloating
    );
  };

  let setFloating = async () => {
    let { x, y } = await computePosition(
      reference.value || virtualElement,
      floating.value,
      {
        placement: unref(options.placement),
        middleware: [
          offset({
            mainAxis: unref(options.offsetY),
            crossAxis: unref(options.offsetX),
          }),
          unref(options.flip) && flip(),
          unref(options.autoPlacement) && autoPlacement(),
        ],
      }
    );
    Object.assign(floating.value.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  };

  watch(floating, (value) => {
    if (value) {
      initFloating();
      setAutoUpdateFloating();
      return;
    }

    destroyFloating();
    destroyFloating = null;
  });

  let generateGetBoundingClientRect = ({ x, y }) => {
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
    getBoundingClientRect: generateGetBoundingClientRect({ x: 0, y: 0 }),
  };

  let updateVirtualElement = (event) => {
    virtualElement.getBoundingClientRect = generateGetBoundingClientRect(event);
  };

  return {
    isFloatingVisible,
    reference,
    floating,
    showPopper,
    hidePopper,
    togglePopper,
    updateVirtualElement,
  };
}
