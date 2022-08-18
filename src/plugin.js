import { default as tooltip } from "./directives/tooltip"

const defaultOptions = {
  defaultProps: {},
}

let globalOptions = null

let componentPlugin = {
  install(app, options) {
    options = options || {}

    globalOptions = {
      ...defaultOptions,
      ...options,
    }

    Object.entries(globalOptions.components).forEach((component) => {
      app.component(component[0], component[1]);
    })

    app.directive("tooltip", tooltip);
  }
}

export { componentPlugin, globalOptions }
