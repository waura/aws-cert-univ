import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from './pages/Top'
import Login from './pages/Login'
import Questions from './pages/Questions'
import PostQuestion from './pages/PostQuestion'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Top },
  { path: '/login', component: Login },
  { path: '/questions/new', component: PostQuestion },
  { path: '/questions/:id', component: Questions }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
