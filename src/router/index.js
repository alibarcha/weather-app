import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/weather/:state/:city',
    name:'cityview',
    component:CityView
  }

]

const router = createRouter({
  history: createWebHistory(),
  
 
  routes
})

export default router
