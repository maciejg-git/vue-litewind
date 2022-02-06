import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { plugin } from "./components/index.js";
import "tailwindcss/tailwind.css";
import "./styles.css"
import "./styles-material.css"
import BChevronRight from "./assets/chevron-right"
import { registerIcon } from "./vue"
import TableReference from "./components/Documentation/TableReference.vue";
import TableReferenceBasic from "./components/Documentation/TableReferenceBasic.vue";
import vCode from "./components/Documentation/components/vCode.vue"

let app = createApp(App);

app.component("TableReference", TableReference)
app.component("TableReferenceBasic", TableReferenceBasic)
app.component("vCode", vCode)

const icons = import.meta.globEager('./assets/icons/*.js')

Object.entries(icons).forEach(([path, definition]) => {
  let icon = definition.default.name + "Icon"
  app.component(icon, definition.default)
})

registerIcon(app, [
  BChevronRight,
], {
  vendorPrefix: true,
  iconSufix: false,
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


app.use(router);
app.use(plugin);
app.mount("#app");
