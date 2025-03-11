import './assets/css/tailwind.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { pinia } from './services/pinia'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


library.add(fas,fab,far)


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(pinia)
app.use(router)

app.mount('#app')
