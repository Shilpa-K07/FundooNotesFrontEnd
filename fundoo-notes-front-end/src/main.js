/*************************************************************************
* Purpose : entry point to application
*
* @file : main.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 01/02/2021
*
**************************************************************************/

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

Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.use(VueRouter)

function lazyLoadComponent (view) {
  return () => import(`./components/${view}.vue`)
}

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
    component: lazyLoadComponent('Dashboard'),
    children: [{
      path: 'notes',
      name: 'Notes',
      // component: Dashboard
      component: lazyLoadComponent('Dashboard')
    },
    {
      path: 'trash',
      name: 'Trash',
      // component: Dashboard
      component: lazyLoadComponent('Dashboard')
    },
    {
      path: '/label/:id',
      name: 'Label',
      // component: Dashboard
      component: lazyLoadComponent('Dashboard')
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
  vuetify: new Vuetify(),
  router,
  render: h => h(App)
}).$mount('#app')
