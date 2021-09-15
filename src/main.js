import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { plugin } from "./components/index.js";
import { buttonPlugin, tablePlugin } from "./components/index.js";
import "tailwindcss/tailwind.css";
import "./styles.css"
import "./styles-material.css"
import Icon from "./components/icons/vue/Icon.vue"
import registerIcon from "./components/icons"
import {
  KeyboardIcon,
} from "./components/icons"

let app = createApp(App);

// TODO: global config
const modules = import.meta.globEager('./assets/icons/*.js')

Object.entries(modules).forEach(([path, definition]) => {
  let icon = definition.default.name + "Icon"
  app.component(icon, definition.default)
})

registerIcon(app, [
  KeyboardIcon
], {
  vendorPrefix: false,
  iconSufix: true,
})

app.provide("iconTypes", {
  valid: "check",
  invalid: "exclamation-triangle",
})

app.component("icon", Icon)

app.use(router);
app.use(plugin);
app.use(buttonPlugin);
app.use(tablePlugin);
app.mount("#app");
