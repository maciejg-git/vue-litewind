import { computed } from "vue";

let getComponentClasses = (props, p, el, element, name) => {
  return computed(() => {
    let c = [];
    // get variant classes from component props
    let baseEl = [props.base, element].filter(Boolean).join("__")
    if (props[p]) {
      c = props[p].split(" ").map((variant) => {
        let [v, c] = variant.split(":");
        if (c && v !== props.variant + "") return;
        return [baseEl, c || v].filter(Boolean).join("--");
      });
    }
    // get base element classes
    // c.push([props.base, element].filter(Boolean).join("__"));
    c.push(baseEl)
    let fixedClasses = el && el.fixed
    let propClasses = el && el.prop && el.prop.value
    // return [props.base, fixedClasses, ...c, propClasses].filter(Boolean);
    return [fixedClasses, ...c, propClasses].filter(Boolean);
  });
};

let getComponentStates = (props, el, element, name) => {
  let state = el && el.states;
  if (!state || !state.length) return;
  return computed(() => {
    let baseEl = [props.base, element].filter(Boolean).join("__")
    return state.reduce((acc, i) => {
      acc[i] = [baseEl, i + "-state"].filter(Boolean).join("--");
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
