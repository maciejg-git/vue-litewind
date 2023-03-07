let noop = () => {};

// format case

let formatCase = function (str) {
  return str
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "")
    .replace(/([a-z])([A-Z])/g, (m, a, b) => `${a}_${b.toLowerCase()}`)
    .replace(/[^A-Za-z0-9]+|_+/g, " ")
    .toLowerCase()
    .replace(
      /( ?)(\w+)( ?)/g,
      (m, a, b, c) => a + b.charAt(0).toUpperCase() + b.slice(1) + c
    );
};

// types

let isDate = (d) => Object.prototype.toString.call(d) == "[object Date]";

let isRegexp = (v) => Object.prototype.toString.call(v) === "[object RegExp]";

let isObject = (v) => typeof v === "object" && v !== null;

let isString = (v) => typeof v === "string";

let isBoolean = (v) => typeof v === "boolean";

let isNumber = (v) => typeof v === "number" && !isNaN(v);

let isFunction = (v) => typeof v === "function";

let undefNullToStr = (v) => (v === undefined || v === null ? "" : v);

// compare

let compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

// math

let clamp = (v, f, t) => (v < f ? f : v >= t ? t : v);

let pad = (d) => (d < 10 ? "0" + d : d);

let getNumberRange = (from, count) => {
  return Array.from({ length: count }, (_, i) => i + from);
}

// timeout

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let schedule = async (fn, ms, ...args) => {
  await timeout(ms);
  return fn(...args);
};

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

// highlight

let highlight = (string, match, classes) => {
  classes = classes || 'match'

  return string.replace(
    new RegExp(`(${match.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&")})`, "i"),
    `<span class='${classes}'>$1</span>`
  );
};

export {
  noop,
  formatCase,
  compare,
  clamp,
  isDate,
  isRegexp,
  isNumber,
  isObject,
  isString,
  isBoolean,
  isFunction,
  pad,
  getNumberRange,
  undefNullToStr,
  schedule,
  debounce,
  highlight,
};
