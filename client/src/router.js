import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from './pages/Top'
import Login from './pages/Login'
import Questions from './pages/Questions'
import PostQuestion from './pages/PostQuestion'
import DataManagement from './pages/DataManagement'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Top },
  { path: '/login', component: Login },
  { path: '/questions/new', component: PostQuestion },
  { path: '/questions/:id', component: Questions },
  { path: '/certification_categories', component: DataManagement, props: { type: 'certification_categories' } },
  { path: '/question_tags', component: DataManagement, props: { type: 'question_tags' } }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
