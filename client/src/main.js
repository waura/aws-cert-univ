// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import tough from 'tough-cookie'
import axiosCookieJarSupport from 'axios-cookiejar-support'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const axios = require('axios').default
axiosCookieJarSupport(axios)
const cookieJar = new tough.CookieJar()
axios.defaults.jar = cookieJar
axios.defaults.withCredentials = true

Vue.config.productionTip = false
Vue.use(VueCookie)
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
