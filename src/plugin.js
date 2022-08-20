import { default as tooltip } from "./directives/tooltip"
import { default as id } from "./directives/id"

const defaultOptions = {
  globalProps: {},
  componentProps: {},
}

let globalOptions = {}

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
    app.directive("id", id);
  }
}

export { componentPlugin, globalOptions }
