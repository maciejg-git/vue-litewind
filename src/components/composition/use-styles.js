import { computed } from "vue";

// FIX:

let getStyles = (styles, componentStyles, el) => {
  return styles.value.reduce((acc, i) => {
    let s = componentStyles[el][i];
    return s ? [...acc, ...s] : [...acc, i];
  }, []);
};

export default function useStyles(s, props, elements, state) {
  let propsStyles = {};
  let styles = {};
  let states = {};

  let componentStyles = computed(() => {
    let styles = s[props.theme] || s.default;
    return styles[props.name];
  });

  for (let el of elements) {
    let p = "style" + el.charAt(0).toUpperCase() + el.slice(1);
    propsStyles[el] = computed(() => props[p].split(" "));
    styles[el] = computed(() =>
      getStyles(propsStyles[el], componentStyles.value, el)
    );

    if (state) {
      states[el] = {};
      for (let s of state) {
        if (componentStyles.value[el][s]) {
          states[el][s] = componentStyles.value[el][s];
        }
      }
    }
  }

  return {
    styles,
    states,
  };
}
