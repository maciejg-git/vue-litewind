import { createPopper } from "@popperjs/core";
import { correctPlacement } from "../const.js";

let defaults = {
  placement: "bottom-start",
  delay: 50,
  offsetX: 0,
  offsetY: 0,
};

let delayRegexp = /^delay\d\d?\d?\d?$/;
let offsetXRegexp = /^oX\d\d?\d?$/;
let offsetYRegexp = /^oY\d\d?\d?$/;

let transitionEnd = (ev) => {
  // console.log(ev)
  // console.log('transend')
  if (ev.animationName == "fadeOut") {
    // console.log('fade out')
    ev.target.remove()
    ev.target._v_tooltip.isMounted = false;
    ev.target._v_tooltip.isVisible = false;
    ev.target._v_tooltip.animating = false;
  }
  if (ev.animationName == "fadeIn") {
    // console.log('fade in')
    ev.target._v_tooltip.isVisible = true;
    ev.target._v_tooltip.animating = false;
  }
    console.log(ev.target._v_tooltip.animating)
}
let transitionStart = (ev) => {
  // console.log('transtart')
    ev.target._v_tooltip.animating = true;
}
 
let removeHideTimers = (el) => {
  clearTimeout(el._v_tooltip.timerOut);
  // clearTimeout(el._v_tooltip.timerRemove);
};

let removeShowTimer = (el) => {
  clearTimeout(el._v_tooltip.timer);
}

function show(ev) {
  let el = ev.target;

  removeHideTimers(el);

  // el._v_tooltip.el._v_tooltip.state = "in"
  if (el._v_tooltip.el._v_tooltip.isVisible && !el._v_tooltip.el._v_tooltip.animating) return
  // if (el._v_tooltip.el._v_tooltip.isMounted) return

  getTooltipFnContent(el);

  // console.log(el._v_tooltip.el.style.animation)
  el._v_tooltip.timer = setTimeout(() => {
    el._v_tooltip.el.style.animation="fadeIn 0.3s"
    document.body.appendChild(el._v_tooltip.el);
    // requestAnimationFrame(() => {
    //   el._v_tooltip.el.style.opacity = 1;
    // });
    el._v_popper.update();
  }, el._v_tooltip.delay);
}

function hide(ev) {
  let el = ev.target;

  removeShowTimer(el);

  // el._v_tooltip.el._v_tooltip.state = "out"
  // if (el._v_tooltip.el._v_tooltip.animating) return

  el._v_tooltip.timerOut = setTimeout(() => {
    el._v_tooltip.el.style.animation="fadeOut 0.3s"
    // el._v_tooltip.el.style.opacity = 0;
    // el._v_tooltip.timerRemove = setTimeout(() => {
    //   el._v_tooltip.el.remove();
    // }, 300)
  }, el._v_tooltip.delay);
}

let getTooltipFnContent = (el) => {
  if (el._v_tooltip.f) {
    el._v_tooltip.el.childNodes[0].innerText = el._v_tooltip.f();
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
  el.innerHTML = "<div class='tooltip--content'></div>";
  el.classList = "tooltip";
  return el;
}

function addTransition(el, m) {
  if (!m.transition) {
    // el.style.opacity = "0";
    // el.style.margin = "2em";
    // el.style.transition = "opacity 0.3s ease, margin 0.3s";
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
      timerRemove: null,
      state: null,
      ...m,
    };

    el._v_tooltip.el._v_tooltip = {
      state: null,
      isVisible: false,
      animating: false,
      isMounted: false,
    }

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
    el._v_tooltip.el.addEventListener("animationend", transitionEnd);
    el._v_tooltip.el.addEventListener("animationstart", transitionStart);
  },
  beforeUnmount(el) {
    if (el._v_tooltip) {
      el._v_tooltip.el.remove();
    }
  },
};
