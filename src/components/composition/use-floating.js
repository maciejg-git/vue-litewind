import { ref, computed, watch, unref, nextTick, isRef } from "vue";
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
  let reference = ref(null)
  let floating = ref(null);
  let destroyFloating = null;

  let localReference = computed(() => {
    return (reference.value && reference.value.reference) ||
        (reference.value && reference.value.$el) ||
        reference.value || virtualElement
  })

  let showPopper = () => {
    if (isFloatingVisible.value) return;
    isFloatingVisible.value = true;

    // v-show floating
    if (floating.value) setAutoUpdateFloating();
  };

  let hidePopper = () => {
    if (!isFloatingVisible.value) return;
    isFloatingVisible.value = false;

    // v-show floating
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
      localReference.value,
      floating.value,
      updateFloating,
    );
  };

  let updateFloating = async () => {
    let { x, y } = await computePosition(
      localReference.value,
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

  let watchableOptions = Object.values(options).filter((i) => isRef(i))

  watch(watchableOptions, updateFloating)

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
    updateFloating,
    showPopper,
    hidePopper,
    togglePopper,
    updateVirtualElement,
  };
}
