import { globalOptions } from "./plugin";

export let defaultProps = (component, prop, def) => {
  return (props) => {
    let componentProps = globalOptions.componentProps[component]

      if (
        componentProps &&
        componentProps[prop] !== undefined
      ) {
        return componentProps[prop];
      }
      if (componentProps && componentProps.computed) {
        let { base, name } = props

        let computed = componentProps.computed(base, name)

        if (computed && computed[prop] !== undefined) {
          return computed[prop]
        }
      }

    // if (globalOptions.globalProps[prop] !== undefined) {
    //   return globalOptions.globalProps[prop];
    // }
    return def;
  };
};
