import './assets/main.sass'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import axios from "axios";

window.axios = axios

createApp(App)
    .use(createPinia())
    .mount('#app')
