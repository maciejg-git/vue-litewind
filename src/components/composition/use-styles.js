import { computed } from "vue";

let getStyles = (styles, elementStyles, el) => {
  return styles.value.reduce((acc, i) => {
    let s = elementStyles[el][i];
    return s ? [...acc, ...s] : [...acc, i];
  }, []);
};

export default function useStyles(instance, props, elements, state) {
  let propsStyles = {};
  let styles = {};
  let states = {};

  let elementStyles = computed(() => {
    let styles =
      instance.appContext.config.globalProperties.styles[props.theme] ||
      instance.appContext.config.globalProperties.styles.default;
    return styles[props.name];
  });

  for (let el of elements) {
    let p = "style" + el.charAt(0).toUpperCase() + el.slice(1);
    propsStyles[el] = computed(() => props[p].split(" "));
    styles[el] = computed(() => getStyles(propsStyles[el], elementStyles.value, el));

    if (state) {
      states[el] = {};
      for (let s of state) {
        if (elementStyles.value[el][s]) {
          states[el][s] = elementStyles.value[el][s];
        }
      }
    }
  }

  return {
    styles,
    states,
  };
}

// if (!s) return [...acc, i];
// else if (Array.isArray(s)) return [...acc, ...s];
// else return [...acc, ...s.split(" ")];
