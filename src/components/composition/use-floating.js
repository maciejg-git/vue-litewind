import { ref, computed, watch, unref, nextTick, isRef } from "vue";
import {
  computePosition,
  autoPlacement,
  flip,
  offset,
  autoUpdate,
  inline,
} from "@floating-ui/dom";

let defaultStyle = {
  position: "absolute",
  width: "min-content",
  top: 0,
  left: 0,
};

let resizeFloatToReferenceWidth = {
  name: "resizeFloatToReferenceWidth",
  fn({ elements }) {
    return {
      data: {
        width: elements.reference.offsetWidth,
      },
    };
  },
};

export default function useFloating(opts) {
  let options = {
    placement: "bottom-start",
    offsetX: 0,
    offsetY: 0,
    flip: false,
    autoPlacement: false,
    inline: false,
    ...opts,
  };

  let isFloatingVisible = ref(false);
  let reference = ref(null);
  let floating = ref(null);
  let destroyFloating = null;

  let localReference = computed(() => {
    return (
      (reference.value && reference.value.reference) ||
      (reference.value && reference.value.$el) ||
      reference.value ||
      virtualElement
    );
  });

  let showFloating = () => {
    if (isFloatingVisible.value) return;
    isFloatingVisible.value = true;

    // v-show floating
    if (floating.value) {
      initFloating();
      setAutoUpdateFloating();
    }
  };

  let hideFloating = () => {
    if (!isFloatingVisible.value) return;
    isFloatingVisible.value = false;

    // v-show floating
    nextTick(() => {
      floating.value && destroyFloating();
    });
  };

  let toggleFloating = () => {
    isFloatingVisible.value ? hideFloating() : showFloating();
  };

  let initFloating = () => {
    Object.assign(floating.value.style, defaultStyle);
  };

  let setAutoUpdateFloating = () => {
    if (!reference.value || !floating.value) return;

    destroyFloating = autoUpdate(
      localReference.value,
      floating.value,
      updateFloating
    );
  };

  let updateFloating = async () => {
    if (!reference.value || !floating.value) return;

    let { x, y, middlewareData } = await computePosition(
      localReference.value,
      floating.value,
      {
        placement: unref(options.placement),
        middleware: [
          offset({
            mainAxis: unref(options.offsetY),
            crossAxis: unref(options.offsetX),
          }),
          unref(options.inline) && inline(),
          unref(options.flip) && flip(),
          unref(options.autoPlacement) && autoPlacement(),
          unref(options.resize) && resizeFloatToReferenceWidth,
        ],
      }
    );

    if (!floating.value) return;

    Object.assign(floating.value.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
    if (middlewareData.resizeFloatToReferenceWidth) {
      Object.assign(floating.value.style, {
        width: `${middlewareData.resizeFloatToReferenceWidth.width}px`,
      });
    }
  };

  let watchableOptions = Object.values(options).filter((i) => isRef(i));

  watch(watchableOptions, () => {
    if (floating.value) updateFloating();
  });

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
    showFloating,
    hideFloating,
    toggleFloating,
    updateVirtualElement,
  };
}
