import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";
import './orbitron/stylesheet.css'
import './style.css'
import App from './App.vue'
import Home from "./views/home/Index.vue";

const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

createApp(App).use(router).mount('#app')
