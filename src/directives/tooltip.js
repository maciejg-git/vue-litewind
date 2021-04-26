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

let template = '<div class="font-semibold p-1.5 px-3"></div>';

let timer = null;
let timerFade = null;
let timerOut = null;

function show(ev) {
  if (ev.target._v_tooltip.active) clearTimeout(timerOut);
  if (ev.target._v_tooltip.f)
    ev.target._v_tooltip.el.childNodes[0].innerHTML = ev.target._v_tooltip.f();
  timer = setTimeout(() => {
    document.body.appendChild(ev.target._v_tooltip.el);
    ev.target._v_tooltip.active = true;
    timerFade = setTimeout(() => {
      ev.target._v_tooltip.el.style.opacity = 1;
    }, 10);
    ev.target._v_popper.update();
  }, ev.target._v_tooltip.delay);
}

function hide(ev) {
  clearTimeout(timer);
  clearTimeout(timerFade);

  let el = ev.target;
  if (el._v_tooltip.active) {
    let removeElement = () => {
      el._v_tooltip.el.removeEventListener("transitionend", removeElement);
      el._v_tooltip.el.remove();
      el._v_tooltip.active = false;
    };
    timerOut = setTimeout(() => {
      ev.target._v_tooltip.el.style.opacity = 0;
      ev.target._v_tooltip.el.addEventListener("transitionend", removeElement);
    }, el._v_tooltip.delay);
  }
}

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
  el.classList = "bg-gray-700 text-gray-100 rounded-md";
  return el;
}

function parseModifiers(modifiers) {
  let delayRegexp = /^delay\d\d?\d?\d?$/;
  let offsetXRegexp = /^oX\d\d?\d?$/;
  let offsetYRegexp = /^oY\d\d?\d?$/;

  if (modifiers.length) {
    let m = {};

    m.placement = modifiers.find((i) => correctPlacement.includes(i));
    m.placement = m.placement ? m.placement : defaults.placement;
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

export default {
  mounted(el, binding) {
    let m = parseModifiers(Object.keys(binding.modifiers));
    el._v_tooltip = {
      el: createTooltipElement(),
      ...m,
    };
    if (!m.transition) el._v_tooltip.el.style.opacity = "0";
    if (!m.transition) el._v_tooltip.el.style.transition = "opacity 0.3s ease";

    if (binding.value && typeof binding.value == "string")
      el._v_tooltip.el.childNodes[0].innerHTML = binding.value;
    else
      el._v_tooltip.el.childNodes[0].innerHTML =
        el.getAttribute("data-title") || "";

    el._v_tooltip.f = typeof binding.value == "function" ? binding.value : null;

    el._v_popper = setPopper(el, el._v_tooltip.el, el._v_tooltip);

    el.addEventListener("mouseenter", show);
    el.addEventListener("mouseleave", hide);
  },
  beforeUnmount(el) {
    if (el._v_tooltip) {
      el._v_tooltip.active = false;
      el._v_tooltip.el.remove();
    }
  },
};
