import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import plugin from "./components/index.js"
import "tailwindcss/tailwind.css"
import { styles } from "./styles"
import { testTailwindRemoveClasses } from './testTailwindRemoveClasses.js'

testTailwindRemoveClasses()

let app = createApp(App)

app.config.globalProperties.styles = styles;

app.use(router)
app.use(plugin)
app.mount('#app')
