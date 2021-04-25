import { createApp, provide } from 'vue'
import App from './App.vue'
import router from './router'
// import i from "./components/index.js"
import "tailwindcss/tailwind.css"
import { styles } from "./styles"

let app = createApp(App)

app.config.globalProperties.styles = styles;

app.use(router)
// app.use(i)
app.mount('#app')
