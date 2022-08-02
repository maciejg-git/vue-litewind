import { computed } from "vue";

// let getComponentClasses = (props, p, el, element) => {
//   return computed(() => {
//     let c = [];
//     // get variant classes from component props
//     if (props[p]) {
//       c = props[p].split(" ").map((variant) => {
//         let [v, c] = variant.split(":");
//         if (c && v !== props.variant + "") return;
//         return [props.base, element, c || v].filter(Boolean).join("--");
//       });
//     }
//     // get base element classes
//     c.push([props.base, element].filter(Boolean).join("--"));
//     return [el && el.fixed, ...c, el && el.prop && el.prop.value].filter(
//       Boolean
//     );
//   });
// };
//
// let getComponentStates = (props, el, element) => {
//   let state = el && el.states;
//   if (!state || !state.length) return;
//   return computed(() => {
//     return state.reduce((acc, i) => {
//       acc[i] = [props.base, element, i + "-state"].filter(Boolean).join("--");
//       return acc;
//     }, {});
//   });
// };
//
// export default function useStyles(name, props, elements) {
//   let classes = {};
//   let states = {};
//   let variants = {};
//
//   // generate styles for every element
//   for (let el of Object.keys(elements)) {
//     // get prop name
//     let p = "style" + el.charAt(0).toUpperCase() + el.slice(1);
//     // element can have custom name property
//     let element = elements[el] && elements[el].name ? elements[el].name : el;
//     element = element != name ? element : null;
//
//     // generate classes for element
//     classes[el] = getComponentClasses(props, p, elements[el], element);
//
//     // generate classes for states
//     states[el] = getComponentStates(props, elements[el], element);
//
//     let variant = elements[el] && elements[el].variants;
//     if (variant && variant.length) {
//       variants[el] = {};
//       variants[el] = computed(() => {
//         let c = {};
//         for (let v of variant) {
//           c[v] = [props.base, element, v].filter(Boolean).join("--");
//         }
//         return c;
//       });
//     }
//   }
//
//   return {
//     classes,
//     states,
//     variants,
//   };
// }

let getComponentClasses = (props, p, el, element, name) => {
  return computed(() => {
    let c = [];
    // get variant classes from component props
    if (props[p]) {
      c = props[p].split(" ").map((variant) => {
        let [v, c] = variant.split(":");
        if (c && v !== props.variant + "") return;
        return [name, element, c || v].filter(Boolean).join("--");
      });
    }
    // get base element classes
    c.push([name, element].filter(Boolean).join("--"));
    let fixedClasses = el && el.fixed
    let propClasses = el && el.prop && el.prop.value
    return [props.base, fixedClasses, ...c, propClasses].filter(Boolean);
  });
};

let getComponentStates = (props, el, element, name) => {
  let state = el && el.states;
  if (!state || !state.length) return;
  return computed(() => {
    return state.reduce((acc, i) => {
      acc[i] = [name, element, i + "-state"].filter(Boolean).join("--");
      return acc;
    }, {});
  });
};

export default function useStyles(name, props, elements) {
  let classes = {};
  let states = {};
  let variants = {};

  // generate styles for every element
  for (let el of Object.keys(elements)) {
    // get prop name
    let p = "style" + el.charAt(0).toUpperCase() + el.slice(1);
    // element can have custom name property
    let element = elements[el] && elements[el].name ? elements[el].name : el;
    element = element != name ? element : null;

    // generate classes for element
    classes[el] = getComponentClasses(props, p, elements[el], element, name);

    // generate classes for states
    states[el] = getComponentStates(props, elements[el], element, name);

    let variant = elements[el] && elements[el].variants;
    if (variant && variant.length) {
      variants[el] = {};
      variants[el] = computed(() => {
        let c = {};
        for (let v of variant) {
          c[v] = [name, element, v].filter(Boolean).join("--");
        }
        return c;
      });
    }
  }

  return {
    classes,
    states,
    variants,
  };
}
