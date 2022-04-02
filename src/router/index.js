import Vue from 'vue'
import VueRouter from 'vue-router'
import Canvas from '../views/Canvas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'canvas',
    component: Canvas
  } 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
