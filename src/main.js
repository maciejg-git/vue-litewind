import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { plugin } from "./components/index.js";
import { buttonPlugin, tablePlugin } from "./components/index.js";
import "tailwindcss/tailwind.css";
import "./styles.css"
import "./styles-material.css"
import Icon from "./vue/Icon.vue"
import { registerIcon } from "./vue"
// import 
  // Sort
//  from "./assets/icons/sort"
// import PencilIcon from "./dist-bootstrap/bootstrap/pencil"
import TableReference from "./components/Documentation/TableReference.vue";
import TableReferenceBasic from "./components/Documentation/TableReferenceBasic.vue";
import vCode from "./components/Documentation/components/vCode.vue"

let app = createApp(App);

// app.provide("icon-config", {name: "name 2"})
// app.component("sort", Sort)
// let i = app.component("pencil", PencilIcon)
// console.log(i)

// TODO: global config

const icons = import.meta.globEager('./assets/icons/*.js')

Object.entries(icons).forEach(([path, definition]) => {
  let icon = definition.default.name + "Icon"
  app.component(icon, definition.default)
})

registerIcon(app, [
  // KeyboardIcon
], {
  vendorPrefix: false,
  iconSufix: true,
})

app.provide("iconTypes", {
  valid: "check-lg-icon",
  invalid: "exclamation-triangle-icon",
  success: "check-lg-icon",
  info: "info-circle-icon",
  danger: "exclamation-octagon-fill-icon",
  warn: "exclamation-triangle-icon",
  light: "info-circle-icon",
  menu: "three-dots-icon",
  question: "question-circle-icon",
})

app.component("icon", Icon)

app.component("TableReference", TableReference)
app.component("TableReferenceBasic", TableReferenceBasic)
app.component("vCode", vCode)

app.use(router);
app.use(plugin);
app.use(buttonPlugin);
app.use(tablePlugin);
app.mount("#app");
