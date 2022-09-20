// vue
import { createApp, defineAsyncComponent } from "vue";
import router from "./router";
// components
import App from "./App.vue";
import TableReference from "./components/Documentation/TableReference.vue";
import TableReferenceBasic from "./components/Documentation/TableReferenceBasic.vue";
import vCode from "./components/Documentation/components/vCode.vue"
import EventViewer from "./components/Documentation/components/EventViewer.vue"
import vSelectProp from "./components/Documentation/components/vSelectProp.vue"
import Example from "./components/Documentation/Example.vue"
import { componentPlugin } from "./index.js";
import { components } from "./index"
import { directives } from "./index"
// styles
import "./styles/components.css"
import "./styles/form.css"
import "./styles/icon.css"
import "tailwindcss/tailwind.css";
import "./components/Documentation/Documentation.css"
// tools
import registerIcon from "./register-icon"

let app = createApp(App);

// documentation components
app.component("TableReference", TableReference)
app.component("TableReferenceBasic", TableReferenceBasic)
app.component("vCode", vCode)
app.component("EventViewer", EventViewer)
app.component("vSelectProp", vSelectProp)
app.component("Example", Example)

// component icons
const icons = import.meta.globEager('./components/Documentation/icons/*.js')
Object.entries(icons).forEach(([path, definition]) => {
  registerIcon(app, definition.default)
})

// component examples
const examples = import.meta.glob('./components/Documentation/examples/Example*.vue')
for (const path in examples) {
  let file = path.replace(/^.*[\\\/]/, '')
  file = file.substring(0, file.lastIndexOf('.'))
  app.component(file, defineAsyncComponent(examples[path]))
}

app.provide("icon-types", {
  valid: "b-check-lg",
  invalid: "b-exclamation-triangle",
  success: "b-check-lg",
  info: "b-info-circle",
  danger: "b-exclamation-circle",
  warn: "b-exclamation-circle",
  menu: "three-dots-icon",
  question: "question-circle-icon",
  ["arrow-right"]: "b-arrow-right",
})

app.use(router);
app.use(componentPlugin, {
  components,
  directives,
  componentProps: {
    select: {
      // inline: true,
      offsetY: 5,
      card: {
        base: 'flat',
        styleCard: 'menu shadow',
      }
    }
  }
});
app.mount("#app");
