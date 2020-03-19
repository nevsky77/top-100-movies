import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/HomePage.vue'
import BubbleChart from '../pages/D3ChartPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  { path: '/movie/:id',
    name: 'movie',
    component: () => import(/* webpackChunkName: "about" */ '../pages/MoviePage.vue')
  },
  {
    path: '/favorite',
    name: 'favorite',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/FavoritePage.vue')
  },
  {
    path: '/chart',
    name: 'chart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/ChartPage.vue')
  },
  {
    path: '/d3-chart',
    name: 'd3-chart',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BubbleChart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
