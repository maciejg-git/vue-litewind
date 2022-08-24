import { default as tooltip } from "./directives/tooltip"
import vTrigger from "./components/vTrigger.vue"

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

      app.component("vTrigger", vTrigger);
    app.directive("tooltip", tooltip);
  }
}

export { componentPlugin, globalOptions }
