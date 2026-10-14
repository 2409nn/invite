import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { startAutoTheme } from '../src/theme.ts'
import './assets/main.css'

startAutoTheme()

const app = createApp(App)

app.use(router)
app.mount('#app')
