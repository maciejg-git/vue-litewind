import { createPopper } from "@popperjs/core";
import { correctPlacement } from "../const.js";

let defaults = {
  placement: "bottom-start",
  delay: 50,
  offsetX: 0,
  offsetY: 0,
  transition: "fade",
};

let transitions = ["fade", "scale-fade", "scale", "noanim"];

let delayRegexp = /^delay\d\d?\d?\d?$/;
let offsetXRegexp = /^oX\d\d?\d?$/;
let offsetYRegexp = /^oY\d\d?\d?$/;

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

  getTooltipFnContent(el);

  el._v_tooltip.timer = setTimeout(() => {
    document.body.appendChild(el._v_tooltip.wrapper);
    requestAnimationFrame(() => {
      addTransition(el._v_tooltip, false);
    });
    el._v_popper.update();
  }, el._v_tooltip.delay);
}

function hide(ev) {
  let el = ev.target;

  removeShowTimer(el);

  el._v_tooltip.timerOut = setTimeout(() => {
    addTransition(el._v_tooltip, true);
    el._v_tooltip.timerRemove = setTimeout(() => {
      el._v_tooltip.wrapper.remove();
    }, 300);
  }, el._v_tooltip.delay);
}

let getTooltipFnContent = (el) => {
  if (el._v_tooltip.f) {
    el._v_tooltip.tooltip.firstChild.innerText = el._v_tooltip.f();
  }
};

function setPopper(el, tooltip, options) {
  return createPopper(el, tooltip, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [options.offsetX, options.offsetY],
        },
      },
      {
        name: "flip",
      },
    ],
    placement: options.placement,
  });
}

function createTooltipElement() {
  let el = document.createElement("div");
  el.innerHTML =
    "<div class='tooltip'><div class='tooltip--content'></div></div>";
  return el;
}

function addTransition(m, v) {
  if (m.transition == "noanim") return;
  if (m.transition == "fade" || m.transition == "scale-fade") {
    m.tooltip.style.opacity = v ? 0 : 1;
  }
  if (m.transition == "scale-fade") {
    m.tooltip.style.transform = v ? "scale(0.9)" : "scale(1)";
  }
}

function addFixedTransition(m) {
  m.tooltip.style.transition = "opacity 0.3s ease, transform 0.3s";
}

function parseModifiers(modifiers) {
  let m = {};

  m.placement = modifiers.find((i) => correctPlacement.includes(i));
  m.placement = m.placement || defaults.placement;

  m.delay = modifiers.find((i) => delayRegexp.test(i));
  m.delay = m.delay ? +m.delay.substring(5) : defaults.delay;

  m.offsetX = modifiers.find((i) => offsetXRegexp.test(i));
  m.offsetX = m.offsetX ? +m.offsetX.substring(2) : defaults.offsetX;

  m.offsetY = modifiers.find((i) => offsetYRegexp.test(i));
  m.offsetY = m.offsetY ? +m.offsetY.substring(2) : defaults.offsetY;

  m.transition = modifiers.find((i) => transitions.includes(i));
  m.transition = m.transition || defaults.transition;

  return m;
}

export default {
  mounted(el, binding) {
    let m = parseModifiers(Object.keys(binding.modifiers));

    el._v_tooltip = {
      wrapper: createTooltipElement(),
      timer: null,
      timerOut: null,
      timerRemove: null,
      ...m,
    };

    el._v_tooltip.tooltip = el._v_tooltip.wrapper.firstChild;

    addFixedTransition(el._v_tooltip, true);
    addTransition(el._v_tooltip, true);

    if (binding.value && typeof binding.value == "string") {
      el._v_tooltip.tooltip.firstChild.innerText = binding.value;
    } else {
      el._v_tooltip.tooltip.firstChild.innerText =
        el.getAttribute("data-title") || "";
    }

    el._v_tooltip.f = typeof binding.value == "function" ? binding.value : null;

    el._v_popper = setPopper(el, el._v_tooltip.wrapper, el._v_tooltip);

    el.addEventListener("mouseenter", show);
    el.addEventListener("mouseleave", hide);
  },
  beforeUnmount(el) {
    if (el._v_tooltip) {
      el._v_tooltip.el.remove();
    }
  },
};
