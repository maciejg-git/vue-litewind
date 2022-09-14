import { globalOptions } from "./plugin";
import { isFunction } from "./tools"

export let defaultProps = (component, prop, def) => {
  return (props) => {
    let componentProps = globalOptions.componentProps[component]

    if (componentProps && componentProps[prop]) {
      if (isFunction(componentProps[prop])) {
        let { base, name } = props

        return componentProps[prop](base, name)
      }
      return componentProps[prop]
    }
    // if (globalOptions.globalProps[prop] !== undefined) {
    //   return globalOptions.globalProps[prop];
    // }
    return def;
  };
};
