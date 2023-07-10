const defaultOptions = {
  globalProps: {},
  componentProps: {},
}

let globalOptions = {}

let vueLitewind = {
  install(app, options) {
    options = options || {}

    globalOptions = {
      ...defaultOptions,
      ...options,
    }

    app.config.globalProperties._litewind_version = __APP_VERSION

    if (globalOptions.components) {
      Object.entries(globalOptions.components).forEach((component) => {
        app.component(component[0], component[1]);
      })
    }

    if (globalOptions.grid) {
      Object.entries(globalOptions.grid).forEach((component) => {
        app.component(component[0], component[1]);
      })
    }

    if (globalOptions.directives) {
      Object.entries(globalOptions.directives).forEach((directive) => {
        app.directive(directive[0], directive[1])
      })
    }
  }
}

export { vueLitewind, globalOptions }
