import { globalOptions } from "./plugin";
import { isFunction } from "./tools"

export let defaultProps = (component, prop, def) => {
  return (props) => {
    let name = props.name || component

    let componentProps = globalOptions.componentProps && globalOptions.componentProps[name]

    if (componentProps && componentProps[prop]) {
      if (isFunction(componentProps[prop])) {
        let { base } = props

        return componentProps[prop](base)
      }
      return componentProps[prop]
    }
    return def;
  };
};
