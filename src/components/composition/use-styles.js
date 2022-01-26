import { computed } from "vue";

export default function useStyles(name, props, elements) {
  let classes = {};
  let states = {};
  let variants = {};

  // generate styles for every element
  for (let el of Object.keys(elements)) {
    // get prop name
    let p = "style" + el.charAt(0).toUpperCase() + el.slice(1);
    // element can have custom name property
    let e = elements[el] && elements[el].name ? elements[el].name : el;
    e = e != name ? e : null;

    // generate classes for element
    classes[el] = computed(() => {
      let c = [];
      // generate variant classes from component props
      if (props[p]) {
        c = props[p].split(" ").map((variant) => {
          return [props.name, e, variant].filter(Boolean).join("--");
        });
      }
      // add base element classes
      c.push([props.name, e].filter(Boolean).join("--"));
      let fixed = elements[el] && elements[el].fixed;
      let prop = elements[el] && elements[el].prop && elements[el].prop.value;
      return [fixed, ...c, prop];
    });

    // generate classes for states
    let state = elements[el] && elements[el].states;
    if (state && state.length) {
      states[el] = {};
      for (let s of state) {
        states[el][s] = computed(() => {
          return [props.name, e, s + "-state"].filter(Boolean).join("--");
        });
      }
    }
  }

  return {
    classes,
    states,
    variants,
  };
}
