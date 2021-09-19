import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { plugin } from "./components/index.js";
import { buttonPlugin, tablePlugin } from "./components/index.js";
import "tailwindcss/tailwind.css";
import "./styles.css"
import "./styles-material.css"
import Icon from "./vue/Icon.vue"
import registerIcon from "./vue/registerIcon"
// import {
//   KeyboardIcon,
// } from "./components/icons"
import TableReference from "./components/Documentation/TableReference.vue";
import TableReferenceBasic from "./components/Documentation/TableReferenceBasic.vue";
import vCode from "./components/Documentation/Components/vCode.vue"

let app = createApp(App);

// TODO: global config
const modules = import.meta.globEager('./assets/icons/*.js')

Object.entries(modules).forEach(([path, definition]) => {
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
  valid: "check",
  invalid: "exclamation-triangle",
  success: "check-lg",
  info: "info-circle",
  danger: "exclamation-octagon-fill",
  warn: "exclamation-triangle",
  light: "info-circle",
  menu: "three-dots",
  question: "question-circle",
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
