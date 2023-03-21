import { correctPlacement } from "../const.js";
import {
  computePosition,
  autoPlacement,
  flip,
  offset,
  autoUpdate,
  inline,
} from "@floating-ui/dom";

let defaults = {
  placement: "bottom",
  delay: 50,
  offsetX: 0,
  offsetY: 0,
  inline: false,
  flip: true,
  autoPlacement: false,
  transition: "fade",
};

let transitions = ["fade", "scale-fade", ""];

let removeHideTimers = (el) => {
  clearTimeout(el._v_tooltip.timerOut);
  clearTimeout(el._v_tooltip.timerRemove);
};

let removeShowTimer = (el) => {
  clearTimeout(el._v_tooltip.timer);
};

function show(ev) {
  let el = ev.target;

  removeHideTimers(el);

  if (el._v_tooltip.isVisible) return;

  getTooltipFnContent(el);

  el._v_tooltip.timer = setTimeout(() => {
    document.body.appendChild(el._v_tooltip.wrapper);
    requestAnimationFrame(() => {
      addTransition(el._v_tooltip, false);
    });
    el._v_tooltip.destroyFloating = setAutoUpdateFloating(el);
    el._v_tooltip.isVisible = true;
  }, el._v_tooltip.delay);
}

function hide(ev) {
  let el = ev.target;

  removeShowTimer(el);

  if (!el._v_tooltip.isVisible) return;

  el._v_tooltip.timerOut = setTimeout(() => {
    addTransition(el._v_tooltip, true);
    el._v_tooltip.timerRemove = setTimeout(
      () => {
        el._v_tooltip.wrapper.remove();
        el._v_tooltip.destroyFloating();
        el._v_tooltip.destroyFloating = null;
        el._v_tooltip.isVisible = false;
      },
      el._v_tooltip.transition === "" ? 0 : 200
    );
  }, el._v_tooltip.delay);
}

let getTooltipFnContent = (el) => {
  if (typeof el._v_tooltip.text === "function") {
    el._v_tooltip.tooltip.firstChild.innerText = el._v_tooltip.text();
  }
};

let setAutoUpdateFloating = (el) => {
  return autoUpdate(
    el,
    el._v_tooltip.wrapper,
    updateFloating(el, el._v_tooltip.wrapper, el._v_tooltip)
  );
};

let updateFloating = (reference, floating, options) => {
  return async () => {
    let { x, y } = await computePosition(reference, floating, {
      placement: options.placement,
      middleware: [
        offset({
          mainAxis: options.offsetY,
          crossAxis: options.offsetX,
        }),
        options.inline && inline(),
        options.flip && flip(),
        options.autoPlacement && autoPlacement(),
      ],
    });

    if (!floating) return;

    Object.assign(floating.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  };
};

function createTooltipElement() {
  let el = document.createElement("div");

  Object.assign(el.style, {
    position: "absolute",
    top: 0,
    left: 0,
  });

  el.innerHTML =
    "<div class='tooltip'><div class='tooltip--content'></div></div>";

  return el;
}

function addTransition(m, v) {
  if (m.transition == "") return;
  if (m.transition == "fade" || m.transition == "scale-fade") {
    m.tooltip.style.opacity = v ? 0 : 1;
  }
  if (m.transition == "scale-fade") {
    m.tooltip.style.transform = v ? "scale(0.9)" : "scale(1)";
  }
}

function addFixedTransition(m) {
  if (m.transition === "") return;
  m.tooltip.style.transition = "opacity 0.2s ease, transform 0.2s";
}

let validateOptions = (options) => {
  options.transition = transitions.includes(options.transition)
    ? options.transition
    : defaults.transition;
  options.placement = correctPlacement.includes(options.placement)
    ? options.placement
    : defaults.placement;
};

let getOptions = (value) => {
  if (typeof value === "object") {
    return {
      ...defaults,
      ...value,
    };
  }
  if (typeof value === "string" || typeof value === "function") {
    return {
      ...defaults,
      text: value,
    };
  }
  return defaults;
};

export default {
  mounted(el, binding) {
    let options = getOptions(binding.value);

    validateOptions(options);

    let wrapper = createTooltipElement();

    let t = {
      wrapper,
      tooltip: wrapper.firstChild,
      timer: null,
      timerOut: null,
      timerRemove: null,
      isVisible: false,
      destroyFloating: null,
      ...options,
    };

    if (typeof t.text === "string") {
      t.tooltip.firstChild.innerText = t.text;
    } else if (t.text === undefined) {
      t.tooltip.firstChild.innerText = el.getAttribute("data-title") || "";
    }

    addFixedTransition(t, true);
    addTransition(t, true);

    el._v_tooltip = t;

    el.addEventListener("mouseenter", show);
    el.addEventListener("mouseleave", hide);
  },
  beforeUnmount(el) {
    if (el._v_tooltip) {
      if (el._v_tooltip.destroyFloating) {
        el._v_tooltip.destroyFloating();
      }
      el._v_tooltip.wrapper.remove();
    }
  },
};
