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

let clearHideTimers = (el) => {
  clearTimeout(el._v_tooltip.timerOut);
  clearTimeout(el._v_tooltip.timerRemove);
};

let clearShowTimer = (el) => {
  clearTimeout(el._v_tooltip.timer);
};

function show(ev) {
  let el = ev.target;
  let tooltip = el._v_tooltip;

  clearHideTimers(el);

  if (tooltip.isVisible) return;

  getTooltipFnContent(el);

  tooltip.timer = setTimeout(() => {
    document.body.appendChild(tooltip.wrapper);

    requestAnimationFrame(() => {
      addTransition(tooltip, false);
    });

    tooltip.destroyFloating = setAutoUpdateFloating(el);
    tooltip.isVisible = true;
  }, tooltip.delay);
}

function hide(ev) {
  let el = ev.target;
  let tooltip = el._v_tooltip;

  clearShowTimer(el);

  if (!tooltip.isVisible) return;

  tooltip.timerOut = setTimeout(() => {
    addTransition(tooltip, true);

    tooltip.timerRemove = setTimeout(
      () => {
        tooltip.wrapper.remove();
        tooltip.destroyFloating();
        tooltip.destroyFloating = null;
        tooltip.isVisible = false;
      },

      tooltip.transition === "" ? 0 : 200
    );
  }, tooltip.delay);
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

let updateFloating = (referenceEl, tooltipEl, options) => {
  return async () => {
    let { x, y } = await computePosition(referenceEl, tooltipEl, {
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

    if (!tooltipEl) return;

    Object.assign(tooltipEl.style, {
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

  m.tooltip.style.transition = "opacity 0.2s ease, transform 0.2s";

  if (m.transition == "fade" || m.transition == "scale-fade") {
    m.tooltip.style.opacity = v ? 0 : 1;
  }

  if (m.transition == "scale-fade") {
    m.tooltip.style.transform = v ? "scale(0.9)" : "scale(1)";
  }
}

let setTooltipContentText = (el, t) => {
  if (typeof t.text === "string") {
    t.tooltip.firstChild.innerText = t.text;
  } else if (t.text === undefined) {
    t.tooltip.firstChild.innerText = el.getAttribute("data-title") || "";
  }
};

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
  return {
    ...defaults,
  };
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

    setTooltipContentText(el, t);

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
