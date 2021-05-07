import { tailwindcss } from "./tailwindProperties.js";

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

let compare = (a, b) => {
  if (a == null || b == null || a == undefined || b == undefined) return -1;
  return a < b ? -1 : a > b ? 1 : 0;
};

let clamp = (v, f, t) => (v < f ? f : v >= t ? t : v);

let isDate = (d) => Object.prototype.toString.call(d) == "[object Date]";

let pad = (d) => (d < 10 ? "0" + d : d);

let undefNullToStr = (v) => (v == undefined || v == null ? "" : v);

let removeTailwindClasses = (classList, debug) => {
  let str = "";

  let classParse = classList
    .map((i) => {
      let c = i.split(":");
      c = c[1] ? c[0].concat(c[1].split("-")) : c[0].split("-");

      let p = tailwindcss;
      let name = "";

      if (p.states[c[0]]) {
        name = c[0] + ":";
        c.shift();
      }

      if (c[0] === "") {
        c[1] = "-" + c[1];
        c.shift();
      }

      if (p[c[0]]) {
        p = p[c[0]];
        if (c.length == 1) {
          if (p._single) return name + p._single;
          else return "user-class";
        }
        if (p._name !== null) name += p._name || c[0];
      } else return "user-class";

      for (p of p.props) {
        str = name;
        for (let i = 1; i < c.length; i++) {
          if (p[c[i]]) {
            if (p._name !== null) str += p._name || c[i];
            p = p[c[i]];
          } else {
            str = "user-class";
            break;
          }
        }
        if (str == "user-class") continue;
        if (p != true) {
          if (p._optional === true) {
            return p._name ? str + p._name : str;
          }
          return "user-class";
        }
        return str;
      }
      return str;
    })
    .reduce((acc, i, index) => {
      if (i == "user-class") {
        acc["user-class" + index] = index;
      } else acc[i] = index;
      return acc;
    }, {});

  // if (debug) {
  //   for (let i = 0; i < classParse.length; i++)
  //     console.log(classList[i], "\t", classParse[i]);
  // }

  return Object.values(classParse).map((i) => classList[i]);
};

let test = [
  "block p-2 px-4 bg-white border-l border-r border-transparent",
  // "border border-b-0 rounded-t-md border-gray-200 rounded rounded-sm flex flex-row flex-row-reverse font pf pasd pf-pgg bg-blue-500-user border-4 rounded-t rounded-t-sm border-t-2 border-t-8 overflow-auto overflow-hidden overflow-p overflow-x-auto overflow-x-hidden overflow-x-p overflow-y-auto overflow-y-hidden flex-row flex-row-reverse flex-col flex-wrap flex-wrap-reverse flex-nowrap inline-block inline-flex inline-flex-p inline-p inline table table-column-group table-caption table-cell table-column table-footer table-footer-group table-footer-p table-footer-group-p bg-blue inline inline-block inline-p-block inline-block-p flex-wrap flex-wrap-reverse flex-nowrap flex-1 flex-auto flex-initial flex-1-p border-opacity border-opacity-50",
  // props.classTab,
  // props.classActive,
  // "opacity opacity-50",
  // "shadow shadow-md shadow-md-p",
  // "float float-left",
  // "flex-grow flex-grow-0",
  // "order-1 order-none",
  // "justify-start justify-end justify-items-auto justify-items justify-self-auto",
  // "content-start items-start",
  // "p p-5 p-6 px-5 py-6 -p-5 pt-5 pb-2",
  // "",
  // "m m-5 m-6 mx-5 my-6 -m-5 -mt-5 group-hover:bg-blue-800 mt-5 mb-2 hover:bg-blue-500 group-hover:bg-blue-500",
  // "top top-4 top-1/2 -inset-y-4 bottom-3/4 bottom-2 inset-x-2 inset-x inset-y-1/2 inset-x-5 inset-y-1/4 -inset-y-3/4 -inset-x-1/2 inset-4 inset-1/2 -inset-4 -inset-1/2",
  // "hover:border border",
  // "ring-opacity-50 ring-blue-500 ring-2 ring ring-offset-2 ring-offset ring-offset-blue-500",
  // "uppercase cursor-auto cursor-pointer cursor-not-allowed",
  // "text-left text-center text-opacity-50 line-through overflow-ellipsis bg-opacity bg-opacity-50",
  "grid grid-cols grid-cols-5 grid-cols-20",
  "place-content-start place-self-auto place-items-start italic not-italic",
  "tracking tracking-normal",
  "bg-clip bg-clip-text",
  "bg-center bg-left bg-left-bottom bg-left-bottom-2 bg-right-top",
  "table-auto table-fixed",
  "pointer-events pointer-events-auto",
  "resize resize-x",
  "space-x-2 space-x space-x-4",
  "space-y-2 space-y space-y-4",
  "-space-x-2 -space-x -space-x-4",
  "align align-top align-text align-text-top",
];
let classList = test.flatMap((i) => i.split(" "));
classList = removeTailwindClasses(classList, true);

// console.log(classList);

export {
  formatCase,
  compare,
  clamp,
  isDate,
  pad,
  undefNullToStr,
  removeTailwindClasses,
};
