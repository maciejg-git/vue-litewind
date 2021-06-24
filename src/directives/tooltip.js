import { createPopper } from "@popperjs/core";

const correctPlacement = [
  "auto",
  "auto-start",
  "auto-end",
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "right",
  "right-start",
  "right-end",
  "left",
  "left-start",
  "left-end",
];

let defaults = {
  placement: "bottom-start",
  delay: 50,
  offsetX: 0,
  offsetY: 0,
};

let classes = {
  tooltip: "bg-gray-700 text-gray-100 rounded-md",
  content: "font-semibold p-1.5 px-3",
};

let template = `<div class="${classes.content}"></div>`;

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
  el.classList = classes.tooltip;
  return el;
}

function addTransition(el, m) {
  if (!m.transition) {
    el.style.opacity = "0";
    el.style.transition = "opacity 0.3s ease";
  }
}

function parseModifiers(modifiers) {
  let delayRegexp = /^delay\d\d?\d?\d?$/;
  let offsetXRegexp = /^oX\d\d?\d?$/;
  let offsetYRegexp = /^oY\d\d?\d?$/;

  if (modifiers.length) {
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
}

let getTooltipContent = (el) => {
  if (el._v_tooltip.f)
    el._v_tooltip.el.childNodes[0].innerHTML = el._v_tooltip.f();
};

let onTransitionEnd = (ev) => {
  ev.target.removeEventListener("transitionend", onTransitionEnd);
  ev.target.remove();
};

export default {
  mounted(el, binding) {
    let m = parseModifiers(Object.keys(binding.modifiers));

    el._v_tooltip = {
      el: createTooltipElement(),
      ...m,
    };

    addTransition(el._v_tooltip.el, m);

    if (binding.value && typeof binding.value == "string") {
      el._v_tooltip.el.childNodes[0].innerHTML = binding.value;
    } else {
      el._v_tooltip.el.childNodes[0].innerHTML =
        el.getAttribute("data-title") || "";
    }

    el._v_tooltip.f = typeof binding.value == "function" ? binding.value : null;

    el._v_popper = setPopper(el, el._v_tooltip.el, el._v_tooltip);

    el.addEventListener("mouseenter", show);
    el.addEventListener("mouseleave", hide);

    let timer = null;
    let timerOut = null;

    let removeHideTimers = (el) => {
      clearTimeout(timerOut);
      el._v_tooltip.el.removeEventListener("transitionend", onTransitionEnd);
    };

    let removeShowTimer = () => clearTimeout(timer);

    function show(ev) {
      let el = ev.target;

      removeHideTimers(el);

      getTooltipContent(el);

      timer = setTimeout(() => {
        document.body.appendChild(el._v_tooltip.el);
        requestAnimationFrame(() => {
          el._v_tooltip.el.style.opacity = 1;
        });
        el._v_popper.update();
      }, el._v_tooltip.delay);
    }

    function hide(ev) {
      let el = ev.target;

      removeShowTimer();

      timerOut = setTimeout(() => {
        el._v_tooltip.el.style.opacity = 0;
        el._v_tooltip.el.addEventListener("transitionend", onTransitionEnd);
      }, el._v_tooltip.delay);
    }
  },
  beforeUnmount(el) {
    if (el._v_tooltip) {
      el._v_tooltip.el.remove();
    }
  },
};
