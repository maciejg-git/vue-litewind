import { computed } from "vue";

export default function useStyles(instance, props, elements) {
  let getStyles = (styles, globalStyles, el) => {
    return styles[el].value.reduce((acc, i) => {
      return globalStyles[el][i]
        ? [...acc, ...globalStyles[el][i]]
        : [...acc, i];
    }, []);
  };

  let globalStyles = computed(() => {
    let styles =
      instance.appContext.config.globalProperties.styles[props.theme] ||
      instance.appContext.config.globalProperties.styles.default;
    return styles[props.name];
  });

  let propsStyles = {};
  let styles = {};

  for (let el of elements) {
    let elCapitalize = el.charAt(0).toUpperCase() + el.slice(1);
    propsStyles[el] = computed(() => props["style" + elCapitalize].split(" "));
    styles[el] = computed(() => getStyles(propsStyles, globalStyles.value, el));
  }

  return {
    styles,
  };
}
