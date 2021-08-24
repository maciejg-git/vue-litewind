import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { plugin } from "./components/index.js";
import { buttonPlugin, tablePlugin } from "./components/index.js";
import "tailwindcss/tailwind.css";
import { styles } from "./styles";
import { stylesMaterial } from "./styles-material";
// import { testTailwindRemoveClasses } from "./testTailwindRemoveClasses.js";

// testTailwindRemoveClasses();

let app = createApp(App);

app.provide("styles", {
  default: styles,
  material: stylesMaterial,
});

app.use(router);
app.use(plugin);
app.use(buttonPlugin);
app.use(tablePlugin);
app.mount("#app");
