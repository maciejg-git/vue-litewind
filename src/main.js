// vue
import { createApp, defineAsyncComponent } from "vue";
import router from "./router";
import { createPinia } from 'pinia'
// components
import App from "./App.vue";
import TableReference from "./documentation/components/TableReference.vue";
import TableReferenceBasic from "./documentation/components/TableReferenceBasic.vue";
import PropsList from "./documentation/components/PropsList.vue";
import LinksGithubHeader from "./documentation/components/LinksGithubHeader.vue"
import vCode from "./documentation/components/vCode.vue"
import EventViewer from "./documentation/components/EventViewer.vue"
import vSelectProp from "./documentation/components/vSelectProp.vue"
import Example from "./documentation/components/Example.vue"
import { vueLitewind } from "./index.js";
import { components } from "./index"
import { grid } from "./index"
import { directives } from "./index"
// styles
import "tailwindcss/tailwind.css";
import "./styles/tooltip.css"
import "./documentation/Documentation.css"

const pinia = createPinia()

let app = createApp(App);

// documentation components
app.component("TableReference", TableReference)
app.component("TableReferenceBasic", TableReferenceBasic)
app.component("vCode", vCode)
app.component("EventViewer", EventViewer)
app.component("vSelectProp", vSelectProp)
app.component("Example", Example)
app.component("PropsList", PropsList)
app.component("LinksGithubHeader", LinksGithubHeader)

// component icons
const icons = import.meta.globEager('./documentation/icons/*.js')
Object.entries(icons).forEach(([path, definition]) => {
  let { vendor, name, type } = definition.default.$_icon
  app.component(`${vendor}${name}${type.join("")}`, definition.default)
})

// component examples
const examples = import.meta.glob('./documentation/examples/Example*.vue')
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
app.use(vueLitewind, {
  components,
  grid,
  directives,
  componentProps: {
    select: {
      card: {
        modCard: "preset:selectMenu"
      }
    }
  }
});

app.use(pinia)

app.mount("#app");
