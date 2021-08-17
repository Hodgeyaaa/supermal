import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import bus from './assets/js/bus'
const app = createApp(App)

app.use(router).mount('#app')
app.config.globalProperties.$bus=bus


   
