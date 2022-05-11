import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { plugin } from "./components/index.js";
import "tailwindcss/tailwind.css";
import "./styles/components.css"
import registerIcon from "./register-icon"
import "./components/Documentation/Documentation.css"
import TableReference from "./components/Documentation/TableReference.vue";
import TableReferenceBasic from "./components/Documentation/TableReferenceBasic.vue";
import vCode from "./components/Documentation/components/vCode.vue"

import BStar from "./components/Documentation/icons/star"
import BMoon from "./components/Documentation/icons/moon"
import BCheckLg from "./components/Documentation/icons/check-lg"
import BExclamationCircle from "./components/Documentation/icons/exclamation-circle"
import BInfoCircle from "./components/Documentation/icons/info-circle"
import BExclamationTriangle from "./components/Documentation/icons/exclamation-triangle"
import BArrowClockwise from "./components/Documentation/icons/arrow-clockwise"
import BArrowRight from "./components/Documentation/icons/arrow-right"
import MdiLoading from "./components/Documentation/icons/loading"
import BSun from "./components/Documentation/icons/sun"

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
  BArrowRight,
  BExclamationCircle,
  BSun,
], {
  vendorPrefix: true,
  iconSufix: false,
})

app.provide("icon-types", {
  valid: BCheckLg,
  invalid: "b-exclamation-triangle",
  success: BCheckLg,
  info: BInfoCircle,
  danger: BExclamationCircle,
  warn: BExclamationCircle,
  menu: "three-dots-icon",
  question: "question-circle-icon",
  ["arrow-right"]: BArrowRight,
})


app.use(router);
app.use(plugin);
app.mount("#app");
