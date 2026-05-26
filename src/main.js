import { createApp } from 'vue'
import {createPinia} from 'pinia'
import{createRouter, createWebHistory} from 'vue-router'
import './style.css'
import App from './App.vue'

//importar vistas
import HomeView from './views/HomeView.vue'

//importar las rutas (routes)
const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/', component: HomeView
        },
        //se agregabn las demas rutas
    ]
})

//createApp(App).mount('#app')
const app= createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')