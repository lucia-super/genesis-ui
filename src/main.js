import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import storeModules from './store'
import routerModules from './router'

import App from './App.vue'
import Axios from 'axios'

Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI);

const store = new Vuex.Store({
  modules: storeModules
})

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: routerModules
})


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
