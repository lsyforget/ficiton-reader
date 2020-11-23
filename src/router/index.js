import Vue from 'vue'
import VueRouter from 'vue-router'
import board from '@/layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'board',
    component: board
  }
]

const router = new VueRouter({
  routes
})

export default router
