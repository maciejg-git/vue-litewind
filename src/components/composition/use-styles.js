import { computed } from "vue";

export default function useStyles(instance, props, elements) {
  let getStyles = (styles, globalStyles, el) => {
    return styles[el].value.reduce((acc, i) => {
      if (!globalStyles[el][i]) {
        return [...acc, i];
      } else if (Array.isArray(globalStyles[el][i])) {
        return [...acc, ...globalStyles[el][i]];
      } else return [...acc, ...globalStyles[el][i].split(" ")];
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

  for (let el of elements) {
    let elCapitalize = el.charAt(0).toUpperCase() + el.slice(1);
    propsStyles[el] = computed(() => props["style" + elCapitalize].split(" "));
    // ["default", "style2"]
    styles[el] = computed(() => getStyles(propsStyles, globalStyles.value, el));
    // ["class", "class2", "el class", "el class2"]
  }

  return {
    styles,
  };
}
