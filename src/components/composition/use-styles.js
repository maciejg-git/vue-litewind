import { computed } from "vue";

export default function useStyles(instance, props, elements, state) {
  let getStyles = (styles, globalStyles, el) => {
    // el   element
    // globalStyles   global config
    // styles    array of styles ["default", "style 2"]  
    return styles[el].value.reduce((acc, i) => {
      let s = globalStyles[el][i];
      if (!s) return [...acc, i];
      else return [...acc, ...s];
    }, []);
  };

  let getStates = (states, globalStyles, el) => {
    // el   element
    // globalStyles   global config
    // styles    array of styles ["default", "style 2"]  
    return styles[el].value.reduce((acc, i) => {
      let s = globalStyles[el][i];
      if (!s) return [...acc, i];
      else return [...acc, ...s];
    }, []);
  };

  let globalStyles = computed(() => {
    let styles =
      instance.appContext.config.globalProperties.styles[props.theme] ||
      instance.appContext.config.globalProperties.styles.default;
    return styles[props.name];
    // object style for component
  });

  let propsStyles = {};
  let styles = {};
  let states = {};

  for (let el of elements) {
    let elCapitalize = el.charAt(0).toUpperCase() + el.slice(1);
    propsStyles[el] = computed(() => props["style" + elCapitalize].split(" "));
    // ["default", "style2"]
    styles[el] = computed(() => getStyles(propsStyles, globalStyles.value, el));
    // ["class", "class2", "el class", "el class2"]

    // states [valid, invalid, disabled] undefined
    // if states
    // for states
    // if globalStyles[el][state]
    // states[el] = computed(() => getStates(propsStyles, globalStyles.value, el));

    if (state) {
      for (let s of state) {
        if (globalStyles.value[el][s]) {
          console.log(globalStyles.value[el][s])
        }
      }
    }
  }

  return {
    styles,
  };
}

// if (!s) return [...acc, i];
// else if (Array.isArray(s)) return [...acc, ...s];
// else return [...acc, ...s.split(" ")];
