import { computed } from "vue";

let getComponentClasses = (props, p, el, element) => {
  return computed(() => {

    let c = [];

    // get variant classes from component props
    let baseEl = [props.base, element].filter(Boolean).join("__");

    if (props[p]) {
      c = props[p].split(" ").map((variant) => {
        let [v, c] = variant.split(":");
        if (c && v !== props.variant + "") return;
        return [baseEl, c || v].filter(Boolean).join("--");
      });
    }

    // get base element classes
    c.push(baseEl);
    let fixedClasses = el && el.fixed;
    let propClasses = el && el.prop && el.prop.value;
    return [fixedClasses, ...c, propClasses].filter(Boolean).join(" ");
  });
};

let getComponentStates = (props, el, element) => {
  let state = el && el.states;

  if (!state || !state.length) {
    return;
  }

  return computed(() => {
    let baseEl = [props.base, element].filter(Boolean).join("__");
    return state.reduce((acc, i) => {
      acc[i] = [baseEl, i + "-state"].filter(Boolean).join("--");
      return acc;
    }, {});
  });
};

let getComponentVariants = (props, el, element) => {
  let variant = el && el.variants;

  if (!variant || !variant.length) {
    return;
  }

  return computed(() => {
    let c = {};

    for (let v of variant) {
      let baseEl = [props.base, element].filter(Boolean).join("__");
      c[v] = [baseEl, v].filter(Boolean).join("--");
    }
    return c;
  });
};

export default function useStyles(name, props, elements) {
  let classes = {};
  let states = {};
  let variants = {};

  // generate styles for every element
  for (let [el, options] of Object.entries(elements)) {
    // get prop name
    let p = "style" + el.charAt(0).toUpperCase() + el.slice(1);
    // element can have custom name property
    let element = options && options.name ? options.name : el;
    element = element != name ? element : null;

    classes[el] = getComponentClasses(props, p, options, element);

    states[el] = getComponentStates(props, options, element);

    variants[el] = getComponentVariants(props, options, element);
  }

  return {
    classes,
    states,
    variants,
  };
}
