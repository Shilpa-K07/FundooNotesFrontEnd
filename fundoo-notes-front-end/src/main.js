import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'
import VueRouter from 'vue-router'
import Register from './pages/Registration'
import Login from './pages/Login'
import Vuex from 'vuex'
import snackbar from './store/snackbar'
Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login 
  },
  {
    path: '*/*',
    name: 'Register',
    component: Register 
  },
  {
    path: '/',
    name: 'Register',
    component: Register 
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})
const store = new Vuex.Store({
  snackbar
})
/* Vue.config.productionTip = false */
new Vue({
  vuetify : new Vuetify(),
  store,
  router,
  render: h => h(App)
}).$mount('#app')
