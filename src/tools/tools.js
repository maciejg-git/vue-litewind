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

let isDate = (d) => Object.prototype.toString.call(d) == "[object Date]";
let isRegexp = (v) => Object.prototype.toString.call(v) === "[object RegExp]";
let isObject = (v) => typeof v === "object";
let isString = (v) => typeof v === "string";

let compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

let clamp = (v, f, t) => (v < f ? f : v >= t ? t : v);

let pad = (d) => (d < 10 ? "0" + d : d);

let undefNullToStr = (v) => (v == undefined || v == null ? "" : v);

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let schedule = async (fn, ms, ...args) => {
  await timeout(ms);
  return fn(...args);
};

export {
  formatCase,
  compare,
  clamp,
  isDate,
  isRegexp,
  pad,
  undefNullToStr,
  schedule,
  isObject,
  isString,
};
