import { computed } from "vue";

let getStyles = (styles, globalStyles, el) => {
  return styles[el].value.reduce((acc, i) => {
    if (globalStyles[el][i]) acc = [...acc, ...globalStyles[el][i]];
    return acc;
  }, []);
};

export default function useStyles(instance, props, elements) {
  let globalStyles =
    instance.appContext.config.globalProperties.styles[props.name];

  let propsStyles = {};
  let styles = {};

  for (let el of elements) {
    propsStyles[el] = computed(() => props[el].split(" "));
    styles[el] = computed(() => getStyles(propsStyles, globalStyles, el));
  }

  return {
    styles,
  };
}
