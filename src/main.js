import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { plugin } from "./components/index.js";
import "tailwindcss/tailwind.css";
import "./styles/styles.css"
import registerIcon from "./registerIcon"
import "./components/Documentation/Documentation.css"
import TableReference from "./components/Documentation/TableReference.vue";
import TableReferenceBasic from "./components/Documentation/TableReferenceBasic.vue";
import vCode from "./components/Documentation/components/vCode.vue"

import BStar from "./components/Documentation/icons/star"
import BMoon from "./components/Documentation/icons/moon"
import BCheckLg from "./components/Documentation/icons/check-lg"
import BExclamationTriangle from "./components/Documentation/icons/exclamation-triangle"
import BArrowClockwise from "./components/Documentation/icons/arrow-clockwise"
import MdiLoading from "./components/Documentation/icons/loading"

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
  BStar,
  BCheckLg,
  BExclamationTriangle,
  BArrowClockwise,
  MdiLoading,
  BMoon,
], {
  vendorPrefix: true,
  iconSufix: false,
})

app.provide("icon-types", {
  valid: "b-check-lg",
  invalid: "b-exclamation-triangle",
  success: "b-check-lg",
  info: "b-info-circle-icon",
  danger: "exclamation-octagon-fill-icon",
  warn: "exclamation-triangle-icon",
  light: "info-circle-icon",
  menu: "three-dots-icon",
  question: "question-circle-icon",
})


app.use(router);
app.use(plugin);
app.mount("#app");
