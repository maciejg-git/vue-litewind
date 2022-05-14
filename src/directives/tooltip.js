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
    el._v_tooltip.timerRemove = setTimeout(
      () => {
        el._v_tooltip.wrapper.remove();
      },
      el._v_tooltip.transition === "noanim" ? 0 : 200
    );
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
  if (m.transition === "noanim") return;
  m.tooltip.style.transition = "opacity 0.2s ease, transform 0.2s";
}

function parseModifiers(modifiers) {
  let m = {};

  modifiers.forEach((modifier) => {
    if (correctPlacement.includes(modifier)) {
      m.placement = modifier;
      return;
    }
    if (delayRegexp.test(modifier)) {
      m.delay = +modifier.substring(5);
      return;
    }
    if (offsetXRegexp.test(modifier)) {
      m.offsetX = +modifier.substring(2);
      return;
    }
    if (offsetYRegexp.test(modifier)) {
      m.offsetY = +modifier.substring(2);
      return;
    }
    if (transitions.includes(modifier)) {
      m.transition = modifier;
      return;
    }
  });

  return {
    ...defaults,
    ...m,
  };
}

export default {
  mounted(el, binding) {
    let m = parseModifiers(Object.keys(binding.modifiers));

    let t = {
      wrapper: createTooltipElement(),
      tooltip: null,
      timer: null,
      timerOut: null,
      timerRemove: null,
      f: null,
      ...m,
    };

    t.tooltip = t.wrapper.firstChild;
    t.f = typeof binding.value == "function" ? binding.value : null;

    el._v_popper = setPopper(el, t.wrapper, t);

    if (binding.value && typeof binding.value == "string") {
      t.tooltip.firstChild.innerText = binding.value;
    } else {
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
      el._v_tooltip.wrapper.remove();
    }
  },
};
