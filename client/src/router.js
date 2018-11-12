import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from './pages/Top'
import Login from './pages/Login'
import Question from './pages/Question'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Top },
  { path: '/login', component: Login },
  { path: '/question/:id', component: Question }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
