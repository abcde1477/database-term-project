import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from './router';//不使用{router}导入不进来

const app = createApp(App)
app.use(router)
app.mount('#app')
