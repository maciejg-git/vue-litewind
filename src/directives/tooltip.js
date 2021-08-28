import { createPopper } from "@popperjs/core";
import { correctPlacement } from "../const.js";

let defaults = {
  placement: "bottom-start",
  delay: 50,
  offsetX: 0,
  offsetY: 0,
};

let template = "<div class='tooltip-content-default'></div>";

let delayRegexp = /^delay\d\d?\d?\d?$/;
let offsetXRegexp = /^oX\d\d?\d?$/;
let offsetYRegexp = /^oY\d\d?\d?$/;

let onTransitionEnd = (ev) => {
  ev.target.removeEventListener("transitionend", onTransitionEnd);
  ev.target.remove();
};

let removeHideTimers = (el) => {
  clearTimeout(el._v_tooltip.timerOut);
  el._v_tooltip.el.removeEventListener("transitionend", onTransitionEnd);
};

let removeShowTimer = (el) => clearTimeout(el._v_tooltip.timer);

function show(ev) {
  let el = ev.target;

  removeHideTimers(el);

  getTooltipContent(el);

  el._v_tooltip.timer = setTimeout(() => {
    document.body.appendChild(el._v_tooltip.el);
    requestAnimationFrame(() => {
      el._v_tooltip.el.style.opacity = 1;
    });
    el._v_popper.update();
  }, el._v_tooltip.delay);
}

function hide(ev) {
  let el = ev.target;

  removeShowTimer(el);

  el._v_tooltip.timerOut = setTimeout(() => {
    el._v_tooltip.el.style.opacity = 0;
    el._v_tooltip.el.addEventListener("transitionend", onTransitionEnd);
  }, el._v_tooltip.delay);
}

let getTooltipContent = (el) => {
  if (el._v_tooltip.f)
    el._v_tooltip.el.childNodes[0].innerText = el._v_tooltip.f();
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
  el.innerHTML = template;
  el.classList = "tooltip-default";
  return el;
}

function addTransition(el, m) {
  if (!m.transition) {
    el.style.opacity = "0";
    el.style.transition = "opacity 0.3s ease";
  }
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

  m.transition = modifiers.findIndex((i) => i === "nofade") != -1;

  return m;
}

export default {
  mounted(el, binding) {
    let m = parseModifiers(Object.keys(binding.modifiers));

    el._v_tooltip = {
      el: createTooltipElement(),
      timer: null,
      timerOut: null,
      ...m,
    };

    addTransition(el._v_tooltip.el, m);

    if (binding.value && typeof binding.value == "string") {
      el._v_tooltip.el.childNodes[0].innerText = binding.value;
    } else {
      el._v_tooltip.el.childNodes[0].innerText =
        el.getAttribute("data-title") || "";
    }

    el._v_tooltip.f = typeof binding.value == "function" ? binding.value : null;

    el._v_popper = setPopper(el, el._v_tooltip.el, el._v_tooltip);

    el.addEventListener("mouseenter", show);
    el.addEventListener("mouseleave", hide);
  },
  beforeUnmount(el) {
    if (el._v_tooltip) {
      el._v_tooltip.el.remove();
    }
  },
};
