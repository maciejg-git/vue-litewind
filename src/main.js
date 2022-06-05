// vue
import { createApp } from "vue";
import router from "./router";
// components
import App from "./App.vue";
import TableReference from "./components/Documentation/TableReference.vue";
import TableReferenceBasic from "./components/Documentation/TableReferenceBasic.vue";
import vCode from "./components/Documentation/components/vCode.vue"
import { plugin } from "./components/index.js";
// styles
import "tailwindcss/tailwind.css";
import "./styles/components.css"
import "./components/Documentation/Documentation.css"
// tools
import registerIcon from "./register-icon"

let app = createApp(App);

// documentation components
app.component("TableReference", TableReference)
app.component("TableReferenceBasic", TableReferenceBasic)
app.component("vCode", vCode)

// icons
const icons = import.meta.globEager('./components/Documentation/icons/*.js')
Object.entries(icons).forEach(([path, definition]) => {
  registerIcon(app, definition.default)
})

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
app.use(plugin);
app.mount("#app");
