import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { plugin } from "./components/index.js";
import { buttonPlugin, tablePlugin } from "./components/index.js";
import "tailwindcss/tailwind.css";
import "./styles.css"
import "./styles-material.css"
import Icon from "./components/icons/vue/Icon.vue"
import registerIcon from "./components/icons/index"
import {
  keyboardIcon,
} from "./components/icons/index"

let app = createApp(App);

// TODO: global config

registerIcon(app, [
  keyboardIcon
])
app.component("icon", Icon)

app.use(router);
app.use(plugin);
app.use(buttonPlugin);
app.use(tablePlugin);
app.mount("#app");
