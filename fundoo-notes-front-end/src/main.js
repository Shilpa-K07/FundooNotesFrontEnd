/**
 * @description This is the entry point for the vue application. 
 * Here all the required components and plugins are imported
 */
import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'
import VueRouter from 'vue-router'
import Register from './pages/Registration'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ActivateAccount from './pages/ActivateAccount'
import VerifyEmailAddress from './pages/VerifyEmailAddress'
import Dashboard from './components/Dashboard'
/* import Note from './components/Note'
import Icons from './components/Icons' */
/* import axios from 'axios'; */
/* axios.defaults.withCredentials = true  */
//Vue.component('icons', Icons)
Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(VueRouter)

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
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/resetPassword/:token',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/verifyEmail',
    name: 'VerifyEmailAddress',
    component: VerifyEmailAddress
  },
  {
    path: '/activateAccount/:token',
    name: 'ActivateAccount',
    component: ActivateAccount
  },
  {

    /* name: 'customer-details',
    params: { name: customer.name, id: index + 1 } */

    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [{
      path: 'notes',
      name: 'Notes',
      component: Dashboard
    },
    {
      path: 'trash',
      name: 'Trash',
      component: Dashboard
    },
    {
      path: '/label/:id',
      name: 'Label',
      component: Dashboard
    }
  ]
  },
  /* {
    path: '/notes',
    name: 'Note',
    component: Note
  }, */
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
/* Vue.config.productionTip = false */
new Vue({
  vuetify : new Vuetify(),
  router,
  render: h => h(App)
}).$mount('#app')
