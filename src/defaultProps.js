import { globalOptions } from "./plugin";

export let defaultProps = (component, prop, def) => {
  return () => {
    if (
      globalOptions.componentProps[component] &&
      globalOptions.componentProps[component][prop] !== undefined
    ) {
      return globalOptions.componentProps[component][prop];
    }
    if (globalOptions.globalProps[prop] !== undefined) {
      return globalOptions.globalProps[prop];
    }
    return def;
  };
};
