import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import { store } from '@/store/store'

const app = createApp(App, {
  productionTip: true
})
app.use(router)
app.use(store)
app.mount('#app')
